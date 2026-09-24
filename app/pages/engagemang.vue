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
