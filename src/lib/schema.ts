import { SITE } from '../config/site';
import type { Tool, FaqItem } from './types';

const abs = (path: string) => new URL(path, SITE.url).href;

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function softwareAppLd(tool: Tool, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.title,
    url: abs(path),
    description: tool.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    inLanguage: 'de-DE',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}

/** WebApplication-JSON-LD für die Generator-Seiten (ohne Tool-Objekt). */
export function generatorLd(opts: { title: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.title,
    url: abs(opts.path),
    description: opts.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web',
    inLanguage: 'de-DE',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}

export function articleLd(opts: {
  title: string;
  description: string;
  path: string;
  updated: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: 'de-DE',
    dateModified: opts.updated,
    datePublished: opts.updated,
    ...(opts.keywords && opts.keywords.length > 0
      ? { keywords: opts.keywords.join(', ') }
      : {}),
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
      logo: { '@type': 'ImageObject', url: abs('/favicon.svg') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(opts.path) },
  };
}

export function howToLd(opts: {
  title: string;
  description: string;
  path: string;
  steps: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.title,
    description: opts.description,
    url: abs(opts.path),
    inLanguage: 'de-DE',
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s,
      text: s,
      url: `${abs(opts.path)}#schritt-${i + 1}`,
    })),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'de-DE',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/rechner?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: abs('/favicon.svg'),
    description: SITE.description,
  };
}
