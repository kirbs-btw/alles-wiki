import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kochzeit-ei-rechner',
  category: 'alltag',
  title: 'Kochzeit für Eier berechnen',
  shortTitle: 'Eier-Kochzeit',
  description:
    'Berechne die ideale Kochzeit für dein Frühstücksei – nach Eigröße (S–XL), gewünschter Konsistenz (weich, wachsweich, hart) und Starttemperatur.',
  keywords: [
    'ei kochzeit berechnen',
    'eier kochzeit rechner',
    'wie lange ei kochen',
    'weiches ei kochzeit',
    'hartes ei kochzeit',
    'frühstücksei zeit',
  ],
  formula:
    'Kochzeit = Basiszeit(Konsistenz) + Größenzuschlag(S/M/L/XL) + Startzuschlag (Kühlschrank/Zimmertemperatur)',
  inputs: [
    {
      type: 'select',
      id: 'groesse',
      label: 'Eigröße',
      default: 'M',
      options: [
        { value: 'S', label: 'S (klein, unter 53 g)' },
        { value: 'M', label: 'M (mittel, 53–63 g)' },
        { value: 'L', label: 'L (groß, 63–73 g)' },
        { value: 'XL', label: 'XL (sehr groß, ab 73 g)' },
      ],
    },
    {
      type: 'select',
      id: 'konsistenz',
      label: 'Gewünschte Konsistenz',
      default: 'wachsweich',
      options: [
        { value: 'weich', label: 'Weich (flüssiges Eigelb)' },
        { value: 'wachsweich', label: 'Wachsweich (cremiges Eigelb)' },
        { value: 'hart', label: 'Hart (festes Eigelb)' },
      ],
    },
    {
      type: 'select',
      id: 'start',
      label: 'Starttemperatur',
      default: 'kuehlschrank',
      options: [
        { value: 'kuehlschrank', label: 'Direkt aus dem Kühlschrank' },
        { value: 'zimmer', label: 'Zimmertemperatur' },
      ],
      help: 'Kühle Eier brauchen etwas länger.',
    },
  ],
  compute: (v) => {
    const groesse = String(v.groesse || 'M');
    const konsistenz = String(v.konsistenz || 'wachsweich');
    const start = String(v.start || 'kuehlschrank');
    const basis: Record<string, number> = { weich: 4.5, wachsweich: 6.5, hart: 9.0 };
    const groessenZuschlag: Record<string, number> = { S: -1.0, M: 0, L: 1.0, XL: 1.5 };
    const startZuschlag = start === 'zimmer' ? -1.0 : 0;
    const zeit = (basis[konsistenz] ?? 6.5) + (groessenZuschlag[groesse] ?? 0) + startZuschlag;
    const zeitSicher = Math.max(2, zeit);
    const minuten = Math.floor(zeitSicher);
    const sekunden = Math.round((zeitSicher - minuten) * 60);
    return [
      { label: 'Kochzeit', value: zeitSicher, unit: 'min', digits: 1, primary: true, help: 'Ab dem Moment, in dem das Wasser sprudelnd kocht.' },
      { label: 'Kochzeit (Min:Sek)', value: `${minuten}:${String(sekunden).padStart(2, '0')}` },
    ];
  },
  intro:
    'Das perfekte Frühstücksei hängt von Eigröße, Wunschkonsistenz und Starttemperatur ab. Diese Werte sind bewährte Orientierungszeiten ab dem Moment, in dem das Wasser sprudelnd kocht: Größere und kühlschrankkalte Eier brauchen länger. Lege die Eier vorsichtig ins kochende Wasser und stelle dann den Timer – nach Ablauf sofort abschrecken.',
  howto: [
    'Wähle die Eigröße (steht meist auf der Verpackung: S, M, L oder XL).',
    'Wähle die gewünschte Konsistenz von weich bis hart.',
    'Gib an, ob das Ei aus dem Kühlschrank oder zimmerwarm ist.',
    'Lies die Kochzeit ab – sie zählt ab dem sprudelnden Kochen des Wassers.',
  ],
  faq: [
    { q: 'Ab wann zählt die Kochzeit?', a: 'Ab dem Moment, in dem das Wasser nach dem Einlegen der Eier wieder sprudelnd kocht. Lege die Eier in bereits kochendes Wasser.' },
    { q: 'Soll ich die Eier abschrecken?', a: 'Bei weichen und wachsweichen Eiern empfiehlt sich kurzes Abschrecken, damit sie nicht nachgaren. Bei harten Eiern erleichtert es das Pellen.' },
    { q: 'Wie verhindere ich, dass Eier platzen?', a: 'Steche das Ei am stumpfen Ende leicht an oder verwende zimmerwarme Eier. Ein Schuss Essig im Wasser hilft, dass auslaufendes Eiweiß sofort gerinnt.' },
    { q: 'Sind die Zeiten exakt?', a: 'Es sind bewährte Orientierungswerte. Herdleistung, Wassermenge und Höhe über dem Meer beeinflussen das Ergebnis – beim ersten Mal lohnt sich eine Kontrolle.' },
  ],
  related: ['heissluftfritteuse-umrechner', 'backofen-umluft-umrechner', 'zeit-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { groesse: 'M', konsistenz: 'hart', start: 'kuehlschrank' },
      expect: [
        { label: 'Kochzeit', value: 9, tolerance: 0.05 },
      ],
    },
    {
      values: { groesse: 'L', konsistenz: 'weich', start: 'kuehlschrank' },
      expect: [
        { label: 'Kochzeit', value: 5.5, tolerance: 0.05 },
      ],
    },
  ],
};
