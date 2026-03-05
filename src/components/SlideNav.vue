<template>
  <div class="slide-nav">
    <button
      v-for="(_, i) in total"
      :key="i"
      class="dot"
      :class="{ active: i === active }"
      @click="$emit('navigate', i)"
    />
  </div>
</template>

<script>
export default {
  name: 'SlideNav',
  props: {
    total: { type: Number, required: true },
    active: { type: Number, default: 0 },
  },
  emits: ['navigate'],
}
</script>

<style scoped>
.slide-nav {
  position: fixed;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot.active {
  width: 10px;
  height: 10px;
  background: var(--text-primary);
}

.dot:hover {
  background: var(--text-secondary);
}

@media (max-width: 768px) {
  .slide-nav {
    right: 16px;
  }
}
</style>
