import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

const MINDESTLOHN_2026 = 13.9; // €/Std., gesetzlicher Mindestlohn ab 01.01.2026

export const tool: Tool = {
  slug: 'praktikumsverguetung-mindestlohn-rechner',
  category: 'bildung',
  title: 'Praktikumsverguetung & Mindestlohn-Check',
  shortTitle: 'Praktikum Mindestlohn',
  description:
    'Pruefe, ob deine Praktikumsverguetung den Mindestlohn erreicht: Stundenlohn aus Monatslohn und Wochenstunden plus Mindestlohn-Pflicht-Check (Stand 2026).',
  keywords: [
    'praktikum mindestlohn rechner',
    'praktikumsverguetung berechnen',
    'stundenlohn praktikum',
    'mindestlohn praktikum check',
    'praktikum bezahlung rechner',
    'mindestlohn pflichtpraktikum',
  ],
  intro:
    'Nicht jedes Praktikum muss mit Mindestlohn verguetet werden: Pflichtpraktika im Rahmen von Schule, Ausbildung oder Studium sowie freiwillige Praktika bis zu drei Monaten sind vom gesetzlichen Mindestlohn ausgenommen. Andere Praktika (z. B. freiwillig und laenger als drei Monate) haben dagegen Anspruch auf den Mindestlohn von 13,90 Euro pro Stunde (Stand 2026). Dieses Tool rechnet deinen effektiven Stundenlohn aus Monatsverguetung und Wochenstunden aus und vergleicht ihn mit dem Mindestlohn. Es ist eine vereinfachte Orientierung und ersetzt keine Rechtsberatung.',
  formula: 'Stundenlohn = Monatsverguetung / (Wochenstunden × 4,33); Vergleich mit 13,90 €/Std. (2026)',
  inputs: [
    { type: 'number', id: 'monat', label: 'Monatsverguetung (brutto)', unit: '€', default: 600, min: 0, step: 10 },
    { type: 'number', id: 'wochenstd', label: 'Wochenstunden', unit: 'Std.', default: 40, min: 1, step: 1 },
    {
      type: 'select',
      id: 'pflicht',
      label: 'Art des Praktikums',
      default: 'anspruch',
      options: [
        { value: 'anspruch', label: 'Mindestlohn-pflichtig (z. B. freiwillig > 3 Monate)' },
        { value: 'frei', label: 'Ausgenommen (Pflichtpraktikum / freiwillig bis 3 Monate)' },
      ],
      help: 'Pflichtpraktika und kurze freiwillige Praktika sind ausgenommen.',
    },
  ],
  compute: (v) => {
    const monat = num(v.monat);
    const wochenstd = num(v.wochenstd) > 0 ? num(v.wochenstd) : 1;
    const pflicht = String(v.pflicht);
    const monatsstunden = wochenstd * 4.33; // Wochenfaktor 52/12 ≈ 4,33
    const stundenlohn = monat / monatsstunden;
    const mindestMonat = MINDESTLOHN_2026 * monatsstunden;
    const anspruch = pflicht === 'anspruch';
    let status: string;
    if (!anspruch) {
      status = 'Kein Mindestlohn-Anspruch (ausgenommen)';
    } else if (stundenlohn >= MINDESTLOHN_2026) {
      status = 'Mindestlohn erreicht';
    } else {
      status = 'Unter Mindestlohn';
    }
    const differenz = anspruch ? mindestMonat - monat : 0;
    return [
      { label: 'Effektiver Stundenlohn', value: stundenlohn, unit: '€/Std.', digits: 2, primary: true },
      { label: 'Status', value: status },
      { label: 'Mindestlohn 2026', value: MINDESTLOHN_2026, unit: '€/Std.', digits: 2 },
      { label: 'Mindest-Monatsverguetung', value: mindestMonat, unit: '€', digits: 2, help: 'Nur relevant bei Mindestlohn-Anspruch.' },
      { label: 'Fehlbetrag pro Monat', value: Math.max(0, differenz), unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Monatliche Brutto-Verguetung des Praktikums eintragen.',
    'Vereinbarte Wochenstunden angeben.',
    'Art des Praktikums waehlen (Mindestlohn-pflichtig oder ausgenommen).',
    'Effektiven Stundenlohn und Mindestlohn-Status ablesen.',
  ],
  faq: [
    { q: 'Welche Praktika sind vom Mindestlohn ausgenommen?', a: 'Pflichtpraktika im Rahmen von Schule, Ausbildung oder Studium sowie freiwillige Praktika von hoechstens drei Monaten und Orientierungspraktika vor einer Ausbildung oder einem Studium. Maszgeblich ist das Mindestlohngesetz (Stand 2026).' },
    { q: 'Wie hoch ist der Mindestlohn 2026?', a: 'Der gesetzliche Mindestlohn betraegt seit dem 1. Januar 2026 13,90 Euro brutto pro Stunde. Zum 1. Januar 2027 steigt er auf 14,60 Euro.' },
    { q: 'Wie wird aus dem Monatslohn der Stundenlohn?', a: 'Das Tool rechnet die Wochenstunden mit dem Faktor 4,33 auf einen Monat hoch (52 Wochen / 12 Monate). Der Monatslohn geteilt durch diese Monatsstunden ergibt den effektiven Stundenlohn.' },
    { q: 'Ist das Ergebnis rechtsverbindlich?', a: 'Nein. Es ist eine vereinfachte Orientierung. Ob ein Mindestlohn-Anspruch besteht, haengt vom Einzelfall ab. Bei Zweifeln helfen Gewerkschaften, die Studienberatung oder eine Rechtsberatung weiter.' },
  ],
  related: ['studienkosten-rechner', 'bafoeg-hoechstsatz-rechner', 'semesterticket-ersparnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { monat: 600, wochenstd: 40, pflicht: 'anspruch' },
      // Monatsstunden 40*4,33=173,2; 600/173,2 = 3,4642...
      expect: [{ label: 'Effektiver Stundenlohn', value: 3.46, tolerance: 0.02 }],
    },
    {
      values: { monat: 2500, wochenstd: 40, pflicht: 'anspruch' },
      // 2500/173,2 = 14,434... -> ueber 13,90
      expect: [{ label: 'Effektiver Stundenlohn', value: 14.43, tolerance: 0.02 }],
    },
  ],
};
