<template>
  <div id="portfolio" :data-theme="theme">
    <AppHeader
      :theme="theme"
      :active-section="activeSection"
      @toggle-theme="toggleTheme"
      @navigate="scrollToSection"
    />

    <SlideNav
      :total="sections.length"
      :active="activeSection"
      @navigate="scrollToSection"
    />

    <main ref="slidesContainer">
      <HeroSlide class="slide-section" data-index="0" />
      <AboutSlide class="slide-section" data-index="1" />
      <ExperienceSlide class="slide-section" data-index="2" />
      <SkillsSlide class="slide-section" data-index="3" />
      <ProjectsSlide class="slide-section" data-index="4" />
      <TravelSlide class="slide-section" data-index="5" />
      <ContactSlide class="slide-section" data-index="6" />
    </main>
  </div>
</template>

<script>
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppHeader from './components/AppHeader.vue'
import SlideNav from './components/SlideNav.vue'
import HeroSlide from './components/HeroSlide.vue'
import AboutSlide from './components/AboutSlide.vue'
import ExperienceSlide from './components/ExperienceSlide.vue'
import SkillsSlide from './components/SkillsSlide.vue'
import ProjectsSlide from './components/ProjectsSlide.vue'
import TravelSlide from './components/TravelSlide.vue'
import ContactSlide from './components/ContactSlide.vue'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'App',
  components: {
    AppHeader,
    SlideNav,
    HeroSlide,
    AboutSlide,
    ExperienceSlide,
    SkillsSlide,
    ProjectsSlide,
    TravelSlide,
    ContactSlide,
  },
  data() {
    return {
      theme: 'dark',
      activeSection: 0,
      sections: ['Hero', 'About', 'Experience', 'Skills', 'Projects', 'Travel', 'Contact'],
    }
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
    },
    scrollToSection(index) {
      const sections = document.querySelectorAll('.slide-section')
      if (sections[index]) {
        sections[index].scrollIntoView({ behavior: 'smooth' })
      }
    },
    initAnimations() {
      const sections = document.querySelectorAll('.slide-section')

      sections.forEach((section, i) => {
        // Track active section
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => { this.activeSection = i },
          onEnterBack: () => { this.activeSection = i },
        })

        // Animate slide content on enter
        const content = section.querySelectorAll('.animate-in')
        if (content.length) {
          gsap.from(content, {
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          })
        }
      })

      // Hero special animation — runs on page load
      const heroElements = document.querySelectorAll('.hero-animate')
      gsap.from(heroElements, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3,
      })

      // Hero image scale
      gsap.from('.hero-image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.5,
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initAnimations()
    })
  },
}
</script>

<style>
#portfolio {
  min-height: 100vh;
  background: var(--bg-primary);
}
</style>
