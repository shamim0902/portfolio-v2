<template>
  <section class="slide bg-primary">
    <div class="slide-content about-content">
      <div class="about-left">
        <span class="section-label animate-in">01 — About</span>
        <h2 class="section-title animate-in">Building software<br />that matters.</h2>
        <p class="about-body animate-in">
          A full-stack software developer with strong experience in Vue, Node.js,
          WordPress, and product-focused engineering. I enjoy building reliable
          software that solves real user problems and scales with teams.
        </p>
      </div>

      <div class="about-right">
        <span class="section-label animate-in">Previous Roles</span>
        <div class="roles-list">
          <div v-for="role in roles" :key="role.title" class="role-item animate-in">
            <h3 class="role-title font-serif">{{ role.title }}</h3>
            <span class="role-company">{{ role.company }}</span>
          </div>
        </div>
      </div>
    </div>

    <span class="slide-number">02</span>
  </section>
</template>

<script>
export default {
  name: 'AboutSlide',
  data() {
    return {
      roles: [
        { title: 'Principle Software Engineer', company: 'AuthLab' },
        { title: 'Lead Software Engineer', company: 'AuthLab' },
        { title: 'Senior Software Engineer', company: 'WPManageNinja' },
      ],
    }
  },
}
</script>

<style scoped>
.about-content {
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 80px 120px;
  height: 100%;
}

.about-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
}

.about-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.roles-list {
  margin-top: 0;
}

.role-item {
  padding: 24px 0;
  border-top: 1px solid var(--border);
}

.role-title {
  font-size: 20px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.role-company {
  font-size: 14px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    padding: 60px 24px;
    gap: 40px;
  }
}
</style>
