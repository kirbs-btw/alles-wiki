import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kindersitz-Wechsel-Rechner (Orientierung). Empfiehlt anhand von Gewicht, Größe und
// Alter die passende Kindersitz-Kategorie und weist auf die Kindersitzpflicht hin.
// Kindersitzpflicht in DE: bis zum 12. Geburtstag ODER bis 150 cm Körpergröße,
// je nachdem, was zuerst eintritt. Reboarder (rückwärtsgerichtet) wird mindestens
// bis 15 Monate empfohlen (i-Size/ECE R129). Größenklassen sind Richtwerte –
// maßgeblich sind die Herstellerangaben des konkreten Sitzes. Keine Sicherheitsgarantie.

const PFLICHT_ALTER = 12; // Jahre
const PFLICHT_GROESSE = 150; // cm
const REBOARDER_MONATE = 15; // mindestens rückwärtsgerichtet

function empfehlung(gewichtKg: number, groesseCm: number, alterJahre: number): string {
  // Grobe Zuordnung anhand Gewicht und Größe (R44-Gruppen + i-Size-Logik).
  if (gewichtKg <= 0 && groesseCm <= 0) return 'Babyschale (Gruppe 0/0+)';
  if (groesseCm <= 75 || gewichtKg <= 10) return 'Babyschale (Gruppe 0+), rückwärts';
  if (groesseCm <= 105 || gewichtKg <= 18) return 'Kleinkindsitz (Gruppe 1), mit Fangkörper/Gurt';
  if (groesseCm < PFLICHT_GROESSE && gewichtKg <= 36 && alterJahre < PFLICHT_ALTER)
    return 'Sitzerhöhung mit Rückenlehne (Gruppe 2/3)';
  return 'kein Kindersitz mehr nötig (nur Gurt)';
}

export const tool: Tool = {
  slug: 'kindersitz-wechsel-rechner',
  category: 'familie',
  title: 'Kindersitz-Wechsel-Rechner (Gewicht & Größe)',
  shortTitle: 'Kindersitz-Wechsel',
  description:
    'Finde die passende Kindersitz-Kategorie anhand von Gewicht, Größe und Alter und prüfe die Kindersitzpflicht (bis 12 Jahre oder 150 cm). Orientierung, keine Sicherheitsgarantie.',
  keywords: [
    'kindersitz rechner',
    'welcher kindersitz alter',
    'kindersitz gewicht größe',
    'kindersitzpflicht ende',
    'wann sitzerhöhung kind',
    'reboarder bis wann',
  ],
  intro:
    'Welcher Kindersitz passt – und wann darf das Kind ohne Sitzerhöhung fahren? In Deutschland gilt die Kindersitzpflicht bis zum 12. Geburtstag oder bis 150 cm Körpergröße, je nachdem, was zuerst erreicht wird. Dieser Rechner ordnet anhand von Gewicht, Größe und Alter grob die passende Sitzkategorie zu und zeigt, ob noch ein Sitz nötig ist. Ein Reboarder (rückwärtsgerichtet) wird mindestens bis 15 Monate empfohlen. Hinweis: Richtwerte – maßgeblich sind die Angaben des konkreten Sitzes (Gewichts- und Größengrenzen). Keine Sicherheitsgarantie.',
  formula:
    'Pflicht endet bei 12. Geburtstag oder 150 cm; Kategorie nach Gewicht/Größe (R44-Gruppen bzw. i-Size)',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Gewicht des Kindes', unit: 'kg', default: 15, min: 0, max: 60, step: 0.5 },
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 95, min: 0, max: 200, step: 1 },
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 4, min: 0, max: 18, step: 1 },
  ],
  compute: (v) => {
    const gewicht = Math.max(0, num(v.gewicht, 15));
    const groesse = Math.max(0, num(v.groesse, 95));
    const alter = Math.max(0, Math.round(num(v.alter, 4)));
    const sitzPflicht = alter < PFLICHT_ALTER && groesse < PFLICHT_GROESSE;
    const jahreBis12 = Math.max(0, PFLICHT_ALTER - alter);
    const cmBis150 = Math.max(0, PFLICHT_GROESSE - groesse);
    return [
      { label: 'Empfohlene Sitzkategorie', value: empfehlung(gewicht, groesse, alter), primary: true },
      { label: 'Kindersitzpflicht', value: sitzPflicht ? 'ja' : 'nein', help: 'bis 12 J. oder 150 cm' },
      { label: 'Reboarder empfohlen', value: alter < 2 ? 'ja (mind. 15 Monate)' : 'nicht mehr zwingend' },
      { label: 'Jahre bis zum 12. Geburtstag', value: jahreBis12, unit: 'Jahre', digits: 0 },
      { label: 'cm bis 150 cm', value: cmBis150, unit: 'cm', digits: 0 },
    ];
  },
  howto: [
    'Aktuelles Gewicht des Kindes in Kilogramm eingeben.',
    'Körpergröße in Zentimetern eintragen.',
    'Alter in Jahren wählen.',
    'Empfohlene Sitzkategorie ablesen und mit den Herstellerangaben des Sitzes abgleichen.',
  ],
  faq: [
    { q: 'Bis wann gilt die Kindersitzpflicht?', a: 'Bis zum 12. Geburtstag oder bis das Kind 150 cm groß ist – je nachdem, was zuerst eintritt. Danach reicht der normale Sicherheitsgurt.' },
    { q: 'Wie lange rückwärtsgerichtet fahren?', a: 'Ein Reboarder wird mindestens bis 15 Monate empfohlen (i-Size/ECE R129), viele Sitze erlauben rückwärts deutlich länger. Rückwärts ist bei einem Frontalaufprall sicherer für Kopf und Nacken.' },
    { q: 'Geht der Wechsel nach Gewicht oder Größe?', a: 'Ältere Sitze (ECE R44) gehen nach Gewicht, neuere (i-Size/R129) nach Körpergröße. Entscheidend sind immer die Grenzwerte des konkreten Sitzmodells, nicht nur das Alter.' },
    { q: 'Ist diese Empfehlung verbindlich?', a: 'Nein. Es ist eine grobe Orientierung. Maßgeblich sind die Gewichts- und Größengrenzen Ihres Sitzes sowie ein korrekter Einbau. Keine Sicherheitsgarantie.' },
  ],
  related: ['alter-rechner', 'erstausstattung-baby-rechner', 'kosten-kind-rechner', 'familienurlaub-budget-rechner'],
  examples: [
    {
      values: { gewicht: 15, groesse: 95, alter: 4 },
      expect: [
        { label: 'Jahre bis zum 12. Geburtstag', value: 8, tolerance: 0 },
        { label: 'cm bis 150 cm', value: 55, tolerance: 0 },
      ],
    },
    {
      values: { gewicht: 45, groesse: 152, alter: 11 },
      expect: [
        { label: 'cm bis 150 cm', value: 0, tolerance: 0 },
        { label: 'Jahre bis zum 12. Geburtstag', value: 1, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
