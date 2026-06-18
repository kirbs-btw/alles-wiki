import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Wissens-Collection: redaktionelle Artikel (Markdown) zu allen Alltagsthemen.
 * Slug = <kategorie>/<name> (aus der Ordnerstruktur unter src/content/wissen/).
 */
const wissen = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wissen' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'finanzen',
      'gesundheit',
      'auto',
      'wohnen',
      'recht',
      'familie',
      'beruf',
      'bildung',
      'energie',
      'mathe',
      'alltag',
      'technik',
    ]),
    keywords: z.array(z.string()).default([]),
    updated: z.string(),
    related: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * How-to-Collection: deutsche Schritt-für-Schritt-Anleitungen (Markdown).
 * Slug = <kategorie>/<name> (aus der Ordnerstruktur unter src/content/howto/).
 * `steps` speist die nummerierte Schrittliste und das HowTo-JSON-LD.
 */
const howto = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/howto' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum([
      'finanzen',
      'gesundheit',
      'auto',
      'wohnen',
      'recht',
      'familie',
      'beruf',
      'bildung',
      'energie',
      'mathe',
      'alltag',
      'technik',
    ]),
    keywords: z.array(z.string()).default([]),
    updated: z.string(),
    steps: z.array(z.string()).default([]),
    related: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { wissen, howto };
