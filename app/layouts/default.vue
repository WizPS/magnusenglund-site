<!-- default.vue -->
<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink to="/" class="brand">Magnus Englund</NuxtLink>
        <nav aria-label="Huvudnavigation" class="nav-links">
          <NuxtLink to="/">Hem</NuxtLink>
          <NuxtLink to="/om-magnus">Om Magnus</NuxtLink>
          <NuxtLink to="/pricing">Pricing</NuxtLink>
          <NuxtLink to="/engagemang">Engagemang</NuxtLink>
          <NuxtLink to="/analys/val-2026">Valanalys</NuxtLink>
          <NuxtLink to="/blogg" :class="{ 'router-link-active': isBlogRoute }">Blogg</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container site-main">
      <slot />
      <CommentsSection />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Magnus Englund</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
const route = useRoute()
const isBlogRoute = computed(() => route.path === '/blogg' || route.path.startsWith('/blogg/'))
</script>

<style scoped>
.container {
  width: min(860px, 92vw);
  max-width: 100%;
  margin-inline: auto;
  align-self: center;
}

.site-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  border-bottom: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg) 80%, white);
  backdrop-filter: blur(4px);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
}

.brand {
  color: var(--text);
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-links a.router-link-active {
  font-weight: 700;
}

.site-main {
  flex: 1;
  min-width: 0;
  padding: 2rem 0 3rem;
}

.site-footer {
  padding: 0 0 1rem;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 0.95rem;
}

.site-footer > .container {
  padding-top: 2rem;
}

@media (max-width: 700px) {
  .header-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
