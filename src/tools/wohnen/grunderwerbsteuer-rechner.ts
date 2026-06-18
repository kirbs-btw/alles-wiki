import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'grunderwerbsteuer-rechner',
  category: 'wohnen',
  title: 'Grunderwerbsteuer-Rechner',
  shortTitle: 'Grunderwerbsteuer',
  description:
    'Berechne die Grunderwerbsteuer beim Immobilienkauf nach dem Steuersatz deines Bundeslandes (3,5 bis 6,5 %) und ermittle die Gesamtkosten samt Kaufpreis.',
  keywords: [
    'grunderwerbsteuer berechnen',
    'grunderwerbsteuer satz bundesland',
    'grunderwerbsteuer rechner',
    'kaufnebenkosten immobilie',
    'steuer hauskauf',
    'grunderwerbsteuer prozent',
    'grunderwerbsteuer nrw bayern',
  ],
  formula: 'Grunderwerbsteuer = Kaufpreis (Grundstück + Gebäude) × Steuersatz / 100',
  inputs: [
    { type: 'number', id: 'kaufpreis', label: 'Kaufpreis (Grundstück + Gebäude)', unit: '€', default: 350000, min: 0, step: 1000, help: 'Bemessungsgrundlage ist der notarielle Kaufpreis ohne bewegliches Inventar.' },
    {
      type: 'select', id: 'satz', label: 'Steuersatz / Bundesland (Stand 2026)', default: '6.5',
      options: [
        { value: '3.5', label: '3,5 % (Bayern, Sachsen)' },
        { value: '5.0', label: '5,0 % (z. B. Baden-Württemberg, Niedersachsen, Sachsen-Anhalt)' },
        { value: '5.5', label: '5,5 % (Hamburg)' },
        { value: '6.0', label: '6,0 % (z. B. Berlin, Hessen, Bremen)' },
        { value: '6.5', label: '6,5 % (z. B. NRW, Brandenburg, Schleswig-Holstein, Thüringen, Saarland)' },
      ],
    },
    { type: 'number', id: 'inventar', label: 'Mitgekauftes Inventar (abziehbar)', unit: '€', default: 0, min: 0, step: 500, help: 'Bewegliche Sachen wie Einbauküche mindern die Bemessungsgrundlage.' },
  ],
  compute: (v) => {
    const kaufpreis = num(v.kaufpreis);
    const satz = num(v.satz, 6.5);
    const inventar = num(v.inventar);
    const bemessung = Math.max(kaufpreis - inventar, 0);
    const steuer = bemessung * (satz / 100);
    const gesamt = kaufpreis + steuer;
    return [
      { label: 'Grunderwerbsteuer', value: steuer, unit: '€', digits: 2, primary: true },
      { label: 'Bemessungsgrundlage', value: bemessung, unit: '€', digits: 2 },
      { label: 'Angewandter Steuersatz', value: satz, unit: '%', digits: 2 },
      { label: 'Kaufpreis inkl. Grunderwerbsteuer', value: gesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Grunderwerbsteuer fällt beim Kauf von Grundstücken und Immobilien an und wird auf den Kaufpreis erhoben. Der Steuersatz wird von den Bundesländern festgelegt und liegt 2026 zwischen 3,5 % (Bayern, Sachsen) und 6,5 % (z. B. NRW, Brandenburg). Erst nach Zahlung stellt das Finanzamt die Unbedenklichkeitsbescheinigung aus, die für die Eintragung ins Grundbuch nötig ist.',
  howto: [
    'Notariellen Kaufpreis für Grundstück und Gebäude eintragen.',
    'Steuersatz des betreffenden Bundeslandes auswählen.',
    'Wert mitgekauften beweglichen Inventars (z. B. Einbauküche) abziehen.',
    'Grunderwerbsteuer und Gesamtkosten ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist die Grunderwerbsteuer 2026?', a: 'Der Satz hängt vom Bundesland ab und reicht von 3,5 % (Bayern, Sachsen) bis 6,5 % (etwa Nordrhein-Westfalen, Brandenburg, Schleswig-Holstein, Thüringen, Saarland). Stand 2026 – Sätze können sich durch Landesgesetze ändern, prüfe daher den aktuellen Wert.' },
    { q: 'Worauf wird die Steuer berechnet?', a: 'Bemessungsgrundlage ist der im Notarvertrag vereinbarte Kaufpreis für Grundstück und Gebäude. Mitverkaufte bewegliche Gegenstände wie eine Einbauküche oder Möbel können gesondert ausgewiesen und von der Bemessungsgrundlage abgezogen werden.' },
    { q: 'Wann muss ich die Grunderwerbsteuer zahlen?', a: 'Nach Beurkundung des Kaufvertrags meldet der Notar den Verkauf dem Finanzamt. Dieses versendet einen Steuerbescheid, der meist innerhalb eines Monats fällig wird. Die Unbedenklichkeitsbescheinigung folgt nach Zahlung.' },
    { q: 'Gibt es Ausnahmen von der Grunderwerbsteuer?', a: 'Steuerfrei sind unter anderem Käufe unter 2.500 € sowie Erwerbe zwischen Ehegatten oder in gerader Verwandtschaftslinie, etwa zwischen Eltern und Kindern. Auch Erbschaften und Schenkungen lösen keine Grunderwerbsteuer aus.' },
  ],
  related: ['maklerprovision-rechner', 'mietrendite-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaufpreis: 350000, satz: '6.5', inventar: 0 },
      expect: [
        { label: 'Grunderwerbsteuer', value: 22750, tolerance: 0.01 },
        { label: 'Kaufpreis inkl. Grunderwerbsteuer', value: 372750, tolerance: 0.01 },
      ],
    },
    {
      values: { kaufpreis: 400000, satz: '3.5', inventar: 20000 },
      expect: [
        { label: 'Grunderwerbsteuer', value: 13300, tolerance: 0.01 },
        { label: 'Bemessungsgrundlage', value: 380000, tolerance: 0.01 },
      ],
    },
  ],
};
