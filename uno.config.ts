// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';

export default defineConfig({
  theme: {
    colors: {
      main: '#2c3e50',
      accent: '#f9a825',
      'accent-light': '#fdd835',
      surface: '#fdfdfd',
      darkSurface: '#2d3748',
      border: '#cdd2d9',
      'border-dark': '#434a54',
      secondary: '#546e7a',
      'secondary-dark': '#a0aec0',
      'border-secondary': '#d6dce2',
      'border-secondary-dark': '#4a5568',
      light: '#fdfdfd',
      dark: '#1a202c',
    },
  },
  shortcuts: [
    {
      'text-main': 'text-main dark:text-accent',
      'text-title': 'text-accent text-4xl font-800',
      'text-accent-light': 'text-accent-light dark:text-accent-light',
      'bg-main': 'bg-surface dark:bg-darkSurface',
      'bg-accent': 'bg-surface dark:bg-darkSurface',
      'bg-secondary': 'bg-surface dark:bg-darkSurface',
      'bg-light': 'bg-light dark:bg-dark',
      'text-secondary': 'text-secondary dark:text-secondary-dark',
      'border-main': 'border-border dark:border-border-dark',
      'border-secondary': 'border-border-secondary dark:border-border-secondary-dark',
      'nav-link': 'text-main opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
      'prose-link': 'text-accent cursor-pointer border-b border-accent hover:border-accent-light transition duration-200 decoration-none',
      'container-link': 'p-2 opacity-60 hover:opacity-100 cursor-pointer hover:bg-light dark:hover:bg-dark !bg-opacity-10 transition-colors transition-opacity duration-200',
      'hr-line': 'w-14 mx-auto my-8 border border-accent border-opacity-50 dark:border-opacity-70',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Tajawal:400,700,900',
        lateef: 'Lateef',
      },
      processors: createLocalFontProcessor({
        cacheDir: 'node_modules/.cache/unocss/fonts',
        fontAssetsDir: 'public/assets/fonts',
        fontServeBaseUrl: '/assets/fonts',
      }),
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'i-ri-file-list-2-line',
    'i-carbon-campsite',
    'i-simple-icons-github',
    'i-simple-icons-x',
    'i-simple-icons-linkedin',
    'i-simple-icons-instagram',
    'i-simple-icons-youtube',
    'i-simple-icons-bilibili',
    'i-simple-icons-zhihu',
    'i-simple-icons-sinaweibo',
    'i-ri-github-line',
    'i-ri-twitter-x-line',
    'i-ri-facebook-circle-fill',
    'i-ri-facebook-circle-line',
  ],
  rules: [['rtl', { direction: 'rtl', 'text-align': 'right' }]],
});