<template>
  <section class="slide bg-secondary">
    <div class="slide-content projects-content">
      <span class="section-label animate-in">04 — Projects</span>
      <h2 class="section-title animate-in">Things I've built.</h2>

      <div class="projects-list">
        <a
          v-for="(project, i) in projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="project-item animate-in"
        >
          <div class="project-left">
            <span class="project-num font-serif">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="project-name font-serif">{{ project.name }}</span>
          </div>
          <ArrowUpRight :size="20" class="project-arrow" />
        </a>
      </div>
    </div>

    <span class="slide-number">05</span>
  </section>
</template>

<script>
import { ArrowUpRight } from 'lucide-vue-next'

export default {
  name: 'ProjectsSlide',
  components: { ArrowUpRight },
  data() {
    return {
      projects: [
        { name: 'VibeCoder', url: 'https://vibecoder.bd' },
        { name: 'FrameMe', url: 'https://frameme.org' },
        { name: 'WP Miners', url: 'https://wpminers.com' },
        { name: 'TryFluent Live', url: 'https://lets.tryfluent.live' },
        { name: 'Fluent Mailbox', url: 'https://fluentmailbox.online/' },
      ],
    }
  },
}
</script>

<style scoped>
.projects-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 80px 120px;
  height: 100%;
  justify-content: center;
}

.projects-list {
  display: flex;
  flex-direction: column;
}

.project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
  border-top: 1px solid var(--border);
  transition: opacity 0.3s;
}

.project-item:hover {
  opacity: 0.7;
}

.project-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.project-num {
  font-size: 32px;
  color: var(--text-muted);
}

.project-name {
  font-size: 24px;
  color: var(--text-primary);
}

.project-arrow {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .projects-content { padding: 60px 24px; }
  .project-num { font-size: 24px; }
  .project-name { font-size: 18px; }
}
</style>
