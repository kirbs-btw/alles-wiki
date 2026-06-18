import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'grundumsatz-rechner',
  category: 'gesundheit',
  title: 'Grundumsatz-Rechner (BMR)',
  shortTitle: 'Grundumsatz',
  description:
    'Berechne deinen Grundumsatz (BMR) nach der Mifflin-St-Jeor-Formel aus Gewicht, Größe, Alter und Geschlecht – die Kalorien, die dein Körper in Ruhe verbraucht.',
  keywords: [
    'grundumsatz rechner',
    'grundumsatz berechnen',
    'bmr rechner',
    'mifflin st jeor',
    'kalorienverbrauch ruhe',
    'basaler stoffwechsel',
    'grundumsatz formel',
  ],
  formula:
    'BMR = 10×Gewicht(kg) + 6,25×Größe(cm) − 5×Alter + s (s = +5 Mann, −161 Frau)',
  inputs: [
    {
      type: 'select', id: 'geschlecht', label: 'Geschlecht', default: 'mann',
      options: [
        { value: 'mann', label: 'Männlich' },
        { value: 'frau', label: 'Weiblich' },
      ],
    },
    { type: 'number', id: 'gewicht', label: 'Gewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'groesse', label: 'Größe', unit: 'cm', default: 178, min: 1, step: 1 },
    { type: 'number', id: 'alter', label: 'Alter', unit: 'Jahre', default: 30, min: 1, max: 120, step: 1 },
  ],
  compute: (v) => {
    const g = num(v.gewicht);
    const h = num(v.groesse);
    const a = num(v.alter);
    const s = String(v.geschlecht) === 'frau' ? -161 : 5;
    const bmr = 10 * g + 6.25 * h - 5 * a + s;
    const bmrSafe = bmr > 0 ? bmr : 0;
    return [
      { label: 'Grundumsatz', value: bmrSafe, unit: 'kcal/Tag', digits: 0, primary: true },
      { label: 'Grundumsatz pro Stunde', value: bmrSafe / 24, unit: 'kcal/h', digits: 1 },
      { label: 'Grundumsatz pro Woche', value: bmrSafe * 7, unit: 'kcal', digits: 0 },
    ];
  },
  intro:
    'Der Grundumsatz (englisch Basal Metabolic Rate, BMR) ist die Energiemenge, die dein Körper in völliger Ruhe allein zur Aufrechterhaltung lebenswichtiger Funktionen wie Atmung, Herzschlag und Körpertemperatur benötigt. Die Mifflin-St-Jeor-Formel gilt als eine der genauesten Schätzformeln für gesunde Erwachsene. Der Grundumsatz bildet die Basis für die Berechnung deines gesamten Kalorienbedarfs.',
  howto: [
    'Geschlecht auswählen.',
    'Gewicht in Kilogramm eingeben.',
    'Körpergröße in Zentimetern und Alter in Jahren eingeben.',
    'Grundumsatz in Kilokalorien pro Tag ablesen.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Grundumsatz und Gesamtumsatz?', a: 'Der Grundumsatz ist der Energieverbrauch in völliger Ruhe. Der Gesamtumsatz (Tagesbedarf) ergibt sich, wenn man den Grundumsatz mit einem Aktivitätsfaktor (PAL) für Bewegung und Sport multipliziert.' },
    { q: 'Welche Formel ist genauer – Mifflin-St-Jeor oder Harris-Benedict?', a: 'Die Mifflin-St-Jeor-Formel von 1990 gilt heute als genauer als die ältere Harris-Benedict-Formel und wird von Fachgesellschaften häufig empfohlen.' },
    { q: 'Berücksichtigt der Grundumsatz die Muskelmasse?', a: 'Nur indirekt über das Körpergewicht. Bei sehr muskulösen oder sehr übergewichtigen Personen kann eine Formel auf Basis der fettfreien Masse genauer sein.' },
    { q: 'Sollte ich unter meinem Grundumsatz essen, um abzunehmen?', a: 'Davon wird abgeraten. Dauerhaft weniger als der Grundumsatz kann den Stoffwechsel belasten. Ein moderates Defizit gegenüber dem Gesamtumsatz ist sinnvoller.' },
  ],
  related: ['kalorienbedarf-rechner', 'bmi-rechner', 'idealgewicht-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { geschlecht: 'mann', gewicht: 75, groesse: 178, alter: 30 },
      expect: [{ label: 'Grundumsatz', value: 1717.5, tolerance: 1 }],
    },
    {
      values: { geschlecht: 'frau', gewicht: 60, groesse: 165, alter: 30 },
      expect: [{ label: 'Grundumsatz', value: 1320.25, tolerance: 1 }],
    },
  ],
};
