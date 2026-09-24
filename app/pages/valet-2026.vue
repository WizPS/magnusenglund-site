<script setup lang="ts">
const siteUrl = 'https://magnusenglund.com'

useSeoMeta({
  title: 'Valet 2026 | Magnus Englund',
  description: 'Arkiv från Magnus Englunds kandidatur för Liberalerna i Helsingborg inför valet 2026.',
  ogTitle: 'Valet 2026 | Magnus Englund',
  ogDescription: 'Ett arkiv om kandidaturen, engagemanget och visionen om ett värdefullare Helsingborg.',
  ogType: 'website',
  ogUrl: siteUrl + '/valet-2026',
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/valet-2026' }]
})
</script>

<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Arkiv från valet 2026</p>
      <h1>Valet 2026</h1>
      <p class="lead">
        Inför valet 2026 sökte jag helsingborgarnas förtroende som kandidat för Liberalerna.
        Här finns tankarna, erfarenheterna och den vision som låg bakom kandidaturen.
      </p>
    </header>

    <div class="archive-note">
      <strong>En avslutad kampanj – ett fortsatt engagemang.</strong>
      <p>
        Valet är genomfört och kampanjmaterialet ligger nu kvar som dokumentation. Det handlar
        mindre om uppmaningar och mer om varför jag engagerar mig i Helsingborg och vilka idéer
        jag vill fortsätta utveckla.
      </p>
    </div>

    <div class="content-prose">
      <h2>Frihet, ansvar och ett värdefullare Helsingborg</h2>
      <p>
        Min utgångspunkt var att Helsingborg blir värdefullare när de resurser och skattepengar
        som invånarna anförtror kommunen kommer tillbaka som största möjliga värde i vardagen.
        Mer kunskap, trygghet, frihet, möjligheter och livskvalitet för varje skattekrona.
      </p>
      <p>
        Jag ville ta med mig erfarenheten från pricing och Value Management in i kommunpolitiken:
        en budget visar vad organisationen använder, men inte automatiskt vad helsingborgaren får
        tillbaka. Därför behöver vi följa upp resultat, minska spill och våga fråga om våra system
        faktiskt levererar det människor behöver.
      </p>

      <h2>Bakgrunden till kandidaturen</h2>
      <p>
        Jag hade under flera år engagerat mig i Liberalerna Helsingborg, bland annat som styrelse-
        ledamot och kassör, och fått förtroende som ledamot i Helsingborgs valnämnd. Inför valet
        stod jag som nummer 6 på kommunlistan.
      </p>
      <p>
        Kampanjen byggde vidare på en röd tråd som har följt mig länge: från fria röster i Radio
        Öresund, via ansvar och beredskap i luftförsvaret, till arbetet med att skapa värde i
        internationella industribolag. Piratradiohistorien kommer att få en egen fördjupning längre
        fram.
      </p>

      <h2>Fortsätt läsa</h2>
      <p>
        Valanalysen är ett konkret efterarbete från valet. Där kan du se hur personrösterna fördelade
        sig mellan partier, kandidater och valdistrikt i Helsingborgs kommunval 2026.
      </p>
    </div>

    <section class="link-grid page-section" aria-label="Relaterat innehåll">
      <NuxtLink to="/analys/val-2026" class="info-card">
        <h2>Gå till valanalysen</h2>
        <p>Se personrösterna i den interaktiva sammanställningen.</p>
      </NuxtLink>
      <NuxtLink to="/om-magnus" class="info-card">
        <h2>Om Magnus</h2>
        <p>Läs mer om bakgrunden och den röda tråden.</p>
      </NuxtLink>
      <NuxtLink to="/engagemang" class="info-card">
        <h2>Engagemang</h2>
        <p>Följ det fortsatta engagemanget i Helsingborg.</p>
      </NuxtLink>
    </section>
  </section>
</template>
