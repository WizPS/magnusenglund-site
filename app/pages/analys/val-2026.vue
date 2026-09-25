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
          <div>
            <h2 id="candidate-heading">Personröster</h2>
            <p>Klicka på en kandidats namn för att se antal personröster per valdistrikt. Välj ett annat parti ovan för att utforska dess kandidater.</p>
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
