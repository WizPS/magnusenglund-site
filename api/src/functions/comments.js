import { app } from '@azure/functions'
import { TableClient } from '@azure/data-tables'
import { randomUUID } from 'node:crypto'

const tableName = process.env.COMMENTS_TABLE_NAME || 'SiteComments'
const environment = (process.env.COMMENTS_ENVIRONMENT || (process.env.WEBSITE_SITE_NAME ? 'prod' : 'dev')).trim().toLowerCase()
const partitionKey = `${environment}-val-2026`
let tableClient

function getTableClient() {
  if (tableClient) return tableClient

  const connectionString = process.env.COMMENTS_STORAGE_CONNECTION_STRING || process.env.AzureWebJobsStorage
  if (!connectionString) {
    throw new Error('No Azure Storage connection string configured for comments.')
  }

  tableClient = TableClient.fromConnectionString(connectionString, tableName)
  return tableClient
}

async function ensureTable(client) {
  try {
    await client.createTable()
  } catch (error) {
    if (error.statusCode !== 409) throw error
  }
}

function response(body, status = 200) {
  return {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    jsonBody: body
  }
}

app.http('comments', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'comments',
  handler: async (request, context) => {
    try {
      const client = getTableClient()
      await ensureTable(client)

      if (request.method === 'GET') {
        const comments = []
        const entities = client.listEntities({
          queryOptions: { filter: `PartitionKey eq '${partitionKey}'` }
        })

        for await (const entity of entities) {
          comments.push({
            id: entity.rowKey,
            name: entity.name,
            text: entity.text,
            createdAt: entity.createdAt
          })
        }

        comments.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        return response({ comments: comments.slice(0, 100) })
      }

      const body = await request.json()
      const name = typeof body?.name === 'string' ? body.name.trim() : ''
      const text = typeof body?.text === 'string' ? body.text.trim() : ''

      if (!name || name.length > 80 || !text || text.length > 2000) {
        return response({ error: 'Ange namn och en kommentar på högst 2 000 tecken.' }, 400)
      }

      const createdAt = new Date().toISOString()
      await client.createEntity({
        partitionKey,
        rowKey: `${Date.now()}-${randomUUID()}`,
        name,
        text,
        createdAt
      })

      return response({ ok: true, comment: { name, text, createdAt } }, 201)
    } catch (error) {
      context.error('Comment API failed', error)
      return response({ error: 'Kommentarerna är tillfälligt otillgängliga.' }, 503)
    }
  }
})
