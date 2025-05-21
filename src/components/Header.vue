<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'
import { useWindowScroll } from '@vueuse/core'
import { computed, onMounted, onUnmounted, ref, unref, watch } from 'vue'
import ThemeToggle from './ThemeToggle.vue'
import AppLogo from '@/components/AppLogo.vue'

const navLinks = siteConfig.header.navLinks || []

const socialLinks = computed(() => 
  siteConfig.socialLinks.filter(link => {
    if (typeof link.header === 'boolean') return link.header
    if (typeof link.header === 'string') {
      link.icon = link.header.includes('i-') ? link.header : link.icon
      return true
    }
    return false
  })
)

const { y: scroll } = useWindowScroll()
const oldScroll = ref(unref(scroll))
const isNavOpen = ref(false)

let headerEl: HTMLElement | null = null

function onScroll() {
  if (!headerEl) return

  const currentScroll = scroll.value

  if (document.documentElement.scrollTop > 100)
    headerEl.classList.add('header-bg-blur')

  if (currentScroll < 150) {
    headerEl.classList.remove('header-hide')
    oldScroll.value = currentScroll
    return
  }

  if (currentScroll - oldScroll.value > 150) {
    headerEl.classList.add('header-hide')
    oldScroll.value = currentScroll
  }

  if (oldScroll.value - currentScroll > 150) {
    headerEl.classList.remove('header-hide')
    oldScroll.value = currentScroll
  }
}

onMounted(() => {
  headerEl = document.querySelector('#header') as HTMLElement
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(isNavOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

function toggleNavDrawer() {
  isNavOpen.value = !isNavOpen.value
}
</script>

<template>
  <header
    id="header"
    :class="{ 'header-bg-blur': scroll > 14 }"
    class="transition-all duration-500 ease-in-out
           !fixed z-899 w-screen h-20 px-6 flex items-center justify-between relative
           bg-gradient-to-r from-[#0a192f]/80 via-[#112240]/80 to-[#0a192f]/80
           dark:from-[#0a0f1a]/90 dark:via-[#0e1523]/90 dark:to-[#0a0f1a]/90"
  >
    <!-- زر القائمة -->
    <div class="sm:hidden flex items-center cursor-pointer">
      <menu i-ri-menu-2-fill class="text-yellow-400 text-2xl" @click="toggleNavDrawer()" />
    </div>

    <!-- الشعار -->
    <div class="flex-1 flex justify-center">
      <a href="/" aria-label="Header Logo Image">
        <AppLogo />
      </a>
    </div>

    <!-- زر الوضع الليلي -->
    <div class="flex items-center">
      <ThemeToggle />
    </div>
  </header>

  <!-- القائمة المنسدلة -->
  <nav class="nav-drawer-top sm:hidden" :class="{ open: isNavOpen }">
    <div class="flex justify-end px-6 pt-4">
      <button
        class="text-white text-3xl hover:text-yellow-400 transition-colors"
        @click="toggleNavDrawer()"
        aria-label="إغلاق القائمة"
      >
        <i class="i-ri-close-line" />
      </button>
    </div>

    <div class="flex flex-col items-center justify-center gap-6 py-10 px-6">
      <a
        v-for="link in navLinks"
        :key="link.text"
        :aria-label="link.text"
        :target="getLinkTarget(link.href)"
        nav-link
        :href="link.href"
        @click="toggleNavDrawer()"
        class="text-white text-2xl font-semibold tracking-wide hover:text-yellow-400 hover:scale-105 transition-all duration-300"
      >
        {{ link.text }}
      </a>
    </div>

    <div v-if="socialLinks.length" class="flex justify-center gap-6 pb-10 pt-6 border-t border-gray-700">
      <a
        v-for="link in socialLinks"
        :key="link.href"
        :href="link.href"
        :target="getLinkTarget(link.href)"
        class="text-white text-2xl hover:text-yellow-400 transition-colors"
        :aria-label="link.icon || 'Social link'"
      >
        <i :class="link.icon" />
      </a>
    </div>
  </nav>

  <!-- الخلفية المظللة -->
  <div
    class="nav-drawer-mask"
    v-show="isNavOpen"
    @click="toggleNavDrawer()"
  />
</template>

<style scoped>
#header {
  transition: transform 0.4s ease, opacity 0.4s ease;
  opacity: 1;
}

.header-hide {
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.header-bg-blur {
  --at-apply: backdrop-blur-sm;
}

.nav-drawer-top {
  transform: translateY(-100%);
  --at-apply: fixed inset-0 z-999 bg-gradient-to-b from-[#1e293b]/95 via-[#0f172a]/95 to-[#1e293b]/95 backdrop-blur-md transition-transform duration-300 ease-in-out overflow-y-auto;
}
.nav-drawer-top.open {
  transform: translateY(0%);
}

.nav-drawer-mask {
  display: block;
  content: '';
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 998;
  transition: opacity 0.3s ease;
}
</style>