<template>
  <header class="header">
    <a href="#" class="logo font-serif">Hasanuzzaman.</a>

    <button class="hamburger" :class="{ open: menuOpen }" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav" :class="{ open: menuOpen }">
      <a
        v-for="item in navItems"
        :key="item.label"
        href="#"
        class="nav-link"
        :class="{ active: activeSection === item.section }"
        @click.prevent="handleNav(item.section)"
      >
        {{ item.label }}
      </a>

      <div class="theme-toggle" @click="$emit('toggle-theme')">
        <Sun :size="16" class="toggle-icon" />
        <div class="toggle-track">
          <div class="toggle-knob" :class="{ 'is-light': theme === 'light' }" />
        </div>
        <Moon :size="16" class="toggle-icon" />
      </div>
    </nav>

    <div class="nav-overlay" v-if="menuOpen" @click="menuOpen = false"></div>
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
      menuOpen: false,
      navItems: [
        { label: 'About', section: 1 },
        { label: 'Experience', section: 2 },
        { label: 'Projects', section: 4 },
        { label: 'Travel', section: 5 },
        { label: 'Contact', section: 6 },
      ],
    }
  },
  methods: {
    handleNav(section) {
      this.menuOpen = false
      this.$emit('navigate', section)
    },
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
  z-index: 102;
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

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 102;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.nav-overlay {
  display: none;
}

@media (max-width: 768px) {
  .header {
    padding: 16px 24px;
  }

  .hamburger {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 260px;
    height: 100vh;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
    padding: 80px 32px 32px;
    background: var(--bg-primary);
    border-left: 1px solid var(--border);
    transition: right 0.3s ease;
    z-index: 101;
  }

  .nav.open {
    right: 0;
  }

  .nav-link {
    font-size: 16px;
    padding: 16px 0;
    width: 100%;
    border-bottom: 1px solid var(--border);
  }

  .theme-toggle {
    margin-left: 0;
    margin-top: 24px;
  }

  .nav-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
}
</style>
