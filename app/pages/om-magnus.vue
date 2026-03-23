<script setup lang="ts">
const siteUrl = 'https://magnusenglund.com'

useSeoMeta({
  title: 'Om Magnus | Magnus Englund',
  description: 'Kort presentation av Magnus Englund och den politiska inriktningen.',
  ogTitle: 'Om Magnus | Magnus Englund',
  ogDescription: 'Lär känna Magnus Englund och den politiska visionen.',
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
      <h1>Om Magnus</h1>
    </header>

    <p>
      Jag heter Magnus Englund och arbetar för en socialliberal politik som kombinerar
      frihet med ansvar. Min övertygelse är att ett starkt samhälle byggs genom god skola,
      fungerande integration och tydliga framtidsreformer.
    </p>
    <p>
      Den här sidan samlar mina tankar, prioriteringar och konkreta idéer för ett Sverige
      där fler människor får kraft att forma sina liv.
    </p>
  </section>
</template>
