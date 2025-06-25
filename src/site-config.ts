// site-config.ts
export const siteConfig = {
  author: 'Mohammed Beshr',
  title: 'منصة إطارات اليمن',
  subtitle: 'أول منصة يمنية لإنشاء الإطارات على الصور.',
  description: 'إطارات اليمن أول منصة يمنية متخصصة في تصميم إطارات الصور بأسلوب عصري وتجربة استخدام مرنة وسهلة.',
  image: {
    src: '/hero.webp',         // تأكد من تحسين حجم الصورة لتقليل وقت التحميل
    alt: 'الصورة الرئيسية لمنصة إطارات اليمن',
  },
  email: 'ye-frames@gmail.com',
  socialLinks: [
    {
      text: 'فيسبوك',
      href: 'https://www.facebook.com/Yemen.Frames',
      icon: 'i-ri-facebook-circle-line',
      header: 'i-ri-facebook-circle-fill',
    },
    {
      text: 'إكس',
      href: 'https://x.com/Yemen-Frames',
      icon: 'i-simple-icons-x',
      header: 'i-ri-twitter-x-line',
    },
    {
      text: 'انستغرام',
      href: 'https://www.instagram.com/yemenframes',
      icon: 'i-simple-icons-instagram',
      header: 'i-simple-icons-instagram',
    },
  ],
  header: {
    logo: {
      src: '/logo-gold.svg',   // استخدم svg لتحسين الأداء وسرعة التحميل
      alt: 'شعار منصة إطارات اليمن',
    },
    navLinks: [
      { text: 'الإطارات', href: '/frame' },
      { text: 'دليل الاستخدام', href: '/posts/guide' },
      { text: 'عن المنصة', href: '/about' },
      { text: 'سياسة الخصوصية', href: '/privacy-policy' },
      { text: 'كن داعمًا', href: '/sponsored' },
      { text: 'سجل التغييرات', href: '/changelog' },
      { text: 'تواصل معنا', href: '/contactUs' },
    ],
  },
  page: {
    blogLinks: [
      { text: 'المدونة', href: '/blog' },
    ],
  },
  footer: {
    navLinks: [
      { text: 'شروط الاستخدام', href: '/TermsOfUse' },
      { text: 'سجل التغييرات', href: '/changelog' },
      { text: 'سياسة الخصوصية', href: '/privacy-policy' },
    ],
  },
}

export default siteConfig
