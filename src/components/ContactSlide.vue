<template>
  <section class="slide bg-secondary">
    <div class="slide-content contact-content">
      <div class="contact-top">
        <div class="contact-cta">
          <span class="section-label animate-in">06 — Contact</span>
          <h2 class="contact-headline font-serif animate-in">Let's work<br />together.</h2>
          <p class="contact-subline animate-in">
            I'm always open to new projects and collaborations.
          </p>

          <div class="contact-info animate-in">
            <a href="mailto:hasanuzzamanbe@gmail.com" class="contact-row">
              <Mail :size="18" class="contact-icon" />
              <span>hasanuzzamanbe@gmail.com</span>
            </a>
            <a href="tel:+8801749813408" class="contact-row">
              <Phone :size="18" class="contact-icon" />
              <span>+8801749813408</span>
            </a>
          </div>
        </div>

        <div class="social-links animate-in">
          <span class="section-label">Links</span>
          <a
            v-for="link in links"
            :key="link.label"
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="social-link"
          >
            <span>{{ link.label }}</span>
            <ArrowUpRight :size="14" class="link-arrow" />
          </a>
        </div>
      </div>

      <div class="contact-bottom animate-in">
        <span class="copyright">2024 Hasanuzzaman. All rights reserved.</span>
        <span class="location">Dhaka, Bangladesh</span>
      </div>
    </div>

    <span class="slide-number">07</span>
  </section>
</template>

<script>
import { Mail, Phone, ArrowUpRight } from 'lucide-vue-next'

export default {
  name: 'ContactSlide',
  components: { Mail, Phone, ArrowUpRight },
  data() {
    return {
      links: [
        { label: 'GitHub', url: 'https://github.com/shamim0902' },
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/shamim0902/' },
        { label: 'WordPress', url: 'https://profiles.wordpress.org/hasanuzzamanshamim' },
        { label: 'Twitter', url: 'http://www.twitter.com/shamim0902' },
        { label: 'ADPList Mentorship', url: 'https://adplist.org/mentors/hasanuzzaman-shamim' },
      ],
    }
  },
}
</script>

<style scoped>
.contact-content {
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 80px 120px 60px;
  height: 100%;
  justify-content: center;
}

.contact-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 80px;
}

.contact-cta {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact-headline {
  font-size: 56px;
  color: var(--text-primary);
  line-height: 1.1;
}

.contact-subline {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  font-size: 16px;
  transition: opacity 0.3s;
}

.contact-row:hover { opacity: 0.7; }

.contact-icon {
  color: var(--text-secondary);
  flex-shrink: 0;
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 240px;
  flex-shrink: 0;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  color: var(--text-secondary);
  transition: color 0.3s;
}

.social-link:hover {
  color: var(--text-primary);
}

.link-arrow {
  color: var(--text-muted);
}

.contact-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.copyright, .location {
  font-size: 13px;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .contact-content { padding: 40px 24px; gap: 40px; }
  .contact-top { flex-direction: column; gap: 40px; }
  .contact-headline { font-size: 36px; }
  .social-links { width: 100%; }
}
</style>
