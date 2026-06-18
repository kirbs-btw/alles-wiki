import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: '13-gehalt-rechner',
  category: 'beruf',
  title: '13. Gehalt & Weihnachtsgeld Rechner (anteilig)',
  shortTitle: '13. Gehalt',
  description:
    'Berechne dein anteiliges 13. Gehalt bzw. Weihnachtsgeld bei unterjährigem Eintritt: voller Anspruch geteilt durch 12, mal Beschäftigungsmonate.',
  keywords: [
    '13 gehalt rechner',
    'weihnachtsgeld berechnen',
    'anteiliges weihnachtsgeld',
    '13. monatsgehalt anteilig',
    'gratifikation rechner',
    'weihnachtsgeld unterjähriger eintritt',
  ],
  formula:
    'Anspruch = (Monatsgehalt × Prozentsatz%) ÷ 12 × Beschäftigungsmonate',
  inputs: [
    { type: 'number', id: 'monatsgehalt', label: 'Brutto-Monatsgehalt', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'prozent', label: 'Höhe in % eines Monatsgehalts', unit: '%', default: 100, min: 0, max: 200, step: 5, help: '100 % = ein volles Monatsgehalt. Tarifliche Sätze können niedriger sein, z. B. 50 %.' },
    { type: 'number', id: 'monate', label: 'Beschäftigungsmonate im Jahr', unit: 'Monate', default: 12, min: 0, max: 12, step: 1, help: 'Bei vollem Jahr 12; bei unterjährigem Eintritt entsprechend weniger.' },
  ],
  compute: (v) => {
    const monatsgehalt = num(v.monatsgehalt);
    const prozent = num(v.prozent);
    const monate = num(v.monate);

    const vollerAnspruch = monatsgehalt * (prozent / 100);
    const anteilig = vollerAnspruch / 12 * monate;
    const proMonat = vollerAnspruch / 12;

    return [
      { label: 'Anteiliges 13. Gehalt', value: anteilig, unit: '€', digits: 2, primary: true },
      { label: 'Voller Jahresanspruch', value: vollerAnspruch, unit: '€', digits: 2 },
      { label: 'Anspruch pro Monat', value: proMonat, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Viele Arbeitsverträge sehen ein 13. Gehalt oder Weihnachtsgeld vor. Wer unterjährig eingetreten ist, erhält den Betrag häufig nur anteilig – ein Zwölftel je vollem Beschäftigungsmonat. Der Rechner ermittelt den anteiligen Anspruch aus deinem Monatsgehalt, der vereinbarten Höhe und der Zahl der Beschäftigungsmonate. Konkrete Regeln ergeben sich aus Vertrag, Tarif oder Betriebsvereinbarung.',
  howto: [
    'Trage dein Brutto-Monatsgehalt ein.',
    'Gib die vereinbarte Höhe in Prozent eines Monatsgehalts an (100 % = ein volles Gehalt).',
    'Erfasse die Zahl der Beschäftigungsmonate im laufenden Jahr.',
    'Lies den anteiligen Anspruch ab.',
  ],
  faq: [
    { q: 'Habe ich Anspruch auf ein 13. Gehalt?', a: 'Einen gesetzlichen Anspruch gibt es nicht. Er ergibt sich aus Arbeitsvertrag, Tarifvertrag, Betriebsvereinbarung oder betrieblicher Übung.' },
    { q: 'Wie wird bei unterjährigem Eintritt gekürzt?', a: 'Üblich ist eine Zwölftelung: Pro vollem Beschäftigungsmonat steht ein Zwölftel des vollen Betrags zu, sofern der Vertrag dies vorsieht.' },
    { q: 'Ist Weihnachtsgeld dasselbe wie das 13. Gehalt?', a: 'Oft ja, beide bezeichnen häufig eine Sonderzahlung in Höhe eines (Teil-)Monatsgehalts. Die genaue Ausgestaltung kann sich aber unterscheiden, etwa beim Rückzahlungsvorbehalt.' },
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Die Berechnung erfolgt brutto. Sonderzahlungen sind voll steuer- und sozialabgabenpflichtig, sodass netto deutlich weniger ankommt.' },
  ],
  related: ['jahresgehalt-rechner', 'gehaltserhoehung-rechner', 'teilzeit-gehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { monatsgehalt: 3000, prozent: 100, monate: 12 },
      expect: [
        { label: 'Anteiliges 13. Gehalt', value: 3000, tolerance: 0.01 },
        { label: 'Voller Jahresanspruch', value: 3000, tolerance: 0.01 },
      ],
    },
    {
      values: { monatsgehalt: 3000, prozent: 100, monate: 7 },
      expect: [
        { label: 'Anteiliges 13. Gehalt', value: 1750, tolerance: 0.01 },
        { label: 'Anspruch pro Monat', value: 250, tolerance: 0.01 },
      ],
    },
  ],
};
