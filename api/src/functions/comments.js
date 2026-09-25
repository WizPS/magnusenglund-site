import { app } from '@azure/functions'
import { TableClient } from '@azure/data-tables'
import { randomUUID } from 'node:crypto'

const tableName = process.env.COMMENTS_TABLE_NAME || 'SiteComments'
const environment = (process.env.COMMENTS_ENVIRONMENT || (process.env.WEBSITE_SITE_NAME ? 'prod' : 'dev')).trim().toLowerCase()
let tableClient

function normalizePagePath(value) {
  if (typeof value !== 'string' || !value.trim()) return '/'

  const pagePath = value.trim().split('?')[0].split('#')[0]
  if (!pagePath.startsWith('/') || pagePath.length > 200) return null
  return pagePath || '/'
}

function partitionForPage(pagePath) {
  // Preserve the first page's existing production partition while adding page-specific partitions.
  const pageKey = pagePath === '/analys/val-2026'
    ? 'val-2026'
    : pagePath === '/'
      ? 'home'
      : pagePath.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9-]+/g, '-').slice(0, 80) || 'home'
  return `${environment}-${pageKey}`
}

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
        const pagePath = normalizePagePath(new URL(request.url).searchParams.get('page'))
        if (!pagePath) return response({ error: 'Ogiltig sida.' }, 400)
        const partitionKey = partitionForPage(pagePath)
        const comments = []
        const entities = client.listEntities({
          queryOptions: { filter: `PartitionKey eq '${partitionKey}'` }
        })

        for await (const entity of entities) {
          comments.push({
            id: entity.rowKey,
            name: entity.name,
            text: entity.text,
            createdAt: entity.createdAt,
            pagePath: entity.pagePath
          })
        }

        comments.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        return response({ comments: comments.slice(0, 100) })
      }

      const body = await request.json()
      const name = typeof body?.name === 'string' ? body.name.trim() : ''
      const text = typeof body?.text === 'string' ? body.text.trim() : ''
      const pagePath = normalizePagePath(body?.page)

      if (!name || name.length > 80 || !text || text.length > 2000 || !pagePath) {
        return response({ error: 'Ange en giltig sida, namn och en kommentar på högst 2 000 tecken.' }, 400)
      }

      const createdAt = new Date().toISOString()
      await client.createEntity({
        partitionKey: partitionForPage(pagePath),
        rowKey: `${Date.now()}-${randomUUID()}`,
        name,
        text,
        createdAt,
        pagePath
      })

      return response({ ok: true, comment: { name, text, createdAt, pagePath } }, 201)
    } catch (error) {
      context.error('Comment API failed', error)
      return response({ error: 'Kommentarerna är tillfälligt otillgängliga.' }, 503)
    }
  }
})
