import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kuchen-durchmesser-umrechnen-rechner',
  category: 'alltag',
  title: 'Springform-Durchmesser umrechnen (z. B. 26 auf 20 cm)',
  shortTitle: 'Springform umrechnen',
  description:
    'Rechne ein Tortenrezept von einer runden Springform auf einen anderen Durchmesser um – z. B. von 26 auf 20 cm. Über die Fläche werden Zutaten und Stückzahl angepasst.',
  keywords: [
    'springform umrechnen',
    'kuchen durchmesser umrechnen',
    '26 auf 20 cm umrechnen',
    'torte durchmesser anpassen',
    'springform groesse rechner',
    'kuchenform durchmesser umrechnen',
  ],
  formula:
    'Faktor = (Ziel-Durchmesser / Original-Durchmesser)²; Menge neu = Menge × Faktor',
  inputs: [
    { type: 'number', id: 'orig_d', label: 'Original-Durchmesser (Rezept)', unit: 'cm', default: 26, min: 1, step: 1 },
    { type: 'number', id: 'ziel_d', label: 'Gewünschter Durchmesser (deine Form)', unit: 'cm', default: 20, min: 1, step: 1 },
    { type: 'number', id: 'menge', label: 'Zutaten-Menge im Rezept', default: 250, min: 0, step: 1, help: 'Beliebige Einheit, z. B. g oder ml.' },
    { type: 'number', id: 'stuecke', label: 'Stücke im Original (optional)', default: 12, min: 0, step: 1, help: 'Wie viele Stücke ergibt das Original-Rezept?' },
  ],
  compute: (v) => {
    const origD = num(v.orig_d, 1);
    const zielD = num(v.ziel_d, 1);
    const menge = num(v.menge);
    const stuecke = num(v.stuecke);
    const faktor = origD > 0 ? (zielD / origD) * (zielD / origD) : 0;
    return [
      { label: 'Neue Zutaten-Menge', value: menge * faktor, digits: 1, primary: true, help: 'In derselben Einheit wie die Eingabe.' },
      { label: 'Umrechnungs-Faktor', value: faktor, digits: 3 },
      { label: 'Stücke (geschätzt)', value: stuecke * faktor, digits: 1 },
    ];
  },
  intro:
    'Viele Tortenrezepte sind für eine 26-cm-Springform geschrieben – doch oft hat man nur eine 20- oder 28-cm-Form. Weil die Fläche einer runden Form mit dem Quadrat des Durchmessers wächst, lässt sich die Zutatenmenge mit dem Faktor (Ziel/Original)² exakt anpassen. Trage jede Zutat einzeln ein; der Faktor bleibt für das ganze Rezept gleich.',
  howto: [
    'Trage den Durchmesser ein, für den das Rezept gedacht ist.',
    'Gib den Durchmesser deiner vorhandenen Springform ein.',
    'Trage die Menge einer Zutat aus dem Rezept ein.',
    'Lies die angepasste Menge ab und wiederhole dies für jede weitere Zutat.',
  ],
  faq: [
    { q: 'Warum quadriert man das Verhältnis?', a: 'Die Grundfläche einer runden Form ist π·(d/2)². Das Verhältnis der Flächen ist daher das Quadrat des Durchmesser-Verhältnisses – darum geht der Durchmesser quadratisch in den Faktor ein.' },
    { q: 'Von 26 auf 20 cm – wie viel weniger Teig?', a: 'Der Faktor beträgt (20/26)² ≈ 0,59. Du brauchst also nur knapp 60 % der Original-Mengen.' },
    { q: 'Ändert sich die Backzeit?', a: 'Ja, meist. Eine kleinere Form ergibt oft eine höhere Teigschicht und braucht länger, eine größere Form backt flacher und schneller. Mache die Stäbchenprobe.' },
  ],
  related: ['backform-umrechnen-rechner', 'rezept-portionen-rechner', 'pizza-flaechenpreis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { orig_d: 26, ziel_d: 20, menge: 250, stuecke: 12 },
      expect: [
        { label: 'Umrechnungs-Faktor', value: 0.592, tolerance: 0.002 },
        { label: 'Neue Zutaten-Menge', value: 147.9, tolerance: 0.5 },
      ],
    },
    {
      values: { orig_d: 20, ziel_d: 26, menge: 200, stuecke: 8 },
      expect: [
        { label: 'Umrechnungs-Faktor', value: 1.69, tolerance: 0.002 },
        { label: 'Neue Zutaten-Menge', value: 338, tolerance: 0.5 },
      ],
    },
  ],
};
