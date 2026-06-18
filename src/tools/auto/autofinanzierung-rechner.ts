import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'autofinanzierung-rechner',
  category: 'auto',
  title: 'Autokredit-Rechner (Finanzierung)',
  shortTitle: 'Autokredit',
  description:
    'Berechne die monatliche Rate, Gesamtkosten und Zinsanteil eines Autokredits aus Kaufpreis, Anzahlung, Zinssatz und Laufzeit – mit Annuitätenformel.',
  keywords: [
    'autokredit rechner',
    'autofinanzierung berechnen',
    'monatliche rate auto',
    'kfz finanzierung rechner',
    'kreditrate auto berechnen',
    'autokredit zinsen',
    'finanzierung auto monatlich',
  ],
  formula: 'Rate = K × (i × (1+i)^n) / ((1+i)^n − 1), mit i = Jahreszins/12, n = Monate',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis', unit: '€', default: 25000, min: 0, step: 100 },
    { type: 'number', id: 'anzahlung', label: 'Anzahlung', unit: '€', default: 5000, min: 0, step: 100 },
    { type: 'number', id: 'schlussrate', label: 'Schlussrate / Ballon', unit: '€', default: 0, min: 0, step: 100, help: 'Optionale Schlussrate bei Ballonfinanzierung.' },
    { type: 'number', id: 'zins', label: 'Effektiver Jahreszins', unit: '%', default: 4.5, min: 0, step: 0.1 },
    { type: 'number', id: 'laufzeit', label: 'Laufzeit', unit: 'Monate', default: 48, min: 1, step: 1 },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const anzahlung = num(v.anzahlung);
    const schlussrate = num(v.schlussrate);
    const zins = num(v.zins);
    const laufzeit = num(v.laufzeit, 1);
    const kreditbetrag = Math.max(0, kaufpreis - anzahlung);
    const i = zins / 100 / 12;
    const n = laufzeit;
    // Annuität mit optionaler Restschuld (Ballon): Rate tilgt (Kredit − Barwert der Schlussrate)
    const q = 1 + i;
    const qn = Math.pow(q, n);
    const barwertSchluss = schlussrate / qn;
    const tilgbar = kreditbetrag - barwertSchluss;
    let rate: number;
    if (i > 0) {
      rate = qn - 1 > 0 ? tilgbar * (i * qn) / (qn - 1) : tilgbar / n;
    } else {
      rate = n > 0 ? (kreditbetrag - schlussrate) / n : 0;
    }
    const summeRaten = rate * n;
    const gesamtRueckzahlung = summeRaten + schlussrate;
    const zinskosten = gesamtRueckzahlung - kreditbetrag;
    const gesamtkostenAuto = anzahlung + gesamtRueckzahlung;
    return [
      { label: 'Monatliche Rate', value: rate, unit: '€', digits: 2, primary: true },
      { label: 'Kreditbetrag', value: kreditbetrag, unit: '€', digits: 2 },
      { label: 'Zinskosten gesamt', value: zinskosten, unit: '€', digits: 2 },
      { label: 'Gesamtkosten des Autos', value: gesamtkostenAuto, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einem Autokredit zahlst du jeden Monat eine gleichbleibende Rate (Annuität), die sich aus Tilgung und Zinsen zusammensetzt. Eine Anzahlung senkt den Kreditbetrag, eine Schlussrate (Ballon) reduziert die Monatsrate, erhöht aber meist die Gesamtzinsen. Der Rechner zeigt Rate, Zinskosten und die echten Gesamtkosten.',
  howto: [
    'Kaufpreis des Fahrzeugs eintragen.',
    'Anzahlung und – falls vorhanden – die Schlussrate (Ballon) angeben.',
    'Effektiven Jahreszins und Laufzeit in Monaten eintragen.',
    'Monatsrate, Zinskosten und Gesamtkosten vergleichen.',
  ],
  faq: [
    { q: 'Was ist eine Ballonfinanzierung?', a: 'Dabei ist die letzte Rate (Schlussrate) besonders hoch. Die Monatsraten sind dadurch niedriger, die gesamten Zinskosten aber oft höher.' },
    { q: 'Effektiver oder nomineller Zins?', a: 'Vergleiche immer den effektiven Jahreszins – er enthält alle Kosten und macht Angebote vergleichbar.' },
    { q: 'Senkt eine Anzahlung die Zinsen?', a: 'Ja, weil der finanzierte Betrag kleiner ist. Über die Laufzeit zahlst du dadurch weniger Zinsen.' },
    { q: 'Was zählt zu den Gesamtkosten?', a: 'Anzahlung plus alle Monatsraten plus eventuelle Schlussrate. Diese Summe zeigt, was das Auto inklusive Finanzierung wirklich kostet.' },
    { q: 'Ist Barzahlung günstiger?', a: 'Meist ja, da keine Zinsen anfallen. Allerdings können Händlerrabatte bei Finanzierung den Vorteil teilweise ausgleichen – immer beide Wege durchrechnen.' },
  ],
  related: ['leasing-rechner', 'kosten-pro-km-rechner', 'wertverlust-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 25000, anzahlung: 5000, schlussrate: 0, zins: 4.5, laufzeit: 48 },
      expect: [{ label: 'Monatliche Rate', value: 456.07, tolerance: 0.5 }],
    },
    {
      values: { kaufpreis: 25000, anzahlung: 5000, schlussrate: 0, zins: 0, laufzeit: 48 },
      expect: [{ label: 'Monatliche Rate', value: 416.67, tolerance: 0.5 }],
    },
  ],
};
