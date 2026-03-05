<template>
  <section class="slide bg-primary">
    <div class="slide-content hero-content">
      <div class="hero-text">
        <div class="hero-tag hero-animate">
          <span>Tech Lead — Dhaka, Bangladesh</span>
        </div>

        <h1 class="hero-name font-serif hero-animate">Hasanuzzaman</h1>

        <p class="hero-tagline hero-animate">
          Full-stack engineer focused on scalable products and clean user experience.
        </p>

        <div class="hero-ctas hero-animate">
          <a href="mailto:hasanuzzamanbe@gmail.com" class="cta-primary">Get in Touch</a>
          <a href="#projects" class="cta-secondary" @click.prevent="$parent.$parent.scrollToSection(4)">View Projects</a>
        </div>
      </div>

      <div class="hero-image-wrap hero-image">
        <img src="/media/profile-photo.jpg" alt="Hasanuzzaman" class="profile-img" />
      </div>
    </div>

    <span class="slide-number">01</span>
  </section>
</template>

<script>
export default {
  name: 'HeroSlide',
}
</script>

<style scoped>
.hero-content {
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 80px 120px;
}

.hero-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.hero-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: 6px 16px;
  background: var(--bg-card);
}

.hero-tag span {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
  letter-spacing: 2px;
}

.hero-name {
  font-size: 72px;
  line-height: 1;
  color: var(--text-primary);
}

.hero-tagline {
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 500px;
}

.hero-ctas {
  display: flex;
  gap: 16px;
  align-items: center;
}

.cta-primary {
  display: inline-flex;
  padding: 14px 32px;
  background: var(--accent);
  color: var(--bg-primary);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: opacity 0.3s;
}

.cta-primary:hover { opacity: 0.85; }

.cta-secondary {
  display: inline-flex;
  padding: 14px 32px;
  border: 1px solid var(--border-light);
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: border-color 0.3s;
}

.cta-secondary:hover {
  border-color: var(--text-secondary);
}

.hero-image-wrap {
  width: 360px;
  height: 420px;
  flex-shrink: 0;
  overflow: hidden;
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 1024px) {
  .hero-content {
    padding: 60px 40px;
    gap: 40px;
  }
  .hero-name { font-size: 48px; }
  .hero-image-wrap { width: 280px; height: 340px; }
}

@media (max-width: 768px) {
  .hero-content {
    flex-direction: column-reverse;
    padding: 40px 24px;
    justify-content: center;
  }
  .hero-name { font-size: 40px; }
  .hero-image-wrap { width: 200px; height: 240px; }
  .hero-tagline { font-size: 16px; }
}
</style>
