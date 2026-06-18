import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'jahresgehalt-rechner',
  category: 'beruf',
  title: 'Jahresgehalt-Rechner (mit 13. Gehalt)',
  shortTitle: 'Jahresgehalt',
  description:
    'Rechne dein Monatsgehalt aufs Jahr hoch – inklusive 13. Monatsgehalt, Weihnachts- und Urlaubsgeld. Zeigt das echte Jahresbrutto und das durchschnittliche Monatsbrutto.',
  keywords: [
    'jahresgehalt rechner',
    'jahresgehalt berechnen',
    'monatsgehalt auf jahr hochrechnen',
    'jahresbrutto berechnen',
    'gehalt inklusive weihnachtsgeld',
    '13. monatsgehalt rechner',
    'durchschnittliches monatsgehalt',
  ],
  formula:
    'Jahresbrutto = Monatsgehalt × (12 + Anzahl Sonderzahlungen) + Urlaubsgeld + Weihnachtsgeld',
  inputs: [
    { type: 'number', id: 'monatsgehalt', label: 'Brutto-Monatsgehalt', unit: '€', default: 3500, min: 0, step: 50 },
    {
      type: 'select',
      id: 'sonder',
      label: 'Zusätzliche Monatsgehälter',
      default: '1',
      options: [
        { value: '0', label: '12 Gehälter (keine Sonderzahlung)' },
        { value: '1', label: '13. Monatsgehalt' },
        { value: '2', label: '13. + 14. Monatsgehalt' },
      ],
    },
    { type: 'number', id: 'urlaubsgeld', label: 'Urlaubsgeld (einmalig, brutto)', unit: '€', default: 0, min: 0, step: 50, help: 'Zusätzlich zu den Monatsgehältern, falls separat gezahlt.' },
    { type: 'number', id: 'weihnachtsgeld', label: 'Weihnachtsgeld (einmalig, brutto)', unit: '€', default: 0, min: 0, step: 50, help: 'Nur eintragen, wenn nicht bereits als 13. Gehalt erfasst.' },
  ],
  compute: (v) => {
    const monatsgehalt = num(v.monatsgehalt);
    const sonder = num(v.sonder);
    const urlaubsgeld = num(v.urlaubsgeld);
    const weihnachtsgeld = num(v.weihnachtsgeld);

    const gehaelter = monatsgehalt * (12 + sonder);
    const jahresbrutto = gehaelter + urlaubsgeld + weihnachtsgeld;
    const durchschnitt = jahresbrutto / 12;
    const sonderzahlungenGesamt = monatsgehalt * sonder + urlaubsgeld + weihnachtsgeld;

    return [
      { label: 'Jahresbrutto', value: jahresbrutto, unit: '€', digits: 2, primary: true },
      { label: 'Durchschnittliches Monatsbrutto', value: durchschnitt, unit: '€', digits: 2, help: 'Jahresbrutto gleichmäßig auf 12 Monate verteilt.' },
      { label: 'Sonderzahlungen gesamt', value: sonderzahlungenGesamt, unit: '€', digits: 2 },
      { label: 'Anzahl Monatsgehälter', value: 12 + sonder, unit: '', digits: 0 },
    ];
  },
  intro:
    'Das Monatsgehalt allein sagt wenig über das tatsächliche Jahreseinkommen aus, wenn ein 13. Gehalt, Weihnachts- oder Urlaubsgeld dazukommen. Dieser Rechner addiert alle Bestandteile zum Jahresbrutto und rechnet das durchschnittliche Monatsbrutto aus – ideal für Vergleiche von Stellenangeboten.',
  howto: [
    'Trage dein reguläres Brutto-Monatsgehalt ein.',
    'Wähle, ob ein 13. oder 14. Monatsgehalt gezahlt wird.',
    'Ergänze separat gezahltes Urlaubs- oder Weihnachtsgeld.',
    'Lies Jahresbrutto und durchschnittliches Monatsbrutto ab.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen 13. Gehalt und Weihnachtsgeld?', a: 'Ein 13. Monatsgehalt entspricht meist genau einem weiteren Monatsgehalt. Weihnachtsgeld ist oft ein separat festgelegter Betrag oder ein Prozentsatz des Monatsgehalts. In der Praxis werden beide Begriffe häufig vermischt.' },
    { q: 'Soll ich Sonderzahlungen doppelt eintragen?', a: 'Nein. Wenn du das 13. Gehalt über die Auswahl erfasst, trage es nicht zusätzlich als Weihnachtsgeld ein, sonst zählt es doppelt.' },
    { q: 'Ist das Jahresbrutto gleich dem Bruttojahreslohn auf der Lohnsteuerbescheinigung?', a: 'Im Kern ja, sofern alle steuerpflichtigen Bezüge erfasst sind. Geldwerte Vorteile oder steuerfreie Zuschläge können den Wert auf der Bescheinigung verändern.' },
    { q: 'Warum das durchschnittliche Monatsbrutto?', a: 'Es macht Angebote vergleichbar, bei denen Sonderzahlungen unterschiedlich verteilt sind. Zwei Jobs mit gleichem Jahresbrutto sind beim Durchschnitt gleichwertig.' },
    { q: 'Sind das Brutto- oder Nettowerte?', a: 'Alle Werte sind brutto. Steuern und Sozialabgaben sind nicht abgezogen; auf Sonderzahlungen fallen sie ebenfalls an.' },
  ],
  related: ['brutto-stundensatz-rechner', 'gehaltserhoehung-rechner', 'teilzeit-gehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { monatsgehalt: 3500, sonder: '1', urlaubsgeld: 0, weihnachtsgeld: 0 },
      expect: [
        { label: 'Jahresbrutto', value: 45500, tolerance: 0.01 },
        { label: 'Durchschnittliches Monatsbrutto', value: 3791.67, tolerance: 0.1 },
      ],
    },
    {
      values: { monatsgehalt: 3000, sonder: '0', urlaubsgeld: 600, weihnachtsgeld: 1500 },
      expect: [{ label: 'Jahresbrutto', value: 38100, tolerance: 0.01 }],
    },
  ],
};
