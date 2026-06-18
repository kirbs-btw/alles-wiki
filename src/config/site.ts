/**
 * Zentrale Marken- & Site-Konfiguration. Marke/Domain hier ändern → wirkt überall.
 */
export const SITE = {
  name: 'AllesWiki',
  domain: 'alles-wiki.de',
  url: 'https://www.alles-wiki.de',
  tagline: 'Rechner, Wissen & How-to für jeden Alltag',
  description:
    'AllesWiki: kostenlose Rechner, verständliches Wissen und How-to-Anleitungen zu allen Alltagsthemen in Deutschland – Finanzen, Gesundheit, Auto, Wohnen, Recht, Familie und mehr.',
  locale: 'de',
  ogLocale: 'de_DE',
  lang: 'de-DE',
  author: 'AllesWiki',
  themeColor: '#2563eb',
  email: 'kontakt@alles-wiki.de',
} as const;

export const NAV_MAIN = [
  { label: 'Alle Rechner', href: '/rechner' },
  { label: 'Kategorien', href: '/#kategorien' },
  { label: 'Über uns', href: '/ueber-uns' },
] as const;
