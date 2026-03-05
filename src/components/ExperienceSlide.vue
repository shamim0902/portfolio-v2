<template>
  <section class="slide bg-secondary">
    <div class="slide-content exp-content">
      <span class="section-label animate-in">02 — Experience</span>
      <h2 class="section-title animate-in">Where I've worked.</h2>

      <div class="exp-list">
        <div v-for="exp in experiences" :key="exp.role" class="exp-item animate-in">
          <span class="exp-period">{{ exp.period }}</span>
          <div class="exp-details">
            <h3 class="exp-role font-serif">{{ exp.role }}</h3>
            <span class="exp-company">{{ exp.company }}</span>
            <p class="exp-desc">{{ exp.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <span class="slide-number">03</span>
  </section>
</template>

<script>
export default {
  name: 'ExperienceSlide',
  data() {
    return {
      experiences: [
        {
          role: 'Principle Software Engineer',
          company: 'AuthLab',
          period: '2023 — 2024',
          description: 'Led technical architecture and team of 8 engineers building enterprise authentication platform',
        },
        {
          role: 'Lead Software Engineer',
          company: 'AuthLab',
          period: '2022 — 2023',
          description: 'Architected microservices infrastructure and mentored junior developers',
        },
        {
          role: 'Senior Software Engineer',
          company: 'WPManageNinja',
          period: '2019 — 2022',
          description: 'Built and maintained flagship WordPress plugins with millions of downloads',
        },
      ],
    }
  },
}
</script>

<style scoped>
.exp-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 80px 120px;
  height: 100%;
  justify-content: center;
}

.exp-list {
  display: flex;
  flex-direction: column;
}

.exp-item {
  display: flex;
  gap: 40px;
  padding: 32px 0;
  border-top: 1px solid var(--border);
  align-items: flex-start;
}

.exp-period {
  font-size: 14px;
  color: var(--text-muted);
  width: 160px;
  flex-shrink: 0;
}

.exp-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exp-role {
  font-size: 24px;
  color: var(--text-primary);
}

.exp-company {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
}

.exp-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .exp-content { padding: 60px 24px; gap: 32px; }
  .exp-item { flex-direction: column; gap: 8px; }
  .exp-period { width: auto; }
  .exp-role { font-size: 20px; }
}
</style>
