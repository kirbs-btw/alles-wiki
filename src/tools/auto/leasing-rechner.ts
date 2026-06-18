import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'leasing-rechner',
  category: 'auto',
  title: 'Leasing-Rechner (Auto)',
  shortTitle: 'Leasing',
  description:
    'Berechne die monatliche Leasingrate, die Gesamtkosten über die Laufzeit und den Leasingfaktor – inklusive Anzahlung und Mehrkilometer.',
  keywords: [
    'leasingrate berechnen',
    'leasing rechner auto',
    'leasingfaktor berechnen',
    'monatliche leasingrate',
    'leasing kosten gesamt',
    'leasing anzahlung rechner',
    'auto leasing kalkulieren',
  ],
  formula: 'Leasingfaktor = Monatsrate / Bruttolistenpreis × 100; Gesamtkosten = Anzahlung + Rate × Monate',
  inputs: [
    { type: 'number', id: 'listenpreis', label: 'Bruttolistenpreis', unit: '€', default: 35000, min: 0, step: 100 },
    { type: 'number', id: 'rate', label: 'Monatliche Leasingrate', unit: '€', default: 320, min: 0, step: 1 },
    { type: 'number', id: 'laufzeit', label: 'Laufzeit', unit: 'Monate', default: 36, min: 1, step: 1 },
    { type: 'number', id: 'anzahlung', label: 'Anzahlung / Sonderzahlung', unit: '€', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'mehrkm', label: 'Erwartete Mehrkilometer', unit: 'km', default: 0, min: 0, step: 100 },
    { type: 'number', id: 'mehrkmPreis', label: 'Preis je Mehrkilometer', unit: 'ct', default: 10, min: 0, step: 0.5 },
  ],
  compute: (v) => {
    const listenpreis = num(v.listenpreis);
    const rate = num(v.rate);
    const laufzeit = num(v.laufzeit, 1);
    const anzahlung = num(v.anzahlung);
    const mehrkm = num(v.mehrkm);
    const mehrkmPreis = num(v.mehrkmPreis);
    const ratenSumme = rate * laufzeit;
    const mehrkmKosten = mehrkm * (mehrkmPreis / 100);
    const gesamtkosten = anzahlung + ratenSumme + mehrkmKosten;
    const effektivRate = laufzeit > 0 ? gesamtkosten / laufzeit : 0;
    const leasingfaktor = listenpreis > 0 ? (rate / listenpreis) * 100 : 0;
    return [
      { label: 'Gesamtkosten Leasing', value: gesamtkosten, unit: '€', digits: 2, primary: true },
      { label: 'Effektive Monatsrate', value: effektivRate, unit: '€', digits: 2, help: 'Anzahlung und Mehrkilometer auf alle Monate umgelegt.' },
      { label: 'Leasingfaktor', value: leasingfaktor, unit: '', digits: 2, help: 'Je niedriger, desto günstiger das Angebot.' },
      { label: 'Summe der Raten', value: ratenSumme, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Der Leasingfaktor macht Angebote vergleichbar: Er setzt die Monatsrate ins Verhältnis zum Bruttolistenpreis. Ein Faktor unter 1,0 gilt als gutes, unter 0,7 als sehr gutes Angebot. Achte zusätzlich auf Anzahlung, Laufzeit und die Kosten für Mehrkilometer, denn sie verändern die echten Gesamtkosten deutlich.',
  howto: [
    'Bruttolistenpreis des Fahrzeugs eintragen (Basis für den Leasingfaktor).',
    'Monatliche Leasingrate und Laufzeit in Monaten angeben.',
    'Anzahlung bzw. Leasingsonderzahlung ergänzen.',
    'Optional erwartete Mehrkilometer und deren Preis eintragen.',
  ],
  faq: [
    { q: 'Was ist ein guter Leasingfaktor?', a: 'Ein Faktor unter 1,0 gilt als günstig, unter 0,7 als sehr gut. Er berücksichtigt allerdings keine Anzahlung – diese sollte gesondert geprüft werden.' },
    { q: 'Wie wird der Leasingfaktor berechnet?', a: 'Monatsrate geteilt durch den Bruttolistenpreis, mal 100. Beispiel: 320 € Rate bei 35.000 € Listenpreis ergibt rund 0,91.' },
    { q: 'Was passiert bei Mehrkilometern?', a: 'Wer mehr fährt als vereinbart, zahlt am Vertragsende pro Mehrkilometer nach – oft 8 bis 15 Cent. Minderkilometer werden meist nur teilweise erstattet.' },
    { q: 'Lohnt sich eine hohe Anzahlung?', a: 'Eine Sonderzahlung senkt die Monatsrate, erhöht aber das Risiko bei Totalschaden oder Diebstahl. Rechne immer die Gesamtkosten, nicht nur die Rate.' },
    { q: 'Sind Wartung und Versicherung enthalten?', a: 'Meist nicht. Reine Leasingverträge decken nur die Nutzung; Versicherung, Wartung und Reifen kommen oft extra hinzu.' },
  ],
  related: ['kosten-pro-km-rechner', 'wertverlust-rechner', 'spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { listenpreis: 35000, rate: 320, laufzeit: 36, anzahlung: 0, mehrkm: 0, mehrkmPreis: 10 },
      expect: [{ label: 'Gesamtkosten Leasing', value: 11520, tolerance: 0.5 }],
    },
    {
      values: { listenpreis: 35000, rate: 320, laufzeit: 36, anzahlung: 3000, mehrkm: 0, mehrkmPreis: 10 },
      expect: [{ label: 'Leasingfaktor', value: 0.91, tolerance: 0.02 }],
    },
  ],
};
