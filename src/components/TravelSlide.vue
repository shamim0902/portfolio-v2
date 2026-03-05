<template>
  <section class="slide bg-primary">
    <div class="slide-content travel-content">
      <div class="travel-header">
        <div class="travel-left">
          <span class="section-label animate-in">05 — Travel</span>
          <h2 class="section-title animate-in">Places I've been.</h2>
        </div>
        <div class="travel-stat animate-in">
          <span class="stat-count font-serif">20</span>
          <span class="stat-label">countries visited</span>
        </div>
      </div>

      <div class="travel-gallery">
        <div v-for="photo in gallery" :key="photo.id" class="gallery-card animate-in">
          <div class="gallery-img" :style="{ background: photo.accent }">
            <img :src="photo.src" :alt="photo.title" />
          </div>
          <div class="gallery-info">
            <h3 class="gallery-title font-serif">{{ photo.title }}</h3>
            <span class="gallery-location">{{ photo.location }}</span>
          </div>
        </div>
      </div>

      <p class="countries-row animate-in">
        {{ countries.join('  /  ') }}
      </p>
    </div>

    <span class="slide-number">06</span>
  </section>
</template>

<script>
export default {
  name: 'TravelSlide',
  data() {
    return {
      gallery: [
        {
          id: 'mountain-air',
          title: 'Mountain Air',
          location: 'Innsbruck, Austria',
          src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&q=80',
          accent: 'linear-gradient(135deg, rgba(8,145,178,0.85), rgba(14,116,144,0.62))',
        },
        {
          id: 'city-lights',
          title: 'City Lights',
          location: 'Amsterdam, Netherlands',
          src: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
          accent: 'linear-gradient(135deg, rgba(16,185,129,0.78), rgba(6,182,212,0.52))',
        },
        {
          id: 'golden-sunset',
          title: 'Golden Sunset',
          location: 'Athens, Greece',
          src: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80',
          accent: 'linear-gradient(135deg, rgba(14,165,233,0.78), rgba(56,189,248,0.52))',
        },
      ],
      countries: [
        'Bangladesh', 'Greece', 'Italy', 'Vatican City', 'Austria',
        'Slovakia', 'Czechia', 'Hungary', 'Germany', 'Qatar',
        'India', 'Thailand', 'Nepal', 'Turkey', 'Netherlands',
        'Belgium', 'Switzerland', 'Egypt', 'Saudi Arabia', 'Malaysia',
      ],
    }
  },
}
</script>

<style scoped>
.travel-content {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 60px 120px;
  height: 100%;
  justify-content: center;
}

.travel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.travel-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.travel-stat {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.stat-count {
  font-size: 56px;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: var(--text-muted);
}

.travel-gallery {
  display: flex;
  gap: 24px;
}

.gallery-card {
  flex: 1;
}

.gallery-img {
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
}

.gallery-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.gallery-card:hover .gallery-img img {
  transform: scale(1.05);
}

.gallery-info {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gallery-title {
  font-size: 20px;
  color: var(--text-primary);
}

.gallery-location {
  font-size: 13px;
  color: var(--text-muted);
}

.countries-row {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 2;
  text-align: center;
}

@media (max-width: 768px) {
  .travel-content { padding: 40px 24px; }
  .travel-header { flex-direction: column; align-items: flex-start; gap: 24px; }
  .travel-stat { align-items: flex-start; }
  .travel-gallery { flex-direction: column; }
  .gallery-img { height: 200px; }
  .stat-count { font-size: 40px; }
}
</style>
