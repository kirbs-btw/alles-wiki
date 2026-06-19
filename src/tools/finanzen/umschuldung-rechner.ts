import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'umschuldung-rechner',
  category: 'finanzen',
  title: 'Umschuldungs-Rechner',
  shortTitle: 'Umschuldung',
  description:
    'Vergleiche alten und neuen Kredit bei gleicher Restlaufzeit und sieh, wie viel dich eine Umschuldung an Monatsrate und Gesamtkosten spart.',
  keywords: [
    'umschuldung rechner',
    'umschuldung ersparnis berechnen',
    'kredit umschulden rechner',
    'anschlussfinanzierung vergleich',
    'kredit ablösen ersparnis',
  ],
  formula: 'Rate = Restschuld × i / (1 − (1+i)^(−n)); Ersparnis = (Rate_alt − Rate_neu) × n',
  inputs: [
    { type: 'number', id: 'restschuld', label: 'Restschuld', unit: '€', default: 100000, min: 0, step: 1000 },
    { type: 'number', id: 'zinsAlt', label: 'Alter Zinssatz p.a.', unit: '%', default: 5, min: 0, step: 0.01 },
    { type: 'number', id: 'zinsNeu', label: 'Neuer Zinssatz p.a.', unit: '%', default: 3, min: 0, step: 0.01 },
    { type: 'number', id: 'jahre', label: 'Restlaufzeit', unit: 'Jahre', default: 10, min: 1, step: 1 },
    { type: 'number', id: 'kosten', label: 'Umschuldungskosten', unit: '€', default: 0, min: 0, step: 50, help: 'z. B. Bearbeitungs- oder Notargebühren.' },
  ],
  compute: (v) => {
    const restschuld = num(v.restschuld);
    const zinsAlt = num(v.zinsAlt);
    const zinsNeu = num(v.zinsNeu);
    const jahre = num(v.jahre);
    const kosten = num(v.kosten);
    const n = Math.round(jahre * 12);
    const annuitaet = (zins: number) => {
      const i = zins / 100 / 12;
      if (n <= 0) return 0;
      if (i === 0) return restschuld / n;
      return (restschuld * i) / (1 - Math.pow(1 + i, -n));
    };
    const rateAlt = annuitaet(zinsAlt);
    const rateNeu = annuitaet(zinsNeu);
    const gesamtAlt = rateAlt * n;
    const gesamtNeu = rateNeu * n + kosten;
    const ersparnisGesamt = gesamtAlt - gesamtNeu;
    const ersparnisMonat = rateAlt - rateNeu;
    return [
      { label: 'Gesamtersparnis', value: ersparnisGesamt, unit: '€', digits: 2, primary: true, help: 'Über die gesamte Restlaufzeit, inkl. Umschuldungskosten.' },
      { label: 'Monatliche Ersparnis', value: ersparnisMonat, unit: '€/Monat', digits: 2 },
      { label: 'Rate alt', value: rateAlt, unit: '€/Monat', digits: 2 },
      { label: 'Rate neu', value: rateNeu, unit: '€/Monat', digits: 2 },
    ];
  },
  intro:
    'Eine Umschuldung lohnt sich, wenn du einen laufenden Kredit durch einen günstigeren ablösen kannst. Dieser Rechner vergleicht alten und neuen Kredit bei gleicher Restlaufzeit per Annuitätenformel und zieht eventuelle Umschuldungskosten ab. So siehst du, wie viel du an Monatsrate und über die gesamte Laufzeit sparst. Bei Immobiliendarlehen kann zusätzlich eine Vorfälligkeitsentschädigung anfallen – berücksichtige sie in den Umschuldungskosten.',
  howto: [
    'Trage die aktuelle Restschuld und den alten Zinssatz ein.',
    'Gib den neuen, günstigeren Zinssatz an.',
    'Wähle die verbleibende Laufzeit in Jahren.',
    'Ergänze Umschuldungskosten (z. B. Gebühren, Vorfälligkeitsentschädigung) und lies die Ersparnis ab.',
  ],
  faq: [
    { q: 'Ab wann lohnt sich eine Umschuldung?', a: 'Faustregel: Schon ein Zinsunterschied von rund 0,5 Prozentpunkten kann sich lohnen. Entscheidend ist, ob die Ersparnis über die Restlaufzeit die Umschuldungskosten übersteigt.' },
    { q: 'Was ist eine Vorfälligkeitsentschädigung?', a: 'Bei vorzeitiger Ablösung eines Immobiliendarlehens innerhalb der Zinsbindung verlangt die Bank oft eine Entschädigung für den entgangenen Zins. Trage sie hier als Umschuldungskosten ein.' },
    { q: 'Rechnet das Tool mit gleicher Laufzeit?', a: 'Ja. Alter und neuer Kredit werden auf dieselbe Restlaufzeit gerechnet, damit der Vergleich fair ist. Verkürzt du die Laufzeit, sinkt der Zinsvorteil, die Rate steigt.' },
  ],
  related: ['kreditrechner', 'ratenkredit', 'restschuld-rechner', 'tilgungsrechner'],
  examples: [
    {
      values: { restschuld: 100000, zinsAlt: 5, zinsNeu: 3, jahre: 10, kosten: 0 },
      expect: [
        { label: 'Gesamtersparnis', value: 11405.72, tolerance: 1 },
        { label: 'Monatliche Ersparnis', value: 95.05, tolerance: 0.5 },
        { label: 'Rate alt', value: 1060.66, tolerance: 0.5 },
        { label: 'Rate neu', value: 965.61, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-19',
};
