import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
})

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    duration: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    date: z.union([z.string(), z.date()]),
    draft: z.boolean().default(false).optional(),
    lang: z.string().default('en-US').optional(),
    tag: z.string().optional(),
    redirect: z.string().optional(),
    video: z.boolean().default(false).optional(),
  }),
})

export const collections = { pages, blog }