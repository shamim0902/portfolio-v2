<template>
  <header class="header">
    <a href="#" class="logo font-serif">Hasanuzzaman.</a>

    <nav class="nav">
      <a
        v-for="(item, i) in navItems"
        :key="item"
        href="#"
        class="nav-link"
        :class="{ active: activeSection === i }"
        @click.prevent="$emit('navigate', i)"
      >
        {{ item }}
      </a>

      <div class="theme-toggle" @click="$emit('toggle-theme')">
        <Sun :size="16" class="toggle-icon" />
        <div class="toggle-track">
          <div class="toggle-knob" :class="{ 'is-light': theme === 'light' }" />
        </div>
        <Moon :size="16" class="toggle-icon" />
      </div>
    </nav>
  </header>
</template>

<script>
import { Sun, Moon } from 'lucide-vue-next'

export default {
  name: 'AppHeader',
  components: { Sun, Moon },
  props: {
    theme: { type: String, default: 'dark' },
    activeSection: { type: Number, default: 0 },
  },
  emits: ['toggle-theme', 'navigate'],
  data() {
    return {
      navItems: ['About', 'Experience', 'Projects', 'Travel', 'Contact'],
    }
  },
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 80px;
  height: 72px;
  background: var(--bg-primary);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid transparent;
}

.logo {
  font-size: 24px;
  color: var(--text-primary);
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-link {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text-primary);
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-left: 8px;
}

.toggle-icon {
  color: var(--text-muted);
}

.toggle-track {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--toggle-bg);
  position: relative;
  transition: background 0.3s;
}

.toggle-knob {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--toggle-knob);
  position: absolute;
  top: 3px;
  left: 3px;
  transition: transform 0.3s ease;
}

.toggle-knob.is-light {
  transform: translateX(20px);
}

@media (max-width: 768px) {
  .header {
    padding: 16px 24px;
  }
  .nav { gap: 16px; }
  .nav-link { font-size: 12px; }
}
</style>
