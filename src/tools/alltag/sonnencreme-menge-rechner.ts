import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Sonnencreme-Bedarf nach der dermatologischen "2-mg-pro-cm²"-Regel.
 * Für einen erwachsenen Körper entspricht das rund 30–40 ml pro vollständigem Auftrag
 * (oft als "Shot-Glass-Regel": ca. 30 ml für den ganzen Körper).
 * Wir rechnen über die Körperoberfläche (Mosteller-Näherung) mal 2 mg/cm².
 * Dichte von Sonnencreme ≈ 1 g/ml, daher mg ≈ mg und ml = g.
 */
const MG_PRO_CM2 = 2;

export const tool: Tool = {
  slug: 'sonnencreme-menge-rechner',
  category: 'alltag',
  title: 'Sonnencreme-Menge berechnen',
  shortTitle: 'Sonnencreme-Menge',
  description:
    'Berechne, wie viel Sonnencreme du pro Auftrag brauchst – nach der dermatologischen 2-mg-pro-cm²-Regel, abhängig von Körpergröße, Gewicht und Anzahl der Aufträge.',
  keywords: [
    'sonnencreme menge berechnen',
    'wie viel sonnencreme',
    'sonnencreme pro tag',
    'sonnenschutz menge koerper',
    'sonnencreme verbrauch rechner',
    'wie viel sonnencreme auftragen',
  ],
  formula:
    'Körperoberfläche (Mosteller) = √(Größe[cm] × Gewicht[kg] / 3600); Menge = Fläche[m²] × 10000 × 2 mg / 1000 (ml)',
  inputs: [
    { type: 'number', id: 'groesse', label: 'Körpergröße', unit: 'cm', default: 175, min: 50, max: 230, step: 1 },
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 75, min: 3, max: 200, step: 1 },
    { type: 'number', id: 'anteil', label: 'Eingecremte Körperfläche', unit: '%', default: 100, min: 5, max: 100, step: 5, help: '100 % = ganzer Körper, weniger z. B. nur Arme/Gesicht.' },
    { type: 'number', id: 'auftraege', label: 'Aufträge pro Tag', default: 1, min: 1, step: 1, help: 'Nachcremen alle 2 Std. empfohlen.' },
  ],
  compute: (v) => {
    const groesse = num(v.groesse, 175);
    const gewicht = num(v.gewicht, 75);
    const anteil = Math.min(100, Math.max(0, num(v.anteil, 100)));
    const auftraege = Math.max(1, Math.round(num(v.auftraege, 1)));
    // Mosteller-Formel: Körperoberfläche in m².
    const flaecheM2 = Math.sqrt((groesse * gewicht) / 3600) * (anteil / 100);
    const flaecheCm2 = flaecheM2 * 10000;
    // Menge je Auftrag in mg -> g/ml (Dichte ~1 g/ml).
    const mlProAuftrag = (flaecheCm2 * MG_PRO_CM2) / 1000;
    const mlGesamt = mlProAuftrag * auftraege;
    return [
      { label: 'Menge pro Auftrag', value: mlProAuftrag, unit: 'ml', digits: 1, primary: true },
      { label: 'Menge pro Tag', value: mlGesamt, unit: 'ml', digits: 1 },
      { label: 'Eingecremte Fläche', value: flaecheM2, unit: 'm²', digits: 2 },
    ];
  },
  intro:
    'Die meisten Menschen tragen zu wenig Sonnencreme auf und erreichen so den angegebenen Lichtschutzfaktor nicht. Dermatolog:innen empfehlen rund 2 mg pro cm² Haut. Dieser Rechner schätzt deine Körperoberfläche aus Größe und Gewicht (Mosteller-Näherung) und ermittelt daraus die nötige Menge pro Auftrag. Die Werte sind Näherungen (Stand 2026); zum Schutz unbedingt regelmäßig nachcremen.',
  howto: [
    'Gib Körpergröße und Gewicht ein.',
    'Stelle ein, welcher Anteil des Körpers eingecremt wird (100 % = komplett).',
    'Wähle, wie oft du am Tag cremst (Nachcremen alle 2 Stunden wird empfohlen).',
    'Lies ab, wie viel Milliliter du pro Auftrag und pro Tag brauchst.',
  ],
  faq: [
    { q: 'Wie viel Sonnencreme für den ganzen Körper?', a: 'Für einen erwachsenen Körper gelten grob 30 bis 40 ml pro Auftrag – oft als „Shot-Glass-Regel" beschrieben. Der genaue Wert hängt von Größe und Gewicht ab.' },
    { q: 'Hängt die Menge vom Lichtschutzfaktor ab?', a: 'Nein, die aufzutragende Menge (2 mg/cm²) ist unabhängig vom LSF. Erst durch diese Menge wird der angegebene Schutzfaktor überhaupt erreicht. Ein höherer LSF ersetzt also nicht weniger Creme.' },
    { q: 'Wie oft soll ich nachcremen?', a: 'Etwa alle zwei Stunden sowie nach dem Baden, Schwitzen oder Abtrocknen. Plane den Tagesbedarf entsprechend großzügig.' },
    { q: 'Ist die Berechnung medizinisch verbindlich?', a: 'Nein, es ist eine Näherung auf Basis der 2-mg-Regel und einer Körperoberflächen-Formel. Im Zweifel großzügiger auftragen und auf Schatten und Kleidung als Schutz setzen.' },
  ],
  related: ['koerpergroesse-umrechner', 'verduennung-rechner', 'mischungsverhaeltnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { groesse: 175, gewicht: 75, anteil: 100, auftraege: 1 },
      // BSA = sqrt(175*75/3600) = sqrt(3.6458) = 1.9094 m²; cm² = 19094; ml = 19094*2/1000 = 38.19
      expect: [
        { label: 'Menge pro Auftrag', value: 38.2, tolerance: 0.2 },
        { label: 'Eingecremte Fläche', value: 1.91, tolerance: 0.02 },
      ],
    },
    {
      values: { groesse: 180, gewicht: 80, anteil: 50, auftraege: 2 },
      // BSA = sqrt(180*80/3600)= sqrt(4)=2.0 m² *0.5 =1.0 m²; cm²=10000; ml/Auftrag=20; pro Tag=40
      expect: [
        { label: 'Menge pro Auftrag', value: 20, tolerance: 0.2 },
        { label: 'Menge pro Tag', value: 40, tolerance: 0.4 },
      ],
    },
  ],
};
