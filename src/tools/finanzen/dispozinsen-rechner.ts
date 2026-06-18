import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'dispozinsen-rechner',
  category: 'finanzen',
  title: 'Dispozinsen-Rechner',
  shortTitle: 'Dispozinsen',
  description:
    'Berechne die Kosten deines Dispokredits: Wie viel Zinsen zahlst du, wenn dein Konto über eine bestimmte Anzahl Tage im Minus ist?',
  keywords: [
    'dispozinsen rechner',
    'dispo zinsen berechnen',
    'dispokredit kosten',
    'kontoüberziehung zinsen',
    'überziehungszinsen rechner',
    'dispozins berechnen',
  ],
  formula: 'Dispozinsen = Überziehungsbetrag × Dispozins/100 × Tage/365',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Überziehungsbetrag', unit: '€', default: 1000, min: 0, step: 50, help: 'Wie weit das Konto im Minus ist.' },
    { type: 'number', id: 'zins', label: 'Dispozinssatz pro Jahr', unit: '%', default: 11.5, min: 0, step: 0.1 },
    { type: 'number', id: 'tage', label: 'Dauer der Überziehung', unit: 'Tage', default: 30, min: 1, step: 1 },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const zins = num(v.zins);
    const tage = num(v.tage);
    const kosten = betrag * (zins / 100) * (tage / 365);
    const proTag = kosten / Math.max(tage, 1);
    const aufsJahr = betrag * (zins / 100);
    return [
      { label: 'Dispozinsen', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Tag', value: proTag, unit: '€', digits: 4 },
      { label: 'Hochgerechnet auf 1 Jahr', value: aufsJahr, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Der Dispositionskredit (Dispo) ist die teuerste reguläre Kreditform. Banken verlangen oft zweistellige Jahreszinsen. Dieser Rechner zeigt, wie viel dich eine Kontoüberziehung über eine bestimmte Zahl von Tagen kostet, damit du den Dispo gezielt zurückführen kannst.',
  howto: [
    'Gib den Betrag ein, um den dein Konto überzogen ist.',
    'Trage den Dispozinssatz deiner Bank ein (steht im Kontoauszug oder Preisaushang).',
    'Lege fest, über wie viele Tage die Überziehung läuft.',
    'Lies die anfallenden Dispozinsen ab.',
  ],
  faq: [
    { q: 'Wie werden Dispozinsen abgerechnet?', a: 'Banken berechnen die Zinsen taggenau auf den jeweils überzogenen Betrag und buchen sie meist am Quartalsende ab. Der Rechner nutzt die 365-Tage-Methode.' },
    { q: 'Warum ist der Dispo so teuer?', a: 'Der Dispokredit ist flexibel und ungesichert; das lässt sich die Bank mit hohen Zinsen bezahlen. Ein Ratenkredit zur Umschuldung ist fast immer günstiger.' },
    { q: 'Was ist der Unterschied zum Überziehungszins?', a: 'Überschreitest du sogar den eingeräumten Dispo-Rahmen (geduldete Überziehung), kann ein noch höherer Überziehungszins anfallen.' },
  ],
  related: ['kreditrechner', 'ratenkredit', 'zinsrechner'],
  examples: [
    {
      values: { betrag: 1000, zins: 11.5, tage: 30 },
      expect: [
        { label: 'Dispozinsen', value: 9.45, tolerance: 0.05 },
        { label: 'Hochgerechnet auf 1 Jahr', value: 115, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
