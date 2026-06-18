import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'studienkredit-rate-rechner',
  category: 'bildung',
  title: 'Studienkredit-Rate berechnen (Rueckzahlung)',
  shortTitle: 'Studienkredit',
  description:
    'Berechne die monatliche Rate fuer die Rueckzahlung deines Studienkredits aus Restschuld, Zinssatz und Laufzeit – als Annuitaet.',
  keywords: [
    'studienkredit rate berechnen',
    'studienkredit rueckzahlung rechner',
    'monatliche rate studienkredit',
    'kfw studienkredit rate',
    'studienkredit tilgung',
    'rate kredit studium',
  ],
  intro:
    'Nach dem Studium wird der Studienkredit in der Rueckzahlungsphase mit gleichbleibenden Monatsraten getilgt (Annuitaet). Das Tool berechnet die Rate aus der Restschuld bei Rueckzahlungsbeginn, dem effektiven Jahreszins und der gewuenschten Laufzeit. Es ist eine Orientierung – die genauen Konditionen stehen in deinem Kreditvertrag.',
  formula: 'Rate = Restschuld × i / (1 − (1 + i)^−n), i = Jahreszins/12, n = Monate',
  inputs: [
    { type: 'number', id: 'schuld', label: 'Restschuld bei Rueckzahlung', unit: 'EUR', default: 12000, min: 0, step: 100 },
    { type: 'number', id: 'zins', label: 'Effektiver Jahreszins', unit: '%', default: 6, min: 0, max: 20, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Rueckzahlungsdauer', unit: 'Jahre', default: 10, min: 1, max: 25, step: 1 },
  ],
  compute: (v) => {
    const schuld = num(v.schuld);
    const zins = num(v.zins);
    const jahre = num(v.jahre);
    const n = jahre * 12;
    const i = zins / 100 / 12;
    let rate: number;
    if (n <= 0) rate = 0;
    else if (i === 0) rate = schuld / n;
    else rate = (schuld * i) / (1 - Math.pow(1 + i, -n));
    const gesamt = rate * n;
    const zinsen = gesamt - schuld;
    return [
      { label: 'Monatliche Rate', value: rate, unit: 'EUR', digits: 2, primary: true },
      { label: 'Gesamte Rueckzahlung', value: gesamt, unit: 'EUR', digits: 2 },
      { label: 'Zinskosten gesamt', value: zinsen, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Restschuld zu Beginn der Rueckzahlung eintragen.',
    'Effektiven Jahreszins des Kredits eintragen.',
    'Gewuenschte Rueckzahlungsdauer in Jahren angeben.',
    'Monatsrate und Gesamtkosten ablesen.',
  ],
  faq: [
    { q: 'Was ist eine Annuitaet?', a: 'Eine Annuitaet ist eine gleichbleibende Monatsrate. Anfangs steckt darin mehr Zins und weniger Tilgung, spaeter dreht sich das Verhaeltnis um.' },
    { q: 'Warum steigen die Zinskosten mit der Laufzeit?', a: 'Je laenger du tilgst, desto laenger faellt Zins auf die Restschuld an. Eine kuerzere Laufzeit senkt die Gesamtkosten, erhoeht aber die Monatsrate.' },
    { q: 'Gilt das auch fuer den KfW-Studienkredit?', a: 'Das Annuitaetenprinzip gilt grundsaetzlich auch dort. Der konkrete Zinssatz ist variabel und wird halbjaehrlich angepasst; nutze den aktuellen Effektivzins deines Vertrags.' },
  ],
  related: ['bafoeg-rueckzahlung-rechner', 'studienkosten-rechner', 'bafoeg-hoechstsatz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { schuld: 12000, zins: 0, jahre: 10 },
      expect: [{ label: 'Monatliche Rate', value: 100, tolerance: 0.01 }],
    },
    {
      values: { schuld: 12000, zins: 6, jahre: 10 },
      expect: [{ label: 'Monatliche Rate', value: 133.27, tolerance: 0.5 }],
    },
  ],
};
