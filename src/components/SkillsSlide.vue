<template>
  <section class="slide bg-primary">
    <div class="slide-content skills-content">
      <span class="section-label animate-in">03 — Skills</span>
      <h2 class="section-title animate-in">Technologies I work with.</h2>

      <div class="skills-grid">
        <span v-for="skill in skills" :key="skill" class="skill-tag animate-in">
          {{ skill }}
        </span>
      </div>
    </div>

    <span class="slide-number">04</span>
  </section>
</template>

<script>
export default {
  name: 'SkillsSlide',
  data() {
    return {
      skills: [
        'JavaScript', 'Node Js', 'Vue js', 'React Js', 'jQuery',
        'PHP', 'WordPress', 'HTML', 'CSS', 'Browser Extension',
      ],
    }
  },
}
</script>

<style scoped>
.skills-content {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 80px 120px;
  height: 100%;
  justify-content: center;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  display: inline-flex;
  padding: 12px 24px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: var(--text-primary);
  transition: background 0.3s, border-color 0.3s;
}

.skill-tag:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-light);
}

@media (max-width: 768px) {
  .skills-content { padding: 60px 24px; }
  .skill-tag { padding: 10px 18px; font-size: 13px; }
}
</style>
