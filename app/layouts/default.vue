<template>
  <div class="site-shell">
    <header class="site-header">
      <div class="container header-inner">
        <NuxtLink to="/" class="brand">Magnus Englund</NuxtLink>
        <nav aria-label="Huvudnavigation" class="nav-links">
          <NuxtLink to="/">Hem</NuxtLink>
          <NuxtLink to="/blogg">Blogg</NuxtLink>
          <NuxtLink to="/om-magnus">Om Magnus</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} Magnus Englund</p>
      </div>
    </footer>
  </div>
</template>
