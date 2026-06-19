import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'rauchfrei-ersparnis-rechner',
  category: 'gesundheit',
  title: 'Rauchfrei-Ersparnis-Rechner',
  shortTitle: 'Rauchfrei-Ersparnis',
  description:
    'Berechne, wie viel Geld du durch den Rauchstopp sparst – pro Monat und Jahr – und wie viele Zigaretten du dir ersparst.',
  keywords: [
    'rauchfrei rechner',
    'rauchstopp ersparnis',
    'wie viel geld spare ich nichtrauchen',
    'zigaretten kosten rechner',
    'rauchen aufhören sparen',
    'nichtraucher ersparnis',
  ],
  formula: 'Ersparnis = (Zigaretten/Tag ÷ Stück je Packung) × Packungspreis × Tage',
  inputs: [
    { type: 'number', id: 'proTag', label: 'Zigaretten pro Tag', default: 20, min: 0, step: 1 },
    { type: 'number', id: 'jePackung', label: 'Zigaretten je Packung', default: 20, min: 1, step: 1 },
    { type: 'number', id: 'preis', label: 'Preis pro Packung', unit: '€', default: 8, min: 0, step: 0.1 },
    { type: 'number', id: 'tage', label: 'Bereits rauchfreie Tage', unit: 'Tage', default: 30, min: 0, step: 1, help: 'Für die bisher erzielte Ersparnis.' },
  ],
  compute: (v) => {
    const proTag = num(v.proTag);
    const jePackung = num(v.jePackung, 20);
    const preis = num(v.preis);
    const tage = num(v.tage);
    const preisProZig = jePackung > 0 ? preis / jePackung : 0;
    const kostenProTag = proTag * preisProZig;
    const proMonat = kostenProTag * 30.44; // Durchschnittsmonat
    const proJahr = kostenProTag * 365;
    const bisher = kostenProTag * tage;
    const zigGespart = proTag * tage;
    return [
      { label: 'Ersparnis bisher', value: bisher, unit: '€', digits: 2, primary: true },
      { label: 'Ersparnis pro Monat', value: proMonat, unit: '€', digits: 2 },
      { label: 'Ersparnis pro Jahr', value: proJahr, unit: '€', digits: 2 },
      { label: 'Nicht gerauchte Zigaretten', value: zigGespart, unit: 'Stück', digits: 0 },
    ];
  },
  intro:
    'Rauchen ist nicht nur gesundheitlich, sondern auch finanziell teuer. Dieser Rechner zeigt, wie schnell sich die Ausgaben für Zigaretten summieren und wie viel du durch einen Rauchstopp sparst – bisher, pro Monat und hochgerechnet aufs Jahr. Das gesparte Geld lässt sich anschaulich machen, etwa als Urlaub oder Rücklage. Die Zahlen sind eine Orientierung; sie hängen vom tatsächlichen Konsum und Preis ab.',
  howto: [
    'Bisherige Zigaretten pro Tag eingeben.',
    'Packungsgröße und Preis pro Packung eintragen.',
    'Anzahl der bereits rauchfreien Tage angeben.',
    'Ersparnis bisher sowie hochgerechnet pro Monat und Jahr ablesen.',
  ],
  faq: [
    { q: 'Wie viel spare ich als Nichtraucher?', a: 'Bei einer Packung (8 €) pro Tag sind es rund 244 € im Monat und etwa 2920 € im Jahr. Der genaue Betrag hängt von deinem bisherigen Konsum und dem Packungspreis ab.' },
    { q: 'Mit welchem Monat rechnet das Tool?', a: 'Für die monatliche Ersparnis wird ein Durchschnittsmonat von 30,44 Tagen verwendet (365 ÷ 12), damit Monats- und Jahreswert zusammenpassen.' },
    { q: 'Bringt der Rauchstopp auch gesundheitlich etwas?', a: 'Ja. Schon nach kurzer Zeit verbessern sich Kreislauf und Lungenfunktion, langfristig sinkt das Risiko für Herz-Kreislauf- und Krebserkrankungen deutlich. Eine ärztliche oder professionelle Begleitung kann den Ausstieg erleichtern.' },
    { q: 'Was kann ich mit dem gesparten Geld machen?', a: 'Viele richten ein eigenes Sparziel ein – etwa eine Reise oder Anschaffung. Das sichtbare Ergebnis hilft oft, motiviert zu bleiben.' },
  ],
  related: ['promillerechner', 'kalorienbedarf-rechner', 'grundumsatz-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { proTag: 20, jePackung: 20, preis: 8, tage: 30 },
      expect: [
        { label: 'Ersparnis bisher', value: 240, tolerance: 0.01 },
        { label: 'Ersparnis pro Jahr', value: 2920, tolerance: 0.01 },
        { label: 'Nicht gerauchte Zigaretten', value: 600, tolerance: 0.5 },
      ],
    },
    {
      values: { proTag: 10, jePackung: 20, preis: 8, tage: 365 },
      expect: [
        { label: 'Ersparnis bisher', value: 1460, tolerance: 0.01 },
      ],
    },
  ],
};
