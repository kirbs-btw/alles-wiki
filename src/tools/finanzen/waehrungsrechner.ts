import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'waehrungsrechner',
  category: 'finanzen',
  title: 'Währungsrechner (manueller Kurs)',
  shortTitle: 'Währung',
  description:
    'Rechne Beträge mit einem selbst eingegebenen Wechselkurs um – inklusive optionalem Umtauschaufschlag der Bank oder Wechselstube.',
  keywords: [
    'währungsrechner',
    'währung umrechnen',
    'wechselkurs rechner',
    'devisen umrechnen',
    'umtausch berechnen',
    'wechselkurs aufschlag',
  ],
  formula: 'Zielbetrag = Betrag × Kurs × (1 − Aufschlag/100)',
  inputs: [
    { type: 'number', id: 'betrag', label: 'Betrag in Ausgangswährung', default: 1000, min: 0, step: 1 },
    { type: 'number', id: 'kurs', label: 'Wechselkurs', default: 1.08, min: 0, step: 0.0001, help: '1 Einheit Ausgangswährung = ? Einheiten Zielwährung.' },
    { type: 'number', id: 'aufschlag', label: 'Umtauschaufschlag', unit: '%', default: 0, min: 0, max: 100, step: 0.1, help: 'Gebühr bzw. Marge der Bank/Wechselstube.' },
  ],
  compute: (v) => {
    const betrag = num(v.betrag);
    const kurs = num(v.kurs);
    const aufschlag = num(v.aufschlag);
    const ideal = betrag * kurs;
    const ziel = ideal * (1 - aufschlag / 100);
    const kosten = ideal - ziel;
    return [
      { label: 'Zielbetrag', value: ziel, unit: 'Zielwährung', digits: 2, primary: true },
      { label: 'Ohne Aufschlag', value: ideal, unit: 'Zielwährung', digits: 2 },
      { label: 'Kosten des Aufschlags', value: kosten, unit: 'Zielwährung', digits: 2 },
    ];
  },
  intro:
    'Mit diesem Währungsrechner rechnest du Beträge anhand eines selbst eingegebenen Wechselkurses um. So bleibst du unabhängig von tagesaktuellen Online-Kursen und kannst auch den Umtauschaufschlag deiner Bank oder Wechselstube einbeziehen, um die echten Kosten zu sehen.',
  howto: [
    'Gib den umzutauschenden Betrag ein.',
    'Trage den aktuellen Wechselkurs ein (1 Ausgangs- = X Zieleinheiten).',
    'Gib optional den Umtauschaufschlag in Prozent ein.',
    'Lies den Zielbetrag und die Aufschlagskosten ab.',
  ],
  faq: [
    { q: 'Wie gebe ich den Wechselkurs ein?', a: 'Als Anzahl Zieleinheiten je 1 Ausgangseinheit. Beispiel EUR→USD bei 1,08: 1 Euro ergibt 1,08 US-Dollar, also Kurs = 1,08.' },
    { q: 'Was ist der Umtauschaufschlag?', a: 'Banken und Wechselstuben rechnen oft nicht zum reinen Devisenkurs um, sondern schlagen eine Marge auf. Dieser Aufschlag mindert den Betrag, den du tatsächlich erhältst.' },
    { q: 'Sind die Kurse hier aktuell?', a: 'Nein, der Rechner nutzt bewusst keinen Live-Kurs. Du gibst den Kurs selbst ein – etwa von der Referenzkursliste oder dem Angebot deiner Bank.' },
  ],
  related: ['mehrwertsteuer-rechner', 'rabattrechner', 'prozentrechner'],
  examples: [
    {
      values: { betrag: 1000, kurs: 1.08, aufschlag: 0 },
      expect: [{ label: 'Zielbetrag', value: 1080, tolerance: 0.01 }],
    },
    {
      values: { betrag: 1000, kurs: 1.08, aufschlag: 2 },
      expect: [
        { label: 'Zielbetrag', value: 1058.4, tolerance: 0.01 },
        { label: 'Kosten des Aufschlags', value: 21.6, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
