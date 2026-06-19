import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'taupunkt-schimmelrisiko-rechner',
  category: 'wohnen',
  title: 'Taupunkt- & Schimmelrisiko-Rechner',
  shortTitle: 'Taupunkt',
  description:
    'Berechne den Taupunkt aus Raumtemperatur und Luftfeuchte und prüfe, ob an einer kühlen Wandoberfläche Kondensation und Schimmelrisiko droht.',
  keywords: [
    'taupunkt berechnen',
    'schimmelrisiko rechner',
    'taupunkttemperatur luftfeuchtigkeit',
    'kondensation wand',
    'schimmel feuchtigkeit rechner',
  ],
  formula:
    'Taupunkt nach Magnus: γ = ln(rF/100) + a·T/(b+T); Td = b·γ/(a−γ) mit a=17,62, b=243,12. Schimmelrisiko, wenn die relative Feuchte an der Wandoberfläche 80 % erreicht.',
  inputs: [
    { type: 'number', id: 'temp', label: 'Raumtemperatur', unit: '°C', default: 20, min: -10, max: 40, step: 0.5 },
    { type: 'number', id: 'rf', label: 'Relative Luftfeuchte', unit: '%', default: 60, min: 1, max: 100, step: 1 },
    { type: 'number', id: 'wandtemp', label: 'Temperatur der kältesten Wandfläche', unit: '°C', default: 14, min: -10, max: 40, step: 0.5, help: 'z. B. Außenwandecke hinter Möbeln. Optional.' },
  ],
  compute: (v) => {
    const T = num(v.temp);
    const rf = Math.min(100, Math.max(1, num(v.rf)));
    const wandT = num(v.wandtemp);
    const a = 17.62;
    const b = 243.12;

    // Sättigungsdampfdruck (hPa) nach Magnus.
    const es = (t: number) => 6.112 * Math.exp((a * t) / (b + t));

    // Taupunkt.
    const gamma = Math.log(rf / 100) + (a * T) / (b + T);
    const taupunkt = (b * gamma) / (a - gamma);

    // Absolute Luftfeuchte (g/m³).
    const absFeuchte = (216.7 * ((rf / 100) * es(T))) / (273.15 + T);

    // Relative Feuchte an der Wandoberfläche bei deren Temperatur.
    const dampfdruck = (rf / 100) * es(T);
    const rfWand = wandT > -273 ? (dampfdruck / es(wandT)) * 100 : 0;

    // Bewertung nach DIN 4108: Schimmelgefahr ab 80 % rel. Feuchte an der Oberfläche,
    // Kondensation (Tauwasser) ab 100 %.
    let bewertung: string;
    if (rfWand >= 100) bewertung = 'Tauwasser – Kondensation an der Wand';
    else if (rfWand >= 80) bewertung = 'Schimmelrisiko (Oberfläche ≥ 80 % rF)';
    else if (rfWand >= 70) bewertung = 'erhöht – beobachten und lüften';
    else bewertung = 'unkritisch';

    return [
      { label: 'Taupunkt', value: taupunkt, unit: '°C', digits: 1, primary: true },
      { label: 'Relative Feuchte an der Wand', value: Math.min(100, rfWand), unit: '%', digits: 0 },
      { label: 'Bewertung', value: bewertung },
      { label: 'Absolute Luftfeuchte', value: absFeuchte, unit: 'g/m³', digits: 1 },
    ];
  },
  intro:
    'Der Taupunkt ist die Temperatur, bei der die Luft mit Wasserdampf gesättigt ist und Feuchtigkeit auskondensiert. Unterschreitet eine Wandoberfläche den Taupunkt, bildet sich Tauwasser. Schimmel entsteht jedoch schon früher: Sobald die relative Feuchte direkt an der Oberfläche dauerhaft 80 % erreicht, ist das Wachstum von Schimmelpilzen möglich (DIN 4108). Der Rechner schätzt diese Risiken aus Raumklima und Wandtemperatur.',
  howto: [
    'Raumtemperatur und gemessene relative Luftfeuchte eingeben.',
    'Temperatur der kältesten Wandfläche eintragen (z. B. Außenwandecke, gemessen mit Infrarot-Thermometer).',
    'Taupunkt, relative Feuchte an der Wand und die Risikobewertung ablesen.',
    'Bei erhöhtem Risiko mehr lüften, heizen oder Möbel von der Außenwand abrücken.',
  ],
  faq: [
    { q: 'Ab wann besteht Schimmelgefahr?', a: 'Schimmel kann wachsen, sobald die relative Luftfeuchte unmittelbar an einer Oberfläche dauerhaft etwa 80 % erreicht. Das kann schon deutlich oberhalb des Taupunkts der Fall sein – ohne dass sichtbares Kondenswasser entsteht.' },
    { q: 'Was sagt mir der Taupunkt?', a: 'Der Taupunkt ist die Temperatur, ab der Wasserdampf kondensiert. Liegt die Oberflächentemperatur einer Wand unter dem Taupunkt der Raumluft, schlägt sich dort Feuchtigkeit nieder.' },
    { q: 'Wie genau ist der Rechner?', a: 'Der Taupunkt wird mit der etablierten Magnus-Näherung berechnet und ist sehr genau. Die Wandbewertung ist eine Orientierung; sie hängt von gemessener Oberflächentemperatur, Lüftung und Dauer der Feuchtebelastung ab.' },
  ],
  related: ['heizlast-rechner', 'raumvolumen-rechner', 'daemmung-heizkosten-ersparnis-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { temp: 20, rf: 60, wandtemp: 14 },
      expect: [
        { label: 'Taupunkt', value: 12, tolerance: 0.1 },
        { label: 'Absolute Luftfeuchte', value: 10.4, tolerance: 0.2 },
      ],
    },
    {
      values: { temp: 22, rf: 50, wandtemp: 18 },
      expect: [
        { label: 'Taupunkt', value: 11.1, tolerance: 0.2 },
      ],
    },
  ],
};
