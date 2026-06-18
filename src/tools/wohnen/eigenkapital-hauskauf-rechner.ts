import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'eigenkapital-hauskauf-rechner',
  category: 'wohnen',
  title: 'Eigenkapital-Hauskauf-Rechner',
  shortTitle: 'Eigenkapital Hauskauf',
  description:
    'Ermittle die Gesamtkosten beim Immobilienkauf inklusive Kaufnebenkosten und das empfohlene Eigenkapital – damit mindestens die Nebenkosten gedeckt sind.',
  keywords: [
    'eigenkapital hauskauf rechner',
    'wie viel eigenkapital hauskauf',
    'kaufnebenkosten berechnen',
    'eigenkapital immobilie',
    'nebenkosten hauskauf',
    'finanzierungsbedarf immobilie',
  ],
  formula:
    'Nebenkosten = Kaufpreis × (Grunderwerb% + Notar% + Makler%); Gesamt = Kaufpreis + Nebenkosten; empfohlenes EK = Nebenkosten + Kaufpreis × EK-Anteil%',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis der Immobilie', unit: '€', default: 400000, min: 0, step: 1000 },
    { type: 'number', id: 'grunderwerb', label: 'Grunderwerbsteuer', unit: '%', default: 6.5, min: 0, max: 7, step: 0.5, help: 'Je Bundesland 3,5–6,5 %.' },
    { type: 'number', id: 'notar', label: 'Notar + Grundbuch', unit: '%', default: 2, min: 0, max: 3, step: 0.1, help: 'Üblich rund 1,5–2,0 % des Kaufpreises.' },
    { type: 'number', id: 'makler', label: 'Maklerprovision (Käuferanteil)', unit: '%', default: 3.57, min: 0, max: 8, step: 0.01, help: 'Oft 3,57 % inkl. MwSt; 0 % bei provisionsfrei.' },
    { type: 'number', id: 'ekAnteil', label: 'Eigenkapital-Anteil auf Kaufpreis', unit: '%', default: 20, min: 0, max: 100, step: 5, help: 'Empfohlen mindestens 20 % zusätzlich zu den Nebenkosten.' },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const grunderwerb = num(v.grunderwerb);
    const notar = num(v.notar);
    const makler = num(v.makler);
    const ekAnteil = num(v.ekAnteil);
    const nebenkosten = kaufpreis * ((grunderwerb + notar + makler) / 100);
    const gesamt = kaufpreis + nebenkosten;
    const empfohlenesEk = nebenkosten + kaufpreis * (ekAnteil / 100);
    const darlehen = Math.max(gesamt - empfohlenesEk, 0);
    return [
      { label: 'Empfohlenes Eigenkapital', value: empfohlenesEk, unit: '€', digits: 2, primary: true },
      { label: 'Kaufnebenkosten', value: nebenkosten, unit: '€', digits: 2 },
      { label: 'Gesamtkosten Kauf', value: gesamt, unit: '€', digits: 2 },
      { label: 'Verbleibender Darlehensbedarf', value: darlehen, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Beim Immobilienkauf fallen neben dem Kaufpreis erhebliche Nebenkosten an: Grunderwerbsteuer, Notar und Grundbuch sowie gegebenenfalls die Maklerprovision. Banken erwarten, dass mindestens diese Nebenkosten aus Eigenkapital bezahlt werden, besser zusätzlich rund 20 % des Kaufpreises. Der Rechner zeigt die Gesamtkosten und das empfohlene Eigenkapital. Die Prozentsätze sind regional unterschiedlich – passe sie an dein Bundesland und dein Angebot an.',
  howto: [
    'Kaufpreis der Immobilie eingeben.',
    'Grunderwerbsteuer-Satz des Bundeslandes wählen (3,5–6,5 %).',
    'Notar/Grundbuch und gegebenenfalls Maklerprovision eintragen.',
    'Gewünschten Eigenkapital-Anteil auf den Kaufpreis wählen.',
    'Empfohlenes Eigenkapital und Darlehensbedarf ablesen.',
  ],
  faq: [
    { q: 'Wie viel Eigenkapital brauche ich beim Hauskauf?', a: 'Als Faustregel sollten mindestens die Kaufnebenkosten aus Eigenkapital bezahlt werden, idealerweise zusätzlich 20 % des Kaufpreises. Mehr Eigenkapital senkt die Zinsen und die monatliche Rate.' },
    { q: 'Wie hoch sind die Kaufnebenkosten?', a: 'Je nach Bundesland und Maklersituation rund 9–15 % des Kaufpreises: Grunderwerbsteuer 3,5–6,5 %, Notar und Grundbuch etwa 1,5–2 % und gegebenenfalls Maklerprovision von häufig 3,57 % für den Käufer.' },
    { q: 'Geht es auch ohne Eigenkapital?', a: 'Eine 100-%- oder Vollfinanzierung ist möglich, aber teurer: Die Bank verlangt höhere Zinsen, weil das Risiko steigt. Ohne jegliches Eigenkapital für die Nebenkosten ist eine Finanzierung kaum tragfähig.' },
    { q: 'Sind die Prozentsätze fix?', a: 'Nein. Die Grunderwerbsteuer unterscheidet sich je Bundesland, Notarkosten richten sich nach der Gebührenordnung und Maklerprovisionen sind verhandelbar. Trage deine konkreten Werte ein – das Ergebnis ist eine Orientierung (Stand 2026).' },
  ],
  related: ['baufinanzierung-rate-rechner', 'grunderwerbsteuer-rechner', 'maklerprovision-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 400000, grunderwerb: 6.5, notar: 2, makler: 3.57, ekAnteil: 20 },
      expect: [
        { label: 'Kaufnebenkosten', value: 48280, tolerance: 0.5 },
        { label: 'Empfohlenes Eigenkapital', value: 128280, tolerance: 0.5 },
        { label: 'Gesamtkosten Kauf', value: 448280, tolerance: 0.5 },
      ],
    },
    {
      values: { kaufpreis: 300000, grunderwerb: 5, notar: 2, makler: 0, ekAnteil: 20 },
      expect: [
        { label: 'Kaufnebenkosten', value: 21000, tolerance: 0.5 },
        { label: 'Verbleibender Darlehensbedarf', value: 240000, tolerance: 0.5 },
      ],
    },
  ],
};
