import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'teilzeit-gehalt-rechner',
  category: 'beruf',
  title: 'Teilzeit-Gehalt-Rechner (anteilig)',
  shortTitle: 'Teilzeit-Gehalt',
  description:
    'Rechne ein Vollzeitgehalt anteilig auf Teilzeit um: aus Vollzeit-Brutto und Wochenstunden ergibt sich dein Teilzeit-Gehalt, der Teilzeitfaktor und das Jahresbrutto.',
  keywords: [
    'teilzeit gehalt rechner',
    'gehalt teilzeit berechnen',
    'vollzeit auf teilzeit umrechnen',
    'teilzeitfaktor berechnen',
    'gehalt bei 30 stunden',
    'anteiliges gehalt teilzeit',
    'teilzeit brutto berechnen',
  ],
  formula:
    'Teilzeitgehalt = Vollzeitgehalt × (Teilzeitstunden ÷ Vollzeitstunden)',
  inputs: [
    { type: 'number', id: 'vollzeitgehalt', label: 'Vollzeit-Brutto-Monatsgehalt', unit: '€', default: 4000, min: 0, step: 50 },
    { type: 'number', id: 'vollzeitstunden', label: 'Vollzeit-Wochenstunden', unit: 'h', default: 40, min: 1, step: 0.5 },
    { type: 'number', id: 'teilzeitstunden', label: 'Deine Teilzeit-Wochenstunden', unit: 'h', default: 30, min: 0.5, step: 0.5 },
  ],
  compute: (v) => {
    const vollzeitgehalt = num(v.vollzeitgehalt);
    const vollzeitstunden = num(v.vollzeitstunden);
    const teilzeitstunden = num(v.teilzeitstunden);

    const faktor = vollzeitstunden > 0 ? teilzeitstunden / vollzeitstunden : 0;
    const teilzeitgehalt = vollzeitgehalt * faktor;
    const differenz = vollzeitgehalt - teilzeitgehalt;
    const stundensatz = teilzeitstunden > 0 ? teilzeitgehalt / (teilzeitstunden * 4.33) : 0;

    return [
      { label: 'Teilzeit-Monatsgehalt', value: teilzeitgehalt, unit: '€', digits: 2, primary: true },
      { label: 'Teilzeitfaktor', value: faktor * 100, unit: '%', digits: 1 },
      { label: 'Differenz zur Vollzeit', value: differenz, unit: '€', digits: 2 },
      { label: 'Teilzeit-Jahresgehalt', value: teilzeitgehalt * 12, unit: '€', digits: 2 },
      { label: 'Stundensatz', value: stundensatz, unit: '€', digits: 2, help: 'Bleibt gegenüber der Vollzeit gleich – nur die Stundenzahl ändert sich.' },
    ];
  },
  intro:
    'Bei Teilzeit wird das Gehalt grundsätzlich anteilig zur Arbeitszeit gezahlt: Wer 30 statt 40 Stunden arbeitet, erhält 75 % des Vollzeitgehalts. Der Stundensatz bleibt dabei gleich. Dieser Rechner zeigt dir das Teilzeit-Brutto, den Teilzeitfaktor und die Differenz zur Vollzeit.',
  howto: [
    'Trage das Brutto-Monatsgehalt ein, das bei Vollzeit gezahlt würde.',
    'Gib die vertragliche Vollzeit-Wochenstundenzahl an (oft 38,5 oder 40).',
    'Trage deine gewünschten oder vereinbarten Teilzeitstunden ein.',
    'Lies Teilzeitgehalt, Faktor und Differenz ab.',
  ],
  faq: [
    { q: 'Wird Teilzeitgehalt immer linear gekürzt?', a: 'Ja, beim Grundgehalt gilt das Pro-rata-temporis-Prinzip: Die Bezahlung sinkt im gleichen Verhältnis wie die Arbeitszeit. Eine schlechtere Behandlung von Teilzeitkräften ist unzulässig.' },
    { q: 'Bleibt der Stundensatz bei Teilzeit gleich?', a: 'Ja. Da Gehalt und Stunden im selben Verhältnis sinken, ändert sich der Stundensatz nicht. Genau das macht die anteilige Berechnung fair.' },
    { q: 'Was ist mit Urlaub und Sonderzahlungen?', a: 'Urlaubstage werden über die Arbeitstage pro Woche umgerechnet; Sonderzahlungen wie Weihnachtsgeld werden meist ebenfalls anteilig gezahlt. Der Vertrag ist maßgeblich.' },
    { q: 'Welche Vollzeitstunden soll ich eintragen?', a: 'Die im Betrieb übliche Vollzeit – häufig 40, in Tarifbranchen oft 38,5 oder 37,5 Stunden. Der Teilzeitfaktor hängt direkt davon ab.' },
    { q: 'Ist das Brutto oder Netto?', a: 'Der Rechner arbeitet mit Bruttowerten. Netto wirkt sich Teilzeit überproportional aus, weil die Steuerprogression bei geringerem Einkommen niedriger ist.' },
  ],
  related: ['stundenlohn-rechner', 'urlaubsanspruch-rechner', 'gehaltserhoehung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { vollzeitgehalt: 4000, vollzeitstunden: 40, teilzeitstunden: 30 },
      expect: [
        { label: 'Teilzeit-Monatsgehalt', value: 3000, tolerance: 0.01 },
        { label: 'Teilzeitfaktor', value: 75, tolerance: 0.01 },
      ],
    },
  ],
};
