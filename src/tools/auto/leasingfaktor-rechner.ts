import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'leasingfaktor-rechner',
  category: 'auto',
  title: 'Leasingfaktor-Rechner',
  shortTitle: 'Leasingfaktor',
  description:
    'Berechne den Leasingfaktor aus Monatsrate und Listenpreis – die Kennzahl, mit der du Leasingangebote schnell vergleichst.',
  keywords: [
    'leasingfaktor berechnen',
    'leasingfaktor rechner',
    'leasingfaktor formel',
    'guter leasingfaktor',
    'leasing vergleich kennzahl',
    'leasingangebot bewerten',
  ],
  formula: 'Leasingfaktor = (Monatsrate / Bruttolistenpreis) × 100',
  intro:
    'Der Leasingfaktor macht Leasingangebote unabhängig vom Fahrzeugpreis vergleichbar. Er setzt die Monatsrate ins Verhältnis zum Bruttolistenpreis. Faustregel: Werte unter 1,0 gelten als gut, unter 0,7 als sehr attraktiv. Anzahlungen sollten dabei rechnerisch berücksichtigt werden.',
  inputs: [
    { type: 'number', id: 'rate', label: 'Monatsrate (brutto)', unit: 'EUR', default: 299, min: 0, step: 1 },
    { type: 'number', id: 'listenpreis', label: 'Bruttolistenpreis', unit: 'EUR', default: 35000, min: 1, step: 100 },
    { type: 'number', id: 'anzahlung', label: 'Anzahlung / Sonderzahlung', unit: 'EUR', default: 0, min: 0, step: 100, help: 'Wird auf die Laufzeit umgelegt' },
    { type: 'number', id: 'laufzeit', label: 'Laufzeit', unit: 'Monate', default: 36, min: 1, step: 1 },
  ],
  compute: (v) => {
    const rate = num(v.rate);
    const listenpreis = num(v.listenpreis);
    const anzahlung = num(v.anzahlung);
    const laufzeit = num(v.laufzeit);
    const effektiveRate = laufzeit > 0 ? rate + anzahlung / laufzeit : rate;
    const faktor = listenpreis > 0 ? (rate / listenpreis) * 100 : 0;
    const faktorEffektiv = listenpreis > 0 ? (effektiveRate / listenpreis) * 100 : 0;
    const gesamtkosten = rate * laufzeit + anzahlung;
    return [
      { label: 'Leasingfaktor (effektiv)', value: faktorEffektiv, unit: '', digits: 2, primary: true },
      { label: 'Leasingfaktor (ohne Anzahlung)', value: faktor, unit: '', digits: 2 },
      { label: 'Effektive Monatsrate', value: effektiveRate, unit: 'EUR', digits: 2 },
      { label: 'Gesamtkosten Laufzeit', value: gesamtkosten, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Monatliche Leasingrate (brutto) eintragen.',
    'Bruttolistenpreis des Fahrzeugs erfassen.',
    'Anzahlung und Laufzeit ergänzen.',
    'Effektiven Leasingfaktor ablesen und mit anderen Angeboten vergleichen.',
  ],
  faq: [
    { q: 'Was ist ein guter Leasingfaktor?', a: 'Als Orientierung gilt: unter 1,0 ist gut, unter 0,7 sehr attraktiv. Der Wert hängt aber stark von Laufzeit, Laufleistung und Marke ab.' },
    { q: 'Warum die Anzahlung einrechnen?', a: 'Ein niedriger Faktor mit hoher Anzahlung kann teurer sein als ein höherer Faktor ohne Anzahlung. Der effektive Faktor verteilt die Sonderzahlung auf alle Monate.' },
    { q: 'Berücksichtigt der Faktor alle Kosten?', a: 'Nein. Überführung, Zulassung, Wartung und Versicherung sind nicht enthalten. Der Faktor dient nur dem schnellen Ratenvergleich.' },
  ],
  related: ['leasing-rechner', 'autofinanzierung-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { rate: 299, listenpreis: 35000, anzahlung: 0, laufzeit: 36 },
      // 299/35000*100 = 0.8542857
      expect: [{ label: 'Leasingfaktor (effektiv)', value: 0.85, tolerance: 0.01 }],
    },
    {
      values: { rate: 250, listenpreis: 30000, anzahlung: 3600, laufzeit: 36 },
      // eff rate = 250 + 3600/36 = 350; 350/30000*100 = 1.1667
      expect: [{ label: 'Leasingfaktor (effektiv)', value: 1.17, tolerance: 0.01 }],
    },
  ],
};
