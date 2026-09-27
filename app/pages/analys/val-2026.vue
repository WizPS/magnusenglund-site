<!-- val-2026.vue -->
<template>
  <section class="analysis-page">
    <header class="page-intro">
      <p class="eyebrow">Helsingborgs kommunval 2026</p>
      <h1>Valanalys</h1>
      <p>
        Välj ett parti och klicka på en kandidats namn för att se hur många personkryss kandidaten
        fick i varje valdistrikt. Du kan göra samma sak för alla partier i sammanställningen.
        Kandidaterna är sorterade efter totalt antal personröster.
      </p>
    </header>

    <figure class="analysis-share-image">
      <img
        src="/og/valanalys-2026.png"
        alt="Valanalys 2026 i Helsingborg med Magnus Englund och kandidatlista"
        width="1200"
        height="630"
        fetchpriority="high"
      >
    </figure>

    <section class="analysis-reflection" aria-labelledby="reflection-heading">
      <p class="eyebrow">Efter valet</p>
      <h2 id="reflection-heading">Tack för de tjugo kryssen</h2>
      <p>
        Jag vill passa på att säga ett varmt tack till alla tjugo personer som valde att sätta
        ett personkryss vid mitt namn i kommunvalet i Helsingborg. I valet 2022 fick jag sju kryss.
        Att nu få tjugo är tretton fler personliga förtroenden – nästan tre gånger så många.
      </p>
      <p>
        Jag vet såklart inte vilka alla ni tjugo är, men jag vill att ni ska veta att ert förtroende
        tas på största allvar. För mig är varje kryss en människa som har läst, lyssnat, pratat med
        mig eller på annat sätt tyckt att jag borde få möjlighet att bidra. Det är jag både stolt
        över och tacksam för.
      </p>
      <p>
        Inför valet 2026 hade jag fått förtroendet att stå på plats 6 på Liberalernas kommunlista i
        Helsingborg. Liberalerna fick två mandat och två ersättarplatser, vilket innebar att plats 6
        inte var valbar. De tjugo personrösterna ändrar inte den formella mandatfördelningen, men de
        är ett tydligt personligt förtroende som jag tar med mig i det fortsatta arbetet.
      </p>
      <p>
        Ett varmt grattis till alla mina kollegor som fick väljarnas förtroende i valet, inte minst
        er som nu får företräda Liberalerna i Helsingborgs kommunfullmäktige och som ersättare.
        Tack också till alla kandidater och medlemmar som bidrog i valrörelsen. Jag ser fram emot
        att fortsätta arbeta tillsammans.
      </p>
      <p>
        De tjugo kryssen placerar mig på åttonde plats bland Liberalernas kandidater i den här
        sammanställningen. Tillsammans står de för ungefär 2,3 procent av Liberalernas 860
        registrerade personröster i Helsingborg. Kryssen kom från 15 valdistrikt, med flest i
        Tågaborg C och därefter flera distrikt där stödet var utspritt över staden.
      </p>
      <p>
        Det är också möjligt att detta var ett av de sista valen med dagens personvalssystem i dess
        nuvarande form. De uppmärksammade ”kryssraketerna” – kandidater som tack vare ett starkt
        personligt stöd kan passera mer etablerade namn på listan – har aktualiserat frågan om hur
        valsedlar, listplaceringar och personröster ska fungera tillsammans. För mig är det
        principiellt viktigt att väljare ska kunna lyfta fram en person, men reglerna måste vara
        begripliga och upplevas som rättvisa. Om systemet förändras hoppas jag att den personliga
        rösten stärks, inte försvagas, samtidigt som partier och väljare får tydliga spelregler.
      </p>
      <p class="analysis-source">
        Valmyndigheten beskriver hur personröster påverkar kandidaternas placering och mandat i
        <a
          href="https://www.val.se/det-svenska-valsystemet/rostrakning-och-mandatfordelning/sa-utses-ledamoter"
          target="_blank"
          rel="noopener noreferrer"
        >Så utses ledamöter</a>.
      </p>
    </section>

    <p v-if="error" class="analysis-error">
      Valanalysen kunde inte läsas in just nu.
    </p>

    <template v-else-if="data && selectedParty">
      <section class="analysis-controls" aria-labelledby="party-label">
        <label id="party-label" for="party-select">Välj parti</label>
        <select id="party-select" v-model="selectedPartyCode">
          <option v-for="party in sortedParties" :key="party.code" :value="party.code">
            {{ party.name }} ({{ party.code }}) – {{ formatNumber(party.partyVotes) }} röster
          </option>
        </select>
      </section>

      <section class="analysis-summary" :aria-label="`Sammanfattning för ${selectedParty.name}`">
        <div>
          <span class="analysis-summary-label">Parti</span>
          <strong>{{ selectedParty.name }}</strong>
        </div>
        <div>
          <span class="analysis-summary-label">Partiröster</span>
          <strong>{{ formatNumber(selectedParty.partyVotes) }}</strong>
        </div>
        <div>
          <span class="analysis-summary-label">Kandidater</span>
          <strong>{{ formatNumber(selectedParty.candidates.length) }}</strong>
        </div>
      </section>

      <section class="analysis-results" aria-labelledby="candidate-heading">
        <div class="analysis-results-heading">
          <div class="analysis-results-grid">
            <h2 id="candidate-heading">Personröster</h2>
            <div class="analysis-results-count">
              <span class="analysis-count-label">Antal</span>
              <span class="analysis-total">
                {{ formatNumber(selectedParty.candidates.reduce((sum, candidate) => sum + candidate.personalVotes, 0)) }} totalt
                <template v-if="show2022Votes && selectedParty2022"> · 2022: {{ formatNumber(totalPersonalVotes2022) }}</template>
              </span>
            </div>
            <p>Klicka på en kandidats namn för att se antal personröster per valdistrikt. Välj ett annat parti ovan för att utforska dess kandidater.</p>
            <div class="analysis-results-actions">
              <Button
                size="small"
                label="Visa 2022"
                severity="success"
                :outlined="!show2022Votes"
                :aria-pressed="show2022Votes"
                @click="show2022Votes = !show2022Votes"
              />
            </div>
          </div>
        </div>

        <div class="candidate-list">
          <DataTable
            v-model:expanded-rows="expandedCandidates"
            :value="tableCandidates"
            data-key="name"
            sort-field="personalVotes"
            :sort-order="-1"
            row-hover
            @row-click="toggleCandidateRow"
            class="candidate-table"
          >
            <Column expander header="" header-style="width: 3rem" body-style="width: 3rem" />
            <Column field="listPosition" header="Plats" sortable header-class="candidate-position-header" body-class="candidate-position-cell">
              <template #body="{ data: candidate }">
                <span>{{ candidate.listPosition ?? '–' }}</span>
              </template>
            </Column>
            <Column field="name" header="Kandidat" sortable>
              <template #body="{ data: candidate }">
                <span class="candidate-name">{{ candidate.name }}</span>
              </template>
            </Column>
            <Column v-if="show2022Votes" field="votes2022" header="2022" sortable header-class="candidate-votes-header" body-class="candidate-votes-cell">
              <template #body="{ data: candidate }">
                <span class="candidate-votes">{{ candidate.votes2022 === null ? '–' : formatNumber(candidate.votes2022) }}</span>
              </template>
            </Column>
            <Column field="personalVotes" header="2026" sortable header-class="candidate-votes-header" body-class="candidate-votes-cell">
              <template #body="{ data: candidate }">
                <span class="candidate-votes">{{ formatNumber(candidate.personalVotes) }}</span>
              </template>
            </Column>
            <template #expansion="{ data: candidate }">
              <div class="candidate-detail">
                <div class="candidate-detail-heading">
                  <span>Valdistrikt</span>
                  <span>Personröster</span>
                </div>
                <div v-if="candidate.districts.length">
                  <div v-for="district in candidate.districts" :key="district.code || district.name" class="district-row">
                    <span>{{ district.name }}</span>
                    <strong>{{ formatNumber(district.votes) }}</strong>
                  </div>
                </div>
                <p v-else class="empty-detail">Inga registrerade personröster per valdistrikt.</p>
              </div>
            </template>
          </DataTable>
        </div>
      </section>

      <p class="analysis-source">
        Källa: Valmyndighetens slutliga rösträkning, bearbetad från arbetsbokens blad
        <code>Personroster</code>. 2018 års partinivå kommer från
        <a
          href="https://historik.val.se/val/val2018/slutresultat/K/kommun/12/83/personroster.html"
          target="_blank"
          rel="noopener noreferrer"
        >Valmyndighetens historiska valpresentation</a>.
      </p>

      <section class="analysis-reflection analysis-results-context" aria-labelledby="context-heading">
        <p class="eyebrow">Valet i två perspektiv</p>
        <h2 id="context-heading">Ett starkare riksresultat än lokalt</h2>
        <p>
          På riksnivå fick Liberalerna 5,34 procent och 19 mandat. Det innebär att partiet klarade
          riksdagsspärren och fortsätter att vara representerat i riksdagen.
        </p>
        <p>
          Lokalt i Helsingborg blev resultatet 3,5 procent och två mandat i kommunfullmäktige. I
          kommunvalet 2022 fick Liberalerna 5,06 procent och tre mandat. Lokalt blev det alltså ett
          tapp både i röstandel och ett förlorat mandat, även om mina egna personröster samtidigt
          ökade tydligt.
        </p>
        <p>
          I riksdagsvalet i Helsingborg fick Liberalerna 5,29 procent, vilket ligger nära partiets
          rikssiffra. Skillnaden mellan riksdagsvalet och kommunvalet visar att väljarnas bedömning
          kan se olika ut beroende på nivå: lokalt påverkas resultatet också av kandidater,
          organisation, synlighet och förtroende i den egna kommunen.
        </p>
        <p>
          Min egen slutsats är därför dubbel. För Liberalerna finns en nationell grund att bygga
          vidare på, men i Helsingborg krävs ett långsiktigt arbete för att återvinna bredden. För
          mig personligen visar de tjugo kryssen att det lokala förtroendet växer – och att det är
          värt att fortsätta ta ansvar, vara synlig och göra liberal politik konkret i vardagen.
        </p>
        <p class="analysis-source">
          Nationellt resultat: <a href="https://www.val.se/valresultat-och-statistik/riksdags--region--och-kommunval/valresultat-2026" target="_blank" rel="noopener noreferrer">Valmyndighetens slutliga valresultat 2026</a>.
          Lokalt mandatresultat: <a href="https://helsingborg.se/kommun-och-politik/kommunens-organisation/" target="_blank" rel="noopener noreferrer">Helsingborgs stads sammanställning</a>.
          Helsingborgs riksdagsresultat: <a href="https://valresultat.svt.se/2026/riksdagsval-1283-helsingborg.html" target="_blank" rel="noopener noreferrer">SVT:s resultatpresentation</a>.
          Personrösterna ovan är bearbetade från Valmyndighetens slutliga rösträkning.
        </p>
      </section>

      <section class="analysis-next" aria-labelledby="analysis-next-heading">
        <p class="eyebrow">Mer om sammanhanget</p>
        <h2 id="analysis-next-heading">Vill du veta mer?</h2>
        <p>
          Valanalysen är en del av ett större arkiv om Helsingborg, engagemang och arbetet med att
          skapa mer värde i vardagen.
        </p>
        <div class="link-grid">
          <NuxtLink to="/om-magnus" class="info-card">
            <h3>Om Magnus</h3>
            <p>Lär känna personen bakom kandidaturen.</p>
          </NuxtLink>
          <NuxtLink to="/engagemang" class="info-card">
            <h3>Engagemang i Helsingborg</h3>
            <p>Om demokrati, valnämnden och Brottsofferjouren.</p>
          </NuxtLink>
          <NuxtLink to="/pricing" class="info-card">
            <h3>Pricing &amp; värde</h3>
            <p>Om erfarenheten av att förstå och skapa värde.</p>
          </NuxtLink>
          <NuxtLink to="/valet-2026" class="info-card">
            <h3>Valet 2026</h3>
            <p>Läs arkivet bakom kandidaturen och visionen.</p>
          </NuxtLink>
        </div>
      </section>

    </template>
  </section>
</template>
<script setup>
import electionData from '~/data/val-2026-helsingborg.json'
import electionData2022 from '~/data/val-2022-personroster-helsingborg.json'
import candidatePositions from '~/data/val-2026-kandidatpositioner-helsingborg.json'

const data = ref(electionData)
const data2022 = electionData2022
const error = ref(null)
const shareImage = 'https://magnusenglund.com/og/valanalys-2026.png'

const selectedPartyCode = ref('L')
const expandedCandidates = ref({})
const show2022Votes = ref(true)

const selectedParty = computed(() => {
  const parties = data.value?.parties || []
  return parties.find((party) => party.code === selectedPartyCode.value) || parties[0]
})

const selectedParty2022 = computed(() => {
  return data2022.parties.find((party) => party.code === selectedParty.value?.code)
})

const totalPersonalVotes2022 = computed(() => {
  return selectedParty2022.value?.candidates.reduce((sum, candidate) => sum + candidate.personalVotes, 0) || 0
})

const candidateVotes2022 = (candidate) => {
  return selectedParty2022.value?.candidates.find((previousCandidate) => previousCandidate.name === candidate.name)?.personalVotes ?? null
}

const candidateListPosition = (candidate) => {
  const partyPositions = candidatePositions[selectedParty.value?.code || '']
  return partyPositions?.[String(candidate.number)] ?? null
}

const tableCandidates = computed(() => {
  return selectedParty.value.candidates.map((candidate) => ({
    ...candidate,
    listPosition: candidateListPosition(candidate),
    votes2022: candidateVotes2022(candidate)
  }))
})

const sortedParties = computed(() => {
  return [...(data.value?.parties || [])].sort((a, b) => {
    return b.partyVotes - a.partyVotes || a.name.localeCompare(b.name, 'sv')
  })
})

const formatNumber = (value) => new Intl.NumberFormat('sv-SE').format(value)

const toggleCandidateRow = (event) => {
  const key = event.data.name
  const nextExpandedCandidates = { ...expandedCandidates.value }

  if (nextExpandedCandidates[key]) {
    delete nextExpandedCandidates[key]
  } else {
    nextExpandedCandidates[key] = true
  }

  expandedCandidates.value = nextExpandedCandidates
}

watch(selectedPartyCode, () => {
  expandedCandidates.value = {}
})

watch(
  () => data.value?.parties,
  (parties) => {
    if (parties?.length && !parties.some((party) => party.code === selectedPartyCode.value)) {
      selectedPartyCode.value = parties[0].code
    }
  },
  { immediate: true }
)

useSeoMeta({
  title: 'Valanalys 2026 | Magnus Englund',
  description: 'Personligt tack och analys av personröster, Liberalernas valresultat och valdistrikt i Helsingborg 2026.',
  ogTitle: 'Valanalys 2026 | Magnus Englund',
  ogDescription: 'Magnus Englunds tack efter valet och en jämförelse mellan Liberalernas riksresultat och resultatet i Helsingborg.',
  ogImage: shareImage,
  ogImageAlt: 'Valanalys 2026 i Helsingborg med Magnus Englund och kandidatlista',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogType: 'website',
  ogSiteName: 'Magnus Englund',
  twitterCard: 'summary_large_image',
  twitterImage: shareImage,
  twitterImageAlt: 'Valanalys 2026 i Helsingborg med Magnus Englund och kandidatlista'
})
</script>
<style scoped>
.eyebrow {
  margin: 0 0 0.4rem;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.analysis-page .page-intro {
  margin-bottom: 1.5rem;
}

.analysis-share-image {
  margin: 1.5rem 0 2rem;
}

.analysis-share-image img {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 8px 24px rgb(26 42 26 / 10%);
}

.analysis-reflection {
  max-width: 760px;
  margin: 2rem 0;
  padding: 1.35rem 1.5rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--card) 82%, var(--bg-soft));
}

.analysis-reflection h2 {
  margin-bottom: 0.75rem;
}

.analysis-reflection p:last-child {
  margin-bottom: 0;
}

.analysis-results-context {
  border-left-color: #315f92;
}

.analysis-controls {
  display: grid;
  gap: 0.4rem;
  max-width: 28rem;
  margin: 1.5rem 0;
}

.analysis-controls label {
  font-weight: 700;
}

.analysis-controls select {
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text);
  background: var(--card);
  font: inherit;
}

.analysis-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 1.5rem 0 2rem;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--border);
}

.analysis-summary > div {
  display: grid;
  gap: 0.25rem;
  padding: 0.9rem 1rem;
  background: var(--card);
}

.analysis-summary-label {
  color: var(--muted);
  font-size: 0.85rem;
}

.analysis-results-heading {
  margin-bottom: 1rem;
}

.analysis-results-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 18rem);
  grid-template-rows: auto auto;
  column-gap: 1rem;
  row-gap: 0.25rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.analysis-results-grid h2 {
  margin-bottom: 0.35rem;
}

.analysis-results-grid p {
  margin: 0;
  color: var(--muted);
}

.analysis-results-count {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 0.45rem;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  white-space: nowrap;
}

.analysis-count-label,
.analysis-total {
  color: var(--muted);
  white-space: nowrap;
}

.analysis-results-actions {
  display: grid;
  justify-items: end;
  gap: 0.45rem;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.candidate-list {
  display: grid;
  gap: 0.55rem;
}

.candidate-table {
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--card);
}

:deep(.candidate-table .p-datatable-table) {
  width: 100%;
  min-width: 0;
}

:deep(.candidate-table .p-datatable-thead > tr > th) {
  padding: 0.55rem 0.75rem;
  color: var(--muted);
  background: #f5f8f2;
  font-size: 0.85rem;
}

:deep(.candidate-table .p-datatable-tbody > tr > td) {
  padding: 0.3rem 0.75rem;
  color: var(--text);
  background: var(--card);
  cursor: pointer;
}

:deep(.candidate-table .p-datatable-tbody > tr.p-datatable-row-expansion > td) {
  padding: 0;
  background: #fbfcfa;
}

:deep(.candidate-table .candidate-votes-header .p-datatable-column-header-content) {
  justify-content: flex-end;
}

:deep(.candidate-table .candidate-votes-cell) {
  text-align: right;
}

:deep(.candidate-table .candidate-position-header .p-datatable-column-header-content),
:deep(.candidate-table .candidate-position-cell) {
  text-align: center;
}

.candidate-name {
  font-weight: 700;
}

.candidate-votes {
  color: var(--accent);
  font-weight: 700;
  white-space: nowrap;
}

.candidate-detail {
  padding: 0.2rem 1rem 0.9rem 6rem;
  background: #fbfcfa;
  animation: candidate-detail-expand 220ms ease-out both;
}

@keyframes candidate-detail-expand {
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-0.35rem);
  }

  to {
    max-height: 1000px;
    opacity: 1;
    transform: translateY(0);
  }
}

.candidate-detail-heading,
.district-row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 0.45rem 0;
}

.candidate-detail-heading {
  color: var(--muted);
  font-size: 0.85rem;
}

.district-row {
  border-top: 1px solid #e7eee3;
}

.empty-detail,
.analysis-error,
.analysis-source {
  color: var(--muted);
}

.analysis-source {
  margin-top: 1.5rem;
  font-size: 0.9rem;
}

.analysis-next {
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

.analysis-next > p:not(.eyebrow) {
  max-width: 65ch;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.info-card {
  display: block;
  padding: 1.15rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  background: color-mix(in srgb, var(--card) 88%, transparent);
}

.info-card h3 {
  margin-bottom: 0.4rem;
  font-size: 1.25rem;
}

.info-card p:last-child {
  margin-bottom: 0;
  color: var(--muted);
}

@media (max-width: 700px) {
  .analysis-summary {
    grid-template-columns: 1fr;
  }

  .analysis-results-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 11rem);
  }

  .analysis-total {
    display: block;
    margin-top: 0.5rem;
  }

  .analysis-results-actions {
    width: auto;
  }

  .link-grid {
    grid-template-columns: 1fr;
  }

  .candidate-detail {
    padding-left: 2.75rem;
  }
}
</style>

