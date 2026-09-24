<script setup lang="ts">
import electionData from '~/data/val-2026-helsingborg.json'

type District = {
  code: string | null
  name: string
  votes: number
}

type Candidate = {
  number: number | null
  name: string
  personalVotes: number
  districts: District[]
}

type Party = {
  code: string
  name: string
  partyVotes: number
  candidates: Candidate[]
}

type ElectionData = {
  source: {
    name: string
    sheet: string
    note: string
  }
  municipality: string
  municipalityCode: string
  election: string
  electionType: string
  parties: Party[]
}

const data = ref<ElectionData>(electionData as ElectionData)
const error = ref<Error | null>(null)
const shareImage = 'https://magnusenglund.com/og/valanalys-2026.png'

const selectedPartyCode = ref('L')
const expandedCandidate = ref<string | null>(null)

const selectedParty = computed(() => {
  const parties = data.value?.parties || []
  return parties.find((party) => party.code === selectedPartyCode.value) || parties[0]
})

const sortedParties = computed(() => {
  return [...(data.value?.parties || [])].sort((a, b) => {
    return b.partyVotes - a.partyVotes || a.name.localeCompare(b.name, 'sv')
  })
})

const formatNumber = (value: number) => new Intl.NumberFormat('sv-SE').format(value)

const toggleCandidate = (candidate: Candidate) => {
  const key = `${selectedParty.value?.code}-${candidate.number || candidate.name}`
  expandedCandidate.value = expandedCandidate.value === key ? null : key
}

const isExpanded = (candidate: Candidate) => {
  const key = `${selectedParty.value?.code}-${candidate.number || candidate.name}`
  return expandedCandidate.value === key
}

watch(selectedPartyCode, () => {
  expandedCandidate.value = null
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
  description: 'Analys av personröster och valdistrikt i Helsingborgs kommunval 2026.',
  ogTitle: 'Valanalys 2026 | Magnus Englund',
  ogDescription: 'Personröster och valdistriktsdata för Helsingborgs kommunval 2026.',
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

<template>
  <section class="analysis-page">
    <header class="page-intro">
      <p class="eyebrow">Helsingborgs kommunval 2026</p>
      <h1>Valanalys</h1>
      <p>
        Se personröster per parti, kandidat och valdistrikt. Kandidaterna är sorterade efter
        totalt antal personröster.
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
          <div>
            <h2 id="candidate-heading">Personröster</h2>
            <p>Klicka på en kandidat för att se valdistrikten där rösterna registrerades.</p>
          </div>
          <span class="analysis-total">{{ formatNumber(selectedParty.candidates.reduce((sum, candidate) => sum + candidate.personalVotes, 0)) }} totalt</span>
        </div>

        <div class="candidate-list">
          <article
            v-for="candidate in selectedParty.candidates"
            :key="`${selectedParty.code}-${candidate.number || candidate.name}`"
            class="candidate-card"
            :class="{ 'candidate-card-expanded': isExpanded(candidate) }"
          >
            <button
              type="button"
              class="candidate-toggle"
              :aria-expanded="isExpanded(candidate)"
              @click="toggleCandidate(candidate)"
            >
              <span class="candidate-name">{{ candidate.name }}</span>
              <span class="candidate-votes">
                {{ formatNumber(candidate.personalVotes) }}
                <span>personröster</span>
              </span>
            </button>

            <div v-if="isExpanded(candidate)" class="candidate-detail">
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
          </article>
        </div>
      </section>

      <p class="analysis-source">
        Källa: Valmyndighetens slutliga rösträkning, bearbetad från arbetsbokens blad
        <code>Personroster</code>.
      </p>

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
