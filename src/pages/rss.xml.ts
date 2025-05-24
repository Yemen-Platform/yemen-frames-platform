import siteConfig from '@/site-config'
import { getPosts } from '@/utils/posts'
import rss from '@astrojs/rss'

interface Context {
  site: string
}

export async function GET(context: Context) {
  const posts = await getPosts()

  // تأكد من أن site لا ينتهي بشرطة مائلة قبل إضافة المسار
  const baseUrl = context.site.endsWith('/') ? context.site.slice(0, -1) : context.site

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
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
