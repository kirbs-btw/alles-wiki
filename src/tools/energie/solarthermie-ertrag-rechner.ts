import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'solarthermie-ertrag-rechner',
  category: 'energie',
  title: 'Solarthermie-Ertrag-Rechner',
  shortTitle: 'Solarthermie',
  description:
    'Schätze den jährlichen Wärmeertrag einer Solarthermie-Anlage und die eingesparten Energiekosten aus Kollektorfläche, spezifischem Ertrag und Energiepreis.',
  keywords: [
    'solarthermie ertrag berechnen',
    'solarthermie rechner',
    'solarkollektor ertrag',
    'warmwasser solar ersparnis',
    'solarthermie kwh pro m2',
    'solar heizung ertrag',
  ],
  intro:
    'Solarthermie nutzt Kollektoren auf dem Dach, um Wasser für Warmwasser und Heizung zu erwärmen. Dieser Rechner schätzt den jährlichen Wärmeertrag aus der Kollektorfläche und dem spezifischen Ertrag je Quadratmeter sowie die dadurch eingesparten Energiekosten. Flachkollektoren liefern in Deutschland typisch 350-500 kWh je m² und Jahr, Röhrenkollektoren etwas mehr. Der Solardeckungsgrad zeigt, welcher Anteil deines Wärmebedarfs gedeckt wird.',
  formula: 'Ertrag = Kollektorfläche × spez. Ertrag (kWh/m²); Ersparnis = Ertrag × Energiepreis',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Kollektorfläche', unit: 'm²', default: 6, min: 0, step: 0.5, help: 'Warmwasser ~1-1,5 m² je Person, Heizungsunterstützung deutlich mehr.' },
    {
      type: 'select',
      id: 'typ',
      label: 'Kollektortyp',
      default: '450',
      options: [
        { value: '400', label: 'Flachkollektor (~400 kWh/m²·a)' },
        { value: '450', label: 'Flachkollektor gut ausgerichtet (~450 kWh/m²·a)' },
        { value: '550', label: 'Röhrenkollektor (~550 kWh/m²·a)' },
      ],
      help: 'Spezifischer Jahresertrag je Quadratmeter Kollektorfläche.',
    },
    { type: 'number', id: 'preis', label: 'Energiepreis (ersetzte Wärme)', unit: 'ct/kWh', default: 11, min: 0, step: 0.1, help: 'Preis des Energieträgers, den die Solarwärme ersetzt (Gas ~11, Öl ~11).' },
    { type: 'number', id: 'wg', label: 'Wirkungsgrad Altanlage', unit: '%', default: 90, min: 1, max: 110, step: 1, help: 'Wirkungsgrad des ersetzten Kessels - so wird der Brennstoff korrekt eingespart.' },
    { type: 'number', id: 'bedarf', label: 'Wärmebedarf für Warmwasser/Heizung', unit: 'kWh', default: 4000, min: 1, step: 100, help: 'Bedarf, der durch Solar gedeckt werden soll.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const spez = num(v.typ);
    const preis = num(v.preis) / 100;
    const wg = num(v.wg) / 100;
    const bedarf = num(v.bedarf);
    const bruttoErtrag = flaeche * spez;
    // Nutzbarer Ertrag ist durch den Bedarf begrenzt (Überschuss verpufft)
    const nutzbar = Math.min(bruttoErtrag, bedarf);
    // Eingesparter Brennstoff: Nutzwärme / Wirkungsgrad des ersetzten Kessels
    const eingesparteEndenergie = wg > 0 ? nutzbar / wg : nutzbar;
    const ersparnis = eingesparteEndenergie * preis;
    const deckung = bedarf > 0 ? (nutzbar / bedarf) * 100 : 0;
    return [
      { label: 'Eingesparte Energiekosten pro Jahr', value: ersparnis, unit: '€', digits: 2, primary: true },
      { label: 'Solarer Wärmeertrag pro Jahr', value: bruttoErtrag, unit: 'kWh', digits: 0 },
      { label: 'Davon nutzbar', value: nutzbar, unit: 'kWh', digits: 0 },
      { label: 'Solarer Deckungsgrad', value: deckung, unit: '%', digits: 1 },
    ];
  },
  howto: [
    'Kollektorfläche in Quadratmetern eintragen.',
    'Kollektortyp wählen - er bestimmt den spezifischen Jahresertrag.',
    'Energiepreis und Wirkungsgrad des ersetzten Heizsystems angeben.',
    'Wärmebedarf eintragen und Ersparnis sowie Deckungsgrad ablesen.',
  ],
  faq: [
    { q: 'Wie viel Ertrag bringt Solarthermie?', a: 'In Deutschland liefern Flachkollektoren je nach Ausrichtung etwa 350-500 kWh und Röhrenkollektoren bis rund 600 kWh je Quadratmeter und Jahr. Der reale Ertrag hängt von Dachneigung, Ausrichtung und Verschattung ab.' },
    { q: 'Was ist der solare Deckungsgrad?', a: 'Er gibt an, welcher Anteil des Wärmebedarfs durch die Solaranlage gedeckt wird. Für reine Warmwasseranlagen sind 50-60 % im Jahr üblich, bei Heizungsunterstützung 20-30 % des Gesamtwärmebedarfs.' },
    { q: 'Warum ist der nutzbare Ertrag begrenzt?', a: 'Im Sommer produzieren Kollektoren oft mehr Wärme als gebraucht wird - dieser Überschuss bleibt ungenutzt. Der Rechner begrenzt den nutzbaren Ertrag daher auf den eingegebenen Wärmebedarf.' },
    { q: 'Warum zählt der Wirkungsgrad der Altanlage?', a: 'Jede solar gewonnene Kilowattstunde Nutzwärme spart Brennstoff, den der alte Kessel mit seinem Wirkungsgrad hätte verbrennen müssen. Bei 90 % Wirkungsgrad wird etwas mehr Brennstoff eingespart als reine Nutzwärme.' },
  ],
  related: ['warmwasser-kosten-rechner', 'heizwaermebedarf-rechner', 'pv-ertrag-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { flaeche: 6, typ: '450', preis: 11, wg: 90, bedarf: 4000 },
      expect: [
        { label: 'Solarer Wärmeertrag pro Jahr', value: 2700, tolerance: 0 },
        { label: 'Davon nutzbar', value: 2700, tolerance: 0 },
        { label: 'Eingesparte Energiekosten pro Jahr', value: 330, tolerance: 0.5 },
        { label: 'Solarer Deckungsgrad', value: 67.5, tolerance: 0.1 },
      ],
    },
  ],
};
