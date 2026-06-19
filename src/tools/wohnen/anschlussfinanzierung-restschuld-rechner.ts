import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'anschlussfinanzierung-restschuld-rechner',
  category: 'wohnen',
  title: 'Anschlussfinanzierung Restschuld-Rechner',
  shortTitle: 'Restschuld',
  description:
    'Berechne die Restschuld eines Annuitätendarlehens am Ende der Zinsbindung – die Basis für deine Anschlussfinanzierung.',
  keywords: [
    'restschuld berechnen',
    'anschlussfinanzierung rechner',
    'restschuld nach zinsbindung',
    'restschuld annuitätendarlehen',
    'darlehen restschuld',
  ],
  formula:
    'Restschuld = Darlehen × (1+i)^n − (Jahresannuität/i) × ((1+i)^n − 1), mit i = Sollzins/100, n = Jahre der Zinsbindung',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehenssumme', unit: '€', default: 300000, min: 0, step: 1000 },
    { type: 'number', id: 'zins', label: 'Sollzins p.a.', unit: '%', default: 3.5, min: 0, max: 20, step: 0.01 },
    { type: 'number', id: 'tilgung', label: 'Anfängliche Tilgung p.a.', unit: '%', default: 2, min: 0.1, max: 20, step: 0.1, help: 'Tilgungssatz im ersten Jahr.' },
    { type: 'number', id: 'jahre', label: 'Dauer der Zinsbindung', unit: 'Jahre', default: 10, min: 1, max: 40, step: 1 },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const zins = num(v.zins);
    const tilgung = num(v.tilgung);
    const jahre = num(v.jahre);
    const i = zins / 100;
    const annuitaet = darlehen * ((zins + tilgung) / 100);
    let restschuld: number;
    if (i > 0) {
      const faktor = Math.pow(1 + i, jahre);
      restschuld = darlehen * faktor - (annuitaet / i) * (faktor - 1);
    } else {
      // Zinsfrei: lineare Tilgung der Annuität (hier reine Tilgung).
      restschuld = darlehen - annuitaet * jahre;
    }
    if (restschuld < 0) restschuld = 0;
    const getilgt = darlehen - restschuld;
    return [
      { label: 'Restschuld am Ende', value: restschuld, unit: '€', digits: 2, primary: true },
      { label: 'Getilgt in der Zinsbindung', value: getilgt, unit: '€', digits: 2 },
      { label: 'Monatsrate', value: annuitaet / 12, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei einem Annuitätendarlehen bleibt die Rate über die Zinsbindung konstant, doch das Darlehen ist am Ende meist noch nicht abbezahlt. Die verbleibende Restschuld muss anschließend neu finanziert werden – die Anschlussfinanzierung. Dieser Rechner ermittelt die Restschuld bei konstanter Rate und jährlicher Zinsverrechnung. Sondertilgungen sind nicht berücksichtigt.',
  howto: [
    'Ursprüngliche Darlehenssumme eingeben.',
    'Sollzins und anfängliche Tilgung aus dem Darlehensvertrag eintragen.',
    'Dauer der Zinsbindung in Jahren wählen (z. B. 10 oder 15).',
    'Restschuld am Ende der Zinsbindung ablesen.',
  ],
  faq: [
    { q: 'Was ist die Restschuld?', a: 'Die Restschuld ist der Teil des Darlehens, der nach Ablauf der Zinsbindung noch offen ist. Da bei einem Annuitätendarlehen anfangs nur wenig getilgt wird, bleibt nach 10 Jahren oft noch der größte Teil der Schuld bestehen.' },
    { q: 'Warum brauche ich eine Anschlussfinanzierung?', a: 'Weil das Darlehen am Ende der Zinsbindung in der Regel nicht vollständig getilgt ist. Die Restschuld wird über ein neues Darlehen, ein Forward-Darlehen oder eine Umschuldung weiterfinanziert.' },
    { q: 'Wie genau ist die Berechnung?', a: 'Der Rechner verwendet die geschlossene Rentenformel mit jährlicher Verzinsung der konstanten Annuität. Bei monatlicher Verrechnung weicht die reale Restschuld leicht ab. Sondertilgungen sind nicht einbezogen.' },
  ],
  related: ['baufinanzierung-rate-rechner', 'sondertilgung-ersparnis-rechner', 'volltilgerdarlehen-laufzeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { darlehen: 300000, zins: 3.5, tilgung: 2, jahre: 10 },
      expect: [
        { label: 'Restschuld am Ende', value: 229611.64, tolerance: 5 },
        { label: 'Getilgt in der Zinsbindung', value: 70388.36, tolerance: 5 },
        { label: 'Monatsrate', value: 1375, tolerance: 0.5 },
      ],
    },
  ],
};
