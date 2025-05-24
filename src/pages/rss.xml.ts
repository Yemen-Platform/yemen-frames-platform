import siteConfig from '@/site-config'
import { getPosts } from '@/utils/posts'
import rss from '@astrojs/rss'

interface Context {
  site: string | URL; // جعل site يقبل string أو URL
}

export async function GET(context: Context) {
  const posts = await getPosts()

  // تأكد من أن context.site هو سلسلة نصية
  let siteUrlString: string;
  if (typeof context.site === 'string') {
    siteUrlString = context.site;
  } else if (context.site instanceof URL) {
    siteUrlString = context.site.toString();
  } else {
    // fallback في حالة وجود قيمة غير متوقعة، يمكنك تعديل هذا
    siteUrlString = String(context.site);
  }

  // الآن تأكد من أن baseUrl لا ينتهي بشرطة مائلة
  const baseUrl = siteUrlString.endsWith('/') ? siteUrlString.slice(0, -1) : siteUrlString;

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: siteUrlString, // استخدم siteUrlString هنا
    items: posts!.map((item) => {
      return {
        ...item.data,
        link: `${baseUrl}/posts/${item.slug}/`, // استخدم baseUrl هنا
        pubDate: new Date(item.data.date),
        content: item.body,
        author: `${siteConfig.author} <${siteConfig.email}>`,
      }
    }),
  })
}
