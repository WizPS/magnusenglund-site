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
        I en längre historisk återblick berättar jag om sommaren då <em>Knock on Wood</em> ljöd
        över ett annars tystat Sverige.
      </p>
      <p>
        <NuxtLink to="/blogg/piratradio-knock-on-wood">Läs berättelsen om piratradion och Radio Öresund →</NuxtLink>
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

