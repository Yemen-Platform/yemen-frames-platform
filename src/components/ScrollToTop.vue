<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const toggleVisibility = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
  toggleVisibility()
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<template>
  <transition name="fade">
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl"
      aria-label="العودة لأعلى الصفحة"
    >
      <i class="i-ri-arrow-up-line text-2xl" />
    </button>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>