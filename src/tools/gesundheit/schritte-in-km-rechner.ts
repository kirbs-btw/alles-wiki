import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schritte-in-km-rechner',
  category: 'gesundheit',
  title: 'Schritte-in-Kilometer-Rechner',
  shortTitle: 'Schritte → km',
  description:
    'Rechne deine Schrittzahl in zurückgelegte Kilometer um – aus Schritten und deiner Körpergröße über die geschätzte Schrittlänge.',
  keywords: [
    'schritte in km',
    'schritte in kilometer umrechnen',
    'schrittlaenge berechnen',
    'wie viele km sind 10000 schritte',
    'schritte strecke rechner',
    'schritte umrechnen',
  ],
  formula:
    'Schrittlänge(m) = Größe(cm) × 0,415 / 100; Strecke(km) = Schritte × Schrittlänge / 1000',
  inputs: [
    { type: 'number', id: 'schritte', label: 'Anzahl Schritte', unit: 'Schritte', default: 10000, min: 0, step: 100 },
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 175, min: 1, step: 1 },
    { type: 'number', id: 'faktor', label: 'Schrittlängen-Faktor', default: 0.415, min: 0.3, max: 0.5, step: 0.001, help: 'Gehen ≈ 0,415; zügiges Gehen/Laufen höher.' },
  ],
  compute: (v) => {
    const schritte = num(v.schritte);
    const groesse = num(v.groesse);
    const faktor = num(v.faktor);
    const schrittlaengeM = (groesse * faktor) / 100;
    const streckeM = schritte * schrittlaengeM;
    const streckeKm = streckeM / 1000;
    return [
      { label: 'Strecke', value: streckeKm, unit: 'km', digits: 2, primary: true },
      { label: 'Strecke in Metern', value: streckeM, unit: 'm', digits: 0 },
      { label: 'Schrittlänge', value: schrittlaengeM, unit: 'm', digits: 2 },
    ];
  },
  intro:
    'Wie weit sind 10.000 Schritte? Dieser Rechner wandelt deine Schrittzahl in Kilometer um. Da die Schrittlänge individuell ist, wird sie aus deiner Körpergröße geschätzt: Beim normalen Gehen entspricht sie etwa 41,5 Prozent der Größe. Den Faktor kannst du für zügiges Gehen oder Laufen anpassen.',
  howto: [
    'Anzahl der Schritte eingeben.',
    'Körpergröße in Zentimetern eintragen.',
    'Bei Bedarf den Schrittlängen-Faktor anpassen.',
    'Zurückgelegte Strecke in Kilometern ablesen.',
  ],
  faq: [
    { q: 'Wie viele Kilometer sind 10.000 Schritte?', a: 'Bei 175 cm Körpergröße und normalem Gehen sind das rund 7,3 Kilometer. Der genaue Wert hängt von Schrittlänge und Gehtempo ab.' },
    { q: 'Woher kommt der Faktor 0,415?', a: 'Studien zur Schrittlänge ergeben beim normalen Gehen etwa 41,5 Prozent der Körpergröße. Beim schnellen Gehen oder Laufen ist die Schrittlänge größer.' },
    { q: 'Warum ist das nur eine Schätzung?', a: 'Die tatsächliche Schrittlänge variiert mit Tempo, Untergrund, Beinlänge und Gewohnheit. Schrittzähler arbeiten daher ebenfalls mit Näherungswerten.' },
  ],
  related: ['lauf-pace-rechner', 'kalorien-gehen-rechner', 'kalorienverbrauch-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { schritte: 10000, groesse: 175, faktor: 0.415 },
      expect: [
        { label: 'Schrittlänge', value: 0.726, tolerance: 0.005 },
        { label: 'Strecke', value: 7.26, tolerance: 0.02 },
      ],
    },
    {
      values: { schritte: 6000, groesse: 180, faktor: 0.415 },
      expect: [
        { label: 'Strecke', value: 4.48, tolerance: 0.02 },
      ],
    },
  ],
};
