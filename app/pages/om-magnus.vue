<script setup lang="ts">
const siteUrl = 'https://magnusenglund.com'

useSeoMeta({
  title: 'Om Magnus | Magnus Englund',
  description: 'Lär känna Magnus Englund – trebarnspappa, reservofficer, företagare och engagerad helsingborgare.',
  ogTitle: 'Om Magnus | Magnus Englund',
  ogDescription: 'Om bakgrunden, drivkrafterna och engagemanget bakom Magnus Englund.',
  ogType: 'website',
  ogUrl: siteUrl + '/om-magnus',
  ogSiteName: 'Magnus Englund'
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl + '/om-magnus' }]
})
</script>

<template>
  <section>
    <header class="page-intro">
      <p class="eyebrow">Mellan fria röster och fungerande system</p>
      <h1>Om Magnus</h1>
      <p class="lead">
        Jag heter Magnus Englund och bor i Helsingborg. Min röda tråd har alltid varit att ta
        ansvar, använda resurser klokt och få saker att fungera när det verkligen gäller.
      </p>
    </header>

    <div class="content-prose">
      <h2>Olika världar, samma drivkraft</h2>
      <p>
        På 80- och 90-talet drev jag Radio Öresund. Det började med ett intresse för teknik,
        antenner och egna sändarbyggen och växte till en radiostation där fler röster fick höras.
        Den längre berättelsen om piratradion kommer jag att bygga ut här framöver.
      </p>
      <p>
        Jag är också reservofficer i det svenska luftförsvaret och har utbildat, grupperat och
        eldlett på Robotsystem 70 och senare luftvärnssystemet Patriot. I mitt civila yrkesliv
        har jag drivit egna företag och arbetat med AI, pricing, värdeskapande och Value
        Management i internationella industribolag.
      </p>
      <p>
        Det kan låta som olika världar. För mig hänger de ihop: frihet behöver försvaras,
        ansvar behöver tas och resurser behöver omsättas i något som faktiskt är värdefullt
        för den som tar emot det.
      </p>

      <h2>Engagemang i Helsingborg</h2>
      <p>
        Jag har engagerat mig lokalt genom Liberalerna Helsingborg och haft förtroendeuppdrag
        i föreningen och i Helsingborgs valnämnd. Valnämnden är demokratins praktiska maskineri:
        röstmottagare ska utbildas, vallokaler ska fungera och röster ska räknas öppet och korrekt.
      </p>
      <p>
        Jag är även styrelseledamot i Brottsofferjouren Helsingborg. Där möter engagemanget en
        annan viktig del av samhället – att människor som drabbats av brott ska få stöd,
        information och någon som lyssnar.
      </p>

      <h2>Det jag tror på</h2>
      <p>
        Min liberala övertygelse började redan under skolåren på Tycho Braheskolan i Helsingborg
        och har följt med genom engagemanget i ungdomsförbundet och Liberalerna, där jag under
        en period var ordförande för FPU i Helsingborg. Jag tror på ett
        samhälle där människor får tänka själva, forma sina liv och pröva sina vingar – men också på att frihet och ansvar hör ihop. Jag tror på skolan, tryggheten,
        företagsamheten och välfärden. Och jag tror att varje skattekrona ska göra så mycket
        nytta som möjligt hela vägen fram till helsingborgaren.
      </p>
      <p>
        Det är vad jag menar med ett värdefullare Helsingborg: inte en större organisation eller
        högre omsättning för sin egen skull, utan mer kunskap, trygghet, möjligheter och livskvalitet
        i människors vardag.
      </p>
    </div>

    <section class="link-grid page-section" aria-label="Fördjupa dig">
      <NuxtLink to="/pricing" class="info-card">
        <h2>Pricing &amp; värde</h2>
        <p>Hur yrkeserfarenhet av värdeskapande hänger ihop med samhällsfrågor.</p>
      </NuxtLink>
      <NuxtLink to="/engagemang" class="info-card">
        <h2>Mitt engagemang</h2>
        <p>Demokrati, Helsingborg och Brottsofferjouren.</p>
      </NuxtLink>
      <NuxtLink to="/blogg" class="info-card">
        <h2>Bloggen</h2>
        <p>Texter om frihet, ansvar, värde och livet mellan systemen.</p>
      </NuxtLink>
    </section>
  </section>
</template>
