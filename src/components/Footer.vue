<script lang="ts" setup>
import siteConfig from '@/site-config'
import { getLinkTarget } from '@/utils/link'

// تخزين رابط الشعار في متغير ثابت لتجنب إعادة التقييم المتكرر
const logoSrc = siteConfig.header.logo.src
</script>

<template>
  <footer class="w-full mt-18 pt-6 pb-8 max-w-3xl text-sm flex flex-col gap-6 border-main border-t !border-op-50 text-dark dark:text-white items-center text-center">
    
    <!-- الشعار والنبذة -->
    <div class="flex flex-col items-center gap-2">
      <img
        :src="logoSrc"
        :alt="siteConfig.header.logo.alt"
        class="w-24 h-auto"
        loading="lazy"
      />
      <p class="max-w-sm opacity-80 leading-relaxed text-[0.95rem]">
        {{ siteConfig.description }}
      </p>
    </div>

    <!-- روابط التذييل -->
    <div v-if="siteConfig.footer.navLinks && siteConfig.footer.navLinks.length > 0" class="flex flex-wrap gap-4 justify-center">
      <template v-for="(link, index) in siteConfig.footer.navLinks" :key="link.text">
        <a
          :aria-label="link.text"
          :target="getLinkTarget(link.href)"
          class="nav-link flex items-center"
          :href="link.href"
        >
          {{ link.text }}
        </a>
        <span v-if="index < siteConfig.footer.navLinks.length - 1" class="opacity-70"> / </span>
      </template>
    </div>

    <!-- روابط التواصل -->
    <div v-if="siteConfig.socialLinks && siteConfig.socialLinks.length > 0" class="flex justify-center gap-4 text-xl">
      <a
        v-for="social in siteConfig.socialLinks"
        :key="social.text"
        :href="social.href"
        target="_blank"
        :aria-label="social.text"
        class="hover:text-yellow-500 transition-colors duration-200"
      >
        <i :class="social.icon" />
      </a>
    </div>

    <!-- الحقوق -->
    <div class="flex justify-center gap-2 mt-2 text-center text-xs opacity-70">
      <a class="nav-link" href="/">كافة الحقوق محفوظة</a>
      <span>&copy; {{ new Date().getFullYear() }} {{ siteConfig.author }}</span>
    </div>
  </footer>
</template>