<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Helsingborg · demokrati · ansvar</p>
      <h1>Mitt engagemang</h1>
      <p class="lead">
        Ett fungerande samhälle byggs inte bara av beslut och budgetar. Det byggs av människor
        som tar ansvar, hjälper till och ser till att det som ska fungera också fungerar i praktiken.
      </p>
    </header>

    <div class="content-prose">
      <h2>Demokrati som fungerar i praktiken</h2>
      <p>
        Genom mitt uppdrag i Helsingborgs valnämnd har jag fått vara nära den del av demokratin
        som väljarna ofta bara ser i några minuter. Röstmottagare förbereder vallokaler, hjälper
        den som behöver stöd, tar emot röster och räknar dem när vallokalen stängt.
      </p>
      <p>
        Det är ett stort ansvar. Rösträkningen är dessutom offentlig – den som vill kan följa
        arbetet på plats. Den insynen och noggrannheten är värda att både värna och uppskatta.
      </p>

      <h2>Ett värdefullare Helsingborg</h2>
      <p>
        Jag vill att Helsingborg ska använda de resurser invånarna anförtror kommunen så klokt
        som möjligt. Det gäller skolan, äldreomsorgen, socialtjänsten och en trygg och välfungerande
        stadsmiljö.
      </p>
      <p>
        För mig är målet inte en större kommunal organisation för sin egen skull. Målet är mer
        kunskap, trygghet, frihet, möjligheter och livskvalitet i människors vardag – utan spill
        på vägen.
      </p>

      <h2>Stöd till brottsoffer</h2>
      <p>
        Jag är styrelseledamot i Brottsofferjouren Helsingborg. Brottsofferjouren fyller en viktig
        funktion genom att ge stöd, information och medmänsklighet till människor som har drabbats
        av brott. Det är ett engagemang nära människors verklighet och en påminnelse om att
        trygghet också handlar om att ingen ska behöva stå ensam efter det som hänt.
      </p>

      <h2>Frihet och ansvar</h2>
      <p>
        Mitt liberala engagemang började tidigt med viljan att fler röster skulle få höras. I dag
        handlar det också om att fler människor ska kunna forma sina liv, starta företag, känna
        sig trygga och lita på att samhällets system fungerar när de behöver dem.
      </p>
    </div>

    <section class="link-grid page-section" aria-label="Relaterat innehåll">
      <NuxtLink to="/analys/val-2026" class="info-card">
        <h2>Valanalys 2026</h2>
        <p>Utforska personrösterna per parti, kandidat och valdistrikt.</p>
      </NuxtLink>
      <NuxtLink to="/valet-2026" class="info-card">
        <h2>Valet 2026</h2>
        <p>Läs kampanjens bakgrund och tankarna bakom ett värdefullare Helsingborg.</p>
      </NuxtLink>
      <NuxtLink to="/om-magnus" class="info-card">
        <h2>Om Magnus</h2>
        <p>Lär känna bakgrunden bakom engagemanget.</p>
      </NuxtLink>
    </section>
  </section>
</template>
<script setup lang="ts">
const siteUrl = 'https://magnusenglund.com'

useSeoMeta({
  title: 'Engagemang i Helsingborg | Magnus Englund',
  description: 'Magnus Englund om demokrati, Helsingborg, valnämnden och Brottsofferjouren.',
  ogTitle: 'Engagemang i Helsingborg | Magnus Englund',
  ogDescription: 'Om praktiskt samhällsengagemang, demokrati och ett värdefullare Helsingborg.',
  ogType: 'website',
  ogUrl: siteUrl + '/engagemang',
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/engagemang' }]
})
</script>

<style scoped>
.page-intro {
  margin-bottom: 1.5rem;
}

.lead {
  font-size: 1.15rem;
}

.content-prose {
  max-width: 720px;
}

.content-prose h2 {
  margin-top: 2rem;
}

.content-prose h2:first-child {
  margin-top: 0;
}

.callout,
.archive-note {
  margin: 2rem 0;
  padding: 1.25rem 1.35rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  background: var(--bg-soft);
}

.callout h2 {
  margin-top: 0;
}

.callout p:last-child,
.archive-note p:last-child {
  margin-bottom: 0;
}

.archive-note strong {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 1.1rem;
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
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}

.info-card:hover,
.info-card:focus-visible {
  border-color: var(--accent);
  box-shadow: 0 8px 20px rgb(26 42 26 / 8%);
  text-decoration: none;
  transform: translateY(-2px);
}

.info-card h2,
.info-card h3 {
  margin-bottom: 0.4rem;
  font-size: 1.25rem;
}

.info-card p:last-child {
  margin-bottom: 0;
  color: var(--muted);
}

.page-section {
  margin-top: 2.75rem;
}

.eyebrow {
  margin: 0 0 0.4rem;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .link-grid {
    grid-template-columns: 1fr;
  }
}
</style>

