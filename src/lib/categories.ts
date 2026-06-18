import type { CategorySlug } from './types';

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Eigene H1/Title-Überschrift (SEO). */
  h1: string;
  description: string;
  tagline: string;
  /** Inline-SVG-Pfad (24x24, stroke). */
  icon: string;
  accent: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'finanzen',
    name: 'Finanzen & Steuern',
    h1: 'Finanz- & Steuer-Rechner',
    tagline: 'Brutto-Netto, Steuern, Kredit, Zinsen & MwSt.',
    description:
      'Rechner rund um Geld: Brutto-Netto, Lohn- & Einkommensteuer, Mehrwertsteuer, Kredit, Zinsen, Zinseszins und Inflation.',
    icon: 'M3 6h18v12H3zM3 10h18M7 14h4',
    accent: 'brand',
  },
  {
    slug: 'gesundheit',
    name: 'Gesundheit',
    h1: 'Gesundheits-Rechner',
    tagline: 'BMI, Kalorien, Grundumsatz, Promille & mehr.',
    description:
      'Rechner für Körper und Gesundheit: BMI, Kalorienbedarf, Grundumsatz, Idealgewicht, Promille und Wasserbedarf.',
    icon: 'M12 21s-7-4.4-9.3-9.2C1.2 8.7 2.8 5.5 6 5.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.2 0 4.8 3.2 3.3 6.3C19 16.6 12 21 12 21z',
    accent: 'brand',
  },
  {
    slug: 'auto',
    name: 'Auto & Verkehr',
    h1: 'Auto- & Verkehrs-Rechner',
    tagline: 'Spritkosten, KFZ-Steuer, Leasing & E-Auto.',
    description:
      'Rechner für Auto und Mobilität: Spritkosten, KFZ-Steuer, Leasing vs. Kauf, Wertverlust und E-Auto-Ladekosten.',
    icon: 'M3 13l2-5h14l2 5v5h-2a2 2 0 11-4 0H9a2 2 0 11-4 0H3v-5zM5 13h14',
    accent: 'brand',
  },
  {
    slug: 'wohnen',
    name: 'Wohnen & Immobilien',
    h1: 'Wohn- & Immobilien-Rechner',
    tagline: 'Miete, Nebenkosten, Grunderwerb & Wohnfläche.',
    description:
      'Rechner rund ums Wohnen: Miete & Mieterhöhung, Nebenkosten, Grunderwerbsteuer, Quadratmeterpreis und Wohnfläche.',
    icon: 'M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9z',
    accent: 'brand',
  },
  {
    slug: 'recht',
    name: 'Recht & Soziales',
    h1: 'Rechts- & Sozial-Rechner',
    tagline: 'Bürgergeld, Elterngeld, Unterhalt & Pfändung.',
    description:
      'Rechner zu Recht und Sozialleistungen: Bürgergeld, Wohngeld, Elterngeld, Unterhalt und Pfändungsfreigrenze.',
    icon: 'M12 3v18M5 7l7-3 7 3M5 7l-2 6a4 4 0 008 0L5 7zm14 0l-2 6a4 4 0 008 0l-6-6z',
    accent: 'brand',
  },
  {
    slug: 'familie',
    name: 'Familie & Kinder',
    h1: 'Familien-Rechner',
    tagline: 'Kindergeld, Schwangerschaft, Taschengeld & Zyklus.',
    description:
      'Rechner für Familie und Kinder: Kindergeld, Geburtstermin & SSW, Eisprung, Taschengeld und Elternzeit.',
    icon: 'M9 11a3 3 0 100-6 3 3 0 000 6zm6 0a3 3 0 100-6 3 3 0 000 6zM4 20v-1a4 4 0 014-4m8 0a4 4 0 014 4v1',
    accent: 'brand',
  },
  {
    slug: 'beruf',
    name: 'Beruf & Gehalt',
    h1: 'Beruf- & Gehalts-Rechner',
    tagline: 'Stundenlohn, Urlaub, Überstunden & Vergleich.',
    description:
      'Rechner für Beruf und Gehalt: Stundenlohn, Urlaubsanspruch, Überstunden, Arbeitstage und Gehaltsvergleich.',
    icon: 'M3 8h18v12H3zM8 8V6a2 2 0 012-2h4a2 2 0 012 2v2',
    accent: 'brand',
  },
  {
    slug: 'bildung',
    name: 'Bildung & Schule',
    h1: 'Bildungs-Rechner',
    tagline: 'Notendurchschnitt, NC, Abi-Schnitt & BAföG.',
    description:
      'Rechner für Schule und Studium: Notendurchschnitt, Abi-Schnitt, NC, Notenpunkte, ECTS und BAföG.',
    icon: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c0 1 3 2 6 2s6-1 6-2v-5',
    accent: 'brand',
  },
  {
    slug: 'energie',
    name: 'Energie & Umwelt',
    h1: 'Energie-Rechner',
    tagline: 'Strom, Gas, Solar, Wärmepumpe & Heizkosten.',
    description:
      'Rechner für Energie und Umwelt: Stromkosten, Gasverbrauch, Solar-/PV-Ertrag, Wärmepumpe und Heizkosten.',
    icon: 'M13 3L4 14h6l-1 7 9-11h-6l1-7z',
    accent: 'brand',
  },
  {
    slug: 'mathe',
    name: 'Mathe & Umrechnen',
    h1: 'Mathe- & Umrechnungs-Rechner',
    tagline: 'Prozent, Dreisatz, Einheiten & Geometrie.',
    description:
      'Rechner für Mathe und Umrechnungen: Prozentrechnung, Dreisatz, Einheiten-Umrechner, Flächen und Volumen.',
    icon: 'M4 4h16v16H4zM8 8h2m-2 4h2m-2 4h2m4-8h2m-2 4h2m-2 4h2',
    accent: 'brand',
  },
  {
    slug: 'alltag',
    name: 'Alltag & Freizeit',
    h1: 'Alltags-Rechner',
    tagline: 'Datum, Alter, Trinkgeld, Kochen & Zeit.',
    description:
      'Rechner für den Alltag: Alter & Datum, Tage zwischen Daten, Trinkgeld, Rezept-Umrechnung und Zeitspannen.',
    icon: 'M12 8v4l3 2M12 3a9 9 0 100 18 9 9 0 000-18z',
    accent: 'brand',
  },
  {
    slug: 'technik',
    name: 'Technik & Internet',
    h1: 'Technik-Rechner',
    tagline: 'Datenmengen, Download-Zeit, Bildgröße & Bits.',
    description:
      'Rechner für Technik und Internet: Datenmengen umrechnen, Download-Dauer, Bildauflösung, Seitenverhältnis und Bits/Bytes.',
    icon: 'M4 5h16v10H4zM8 19h8M10 15v4m4-4v4',
    accent: 'brand',
  },
];

export const CATEGORY_MAP: Record<string, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
);

export function getCategory(slug: string): Category | undefined {
  return CATEGORY_MAP[slug];
}
