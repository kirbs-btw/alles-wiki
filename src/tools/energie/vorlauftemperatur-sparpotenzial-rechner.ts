import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'vorlauftemperatur-sparpotenzial-rechner',
  category: 'energie',
  title: 'Vorlauftemperatur-Sparpotenzial-Rechner',
  shortTitle: 'Vorlauf senken',
  description:
    'Schätze, wie viel Heizenergie und Kosten du sparst, wenn du die Vorlauftemperatur deiner Heizung absenkst - Faustregel rund 1 % Ersparnis je Grad weniger.',
  keywords: [
    'vorlauftemperatur senken sparen',
    'heizung vorlauftemperatur sparpotenzial',
    'vorlauf absenken ersparnis',
    'heizkurve einstellen sparen',
    'vorlauftemperatur rechner',
    'heizung optimieren sparen',
  ],
  intro:
    'Eine niedrigere Vorlauftemperatur senkt die Wärmeverluste und steigert bei Brennwert- und Wärmepumpen-Heizungen den Wirkungsgrad spürbar. Als Faustregel gilt: Je Grad abgesenkter Vorlauftemperatur lassen sich grob etwa 1 Prozent Heizenergie einsparen. Dieser Rechner schätzt das Sparpotenzial aus deinen aktuellen Heizkosten und der geplanten Absenkung. Der Faktor ist anlagenabhängig (Stand 2026, Näherung) - bei Wärmepumpen oft höher.',
  formula: 'Ersparnis ≈ Heizkosten × (Absenkung in K × Sparrate je K)',
  inputs: [
    { type: 'number', id: 'heizkosten', label: 'Heizkosten pro Jahr', unit: '€', default: 2000, min: 0, step: 50, help: 'Reine Heizenergiekosten (ohne Warmwasser, wenn möglich).' },
    { type: 'number', id: 'vorlaufAlt', label: 'Vorlauftemperatur aktuell', unit: '°C', default: 60, min: 20, max: 90, step: 1 },
    { type: 'number', id: 'vorlaufNeu', label: 'Vorlauftemperatur neu', unit: '°C', default: 50, min: 20, max: 90, step: 1 },
    { type: 'number', id: 'sparrate', label: 'Ersparnis je Grad', unit: '%/K', default: 1, min: 0, max: 5, step: 0.1, help: 'Faustregel ~1 %. Bei Wärmepumpen oft 2-2,5 % je Grad.' },
  ],
  compute: (v) => {
    const heizkosten = num(v.heizkosten);
    const vAlt = num(v.vorlaufAlt);
    const vNeu = num(v.vorlaufNeu);
    const sparrate = num(v.sparrate) / 100;
    const absenkung = Math.max(0, vAlt - vNeu);
    let anteil = absenkung * sparrate;
    if (anteil > 0.6) anteil = 0.6; // Plausibilitätsdeckel
    const ersparnisJahr = heizkosten * anteil;
    const neueKosten = heizkosten - ersparnisJahr;
    return [
      { label: 'Ersparnis pro Jahr', value: ersparnisJahr, unit: '€', digits: 2, primary: true },
      { label: 'Absenkung', value: absenkung, unit: 'K', digits: 0 },
      { label: 'Einsparung', value: anteil * 100, unit: '%', digits: 1 },
      { label: 'Neue Heizkosten pro Jahr', value: neueKosten, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jährliche Heizkosten eintragen (möglichst ohne Warmwasseranteil).',
    'Aktuelle Vorlauftemperatur der Heizung angeben.',
    'Geplante neue, niedrigere Vorlauftemperatur eingeben.',
    'Sparrate je Grad wählen - Faustregel 1 %, bei Wärmepumpen mehr.',
    'Jährliche Ersparnis und die neuen Heizkosten ablesen.',
  ],
  faq: [
    { q: 'Wie viel spart eine niedrigere Vorlauftemperatur?', a: 'Als grobe Faustregel rund 1 Prozent Heizenergie je Grad Absenkung. Senkst du den Vorlauf von 60 auf 50 °C, sind das etwa 10 Prozent. Bei Wärmepumpen ist der Effekt größer, weil die Arbeitszahl mit niedrigerem Vorlauf deutlich steigt.' },
    { q: 'Wie weit kann ich den Vorlauf absenken?', a: 'So weit, dass alle Räume noch warm werden. Reichen die Heizflächen nicht aus, kühlen Räume aus. Taste dich an kalten Tagen schrittweise heran und prüfe, ob es bei größter Kälte noch reicht. Großflächige Heizkörper oder Flächenheizungen erlauben niedrigere Vorlauftemperaturen.' },
    { q: 'Gilt die 1-Prozent-Regel immer?', a: 'Nein, es ist eine Näherung (Stand 2026). Der reale Wert hängt von Gebäude, Heizsystem und Heizkurve ab. Brennwertkessel profitieren von besserer Kondensation, Wärmepumpen besonders stark von der höheren Effizienz.' },
    { q: 'Senkt das auch die Warmwassertemperatur?', a: 'Nicht zwingend. Die Warmwasserbereitung sollte aus Hygienegründen (Legionellen) ausreichend hoch bleiben - meist mindestens 55-60 °C im Speicher. Trage daher möglichst nur die Heizkosten ohne Warmwasser ein.' },
  ],
  related: ['heizkosten-rechner', 'heizwaermebedarf-rechner', 'waermepumpe-stromkosten-rechner', 'heizsystem-vergleich-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { heizkosten: 2000, vorlaufAlt: 60, vorlaufNeu: 50, sparrate: 1 },
      expect: [
        { label: 'Absenkung', value: 10, tolerance: 0 },
        { label: 'Ersparnis pro Jahr', value: 200, tolerance: 0.01 },
        { label: 'Neue Heizkosten pro Jahr', value: 1800, tolerance: 0.01 },
      ],
    },
  ],
};
