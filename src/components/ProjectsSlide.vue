<template>
  <section class="slide bg-secondary">
    <div class="slide-content projects-content">
      <span class="section-label animate-in">04 — Projects</span>
      <h2 class="section-title animate-in">Things I've built.</h2>

      <div class="projects-list animate-in">
        <a
          v-for="(project, i) in projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener"
          class="project-item"
        >
          <div class="project-left">
            <span class="project-num font-serif">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="project-name font-serif">{{ project.name }}</span>
          </div>
          <ArrowUpRight :size="20" class="project-arrow" />
        </a>

        <a
          href="https://github.com/shamim0902"
          target="_blank"
          rel="noopener"
          class="see-more"
        >
          <span>See more on GitHub</span>
          <ArrowUpRight :size="14" />
        </a>
      </div>

      <div class="github-stats animate-in">
        <div class="stat-item" v-for="stat in stats" :key="stat.label">
          <span class="stat-value font-serif">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
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
      stats: [
        { value: '—', label: 'Repositories' },
        { value: '—', label: 'Followers' },
        { value: '—', label: 'Following' },
      ],
    }
  },
  mounted() {
    this.fetchGitHubStats()
  },
  methods: {
    async fetchGitHubStats() {
      try {
        const res = await fetch('https://api.github.com/users/shamim0902')
        if (!res.ok) return
        const data = await res.json()
        this.stats = [
          { value: `${data.public_repos}+`, label: 'Repositories' },
          { value: `${data.followers}+`, label: 'Followers' },
          { value: `${data.following}+`, label: 'Following' },
        ]
      } catch {
        // keep fallback values
      }
    },
  },
}
</script>

<style scoped>
.projects-content {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 60px 120px;
  height: 100%;
  justify-content: center;
  overflow-y: auto;
}

.projects-list {
  display: flex;
  flex-direction: column;
}

.project-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
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

.see-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  color: var(--text-secondary);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s;
}

.see-more:hover {
  color: var(--text-primary);
}

.github-stats {
  display: flex;
  align-items: center;
  gap: 32px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat-value {
  font-size: 28px;
  color: var(--text-primary);
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-muted);
}

@media (max-width: 1024px) {
  .projects-content { padding: 40px 40px; gap: 24px; }
  .project-item { padding: 16px 0; }
  .project-num { font-size: 24px; }
  .project-name { font-size: 20px; }
}

@media (max-width: 768px) {
  .projects-content { padding: 40px 24px; gap: 20px; }
  .project-item { padding: 14px 0; }
  .project-num { font-size: 20px; }
  .project-name { font-size: 18px; }
  .github-stats { gap: 24px; }
  .stat-value { font-size: 24px; }
}
</style>
