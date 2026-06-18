import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

function clamp255(n: number): number {
  return Math.min(255, Math.max(0, Math.round(n)));
}

function toHex(n: number): string {
  return clamp255(n).toString(16).padStart(2, '0').toUpperCase();
}

// RGB -> HSL (H in Grad, S/L in Prozent)
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d > 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s: s * 100, l: l * 100 };
}

export const tool: Tool = {
  slug: 'hex-rgb-umrechner',
  category: 'technik',
  title: 'HEX- & RGB-Farben-Umrechner',
  shortTitle: 'HEX / RGB',
  description:
    'Wandle Farben zwischen HEX-Code und RGB-Werten um und erhalte zusätzlich die HSL-Darstellung – ideal für Webdesign, CSS und Grafikprogramme.',
  keywords: [
    'hex in rgb umrechnen',
    'rgb in hex',
    'farben umrechner',
    'hex code rechner',
    'rgb farbwerte',
    'farbcode umrechnen',
    'hsl rgb hex',
  ],
  formula: 'HEX = RGB jeweils zweistellig im Hexadezimalsystem (0–255 → 00–FF); Rückweg: je zwei Stellen zu Dezimal',
  inputs: [
    {
      type: 'select',
      id: 'richtung',
      label: 'Richtung',
      default: 'rgb2hex',
      options: [
        { value: 'rgb2hex', label: 'RGB → HEX' },
        { value: 'hex2rgb', label: 'HEX → RGB' },
      ],
      help: 'Lege fest, ob du aus RGB einen HEX-Code machst oder umgekehrt.',
    },
    { type: 'number', id: 'r', label: 'Rot (R)', default: 30, min: 0, max: 255, step: 1, help: 'Nur für RGB → HEX.' },
    { type: 'number', id: 'g', label: 'Grün (G)', default: 144, min: 0, max: 255, step: 1, help: 'Nur für RGB → HEX.' },
    { type: 'number', id: 'b', label: 'Blau (B)', default: 255, min: 0, max: 255, step: 1, help: 'Nur für RGB → HEX.' },
    { type: 'number', id: 'hex', label: 'HEX-Code als Zahl', default: 2003199, min: 0, max: 16777215, step: 1, help: 'Nur für HEX → RGB: HEX als Dezimalzahl eingeben (z. B. #1E90FF = 2003199).' },
  ],
  compute: (v) => {
    const richtung = String(v.richtung);
    let r: number;
    let g: number;
    let b: number;
    if (richtung === 'hex2rgb') {
      const ganz = Math.min(16777215, Math.max(0, Math.round(num(v.hex))));
      r = Math.floor(ganz / 65536) % 256;
      g = Math.floor(ganz / 256) % 256;
      b = ganz % 256;
    } else {
      r = clamp255(num(v.r));
      g = clamp255(num(v.g));
      b = clamp255(num(v.b));
    }
    const hexCode = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    const hsl = rgbToHsl(r, g, b);
    return [
      { label: 'HEX-Code', value: hexCode, primary: true },
      { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
      { label: 'HSL', value: `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)` },
      { label: 'Helligkeit', value: hsl.l, unit: '%', digits: 0, help: 'Lightness-Anteil im HSL-Modell.' },
    ];
  },
  intro:
    'Farben im Web bestehen aus drei Kanälen: Rot, Grün und Blau mit je 256 Stufen (0–255). Der HEX-Code fasst diese drei Werte als sechsstellige Hexadezimalzahl zusammen, etwa #1E90FF. Dieser Umrechner übersetzt in beide Richtungen und liefert zusätzlich die HSL-Darstellung, die sich gut zum gezielten Aufhellen oder Abdunkeln eignet.',
  howto: [
    'Richtung wählen: RGB → HEX oder HEX → RGB.',
    'Für RGB → HEX die drei Werte für Rot, Grün und Blau (0–255) eintragen.',
    'Für HEX → RGB den Farbcode als Dezimalzahl eingeben (z. B. #1E90FF entspricht 2003199).',
    'HEX-Code, RGB- und HSL-Darstellung ablesen.',
  ],
  faq: [
    { q: 'Wie funktioniert die Umrechnung von RGB in HEX?', a: 'Jeder der drei Werte (0–255) wird ins Hexadezimalsystem umgewandelt und zweistellig dargestellt. 255 wird zu FF, 0 zu 00. Aneinandergereiht ergibt das z. B. #1E90FF.' },
    { q: 'Warum muss ich den HEX-Code als Zahl eingeben?', a: 'Dieser Rechner verarbeitet nur Zahlen-Eingaben. #1E90FF entspricht der Dezimalzahl 2.003.199. Die meisten Grafikprogramme zeigen beide Formen an, oder du nutzt RGB → HEX.' },
    { q: 'Was ist HSL und wozu dient es?', a: 'HSL steht für Hue (Farbton), Saturation (Sättigung) und Lightness (Helligkeit). Es ist intuitiver als RGB, wenn man eine Farbe gezielt heller, dunkler oder kräftiger machen möchte.' },
    { q: 'Sind HEX und RGB dieselbe Farbe?', a: 'Ja, beide beschreiben exakt dieselbe Farbe – nur in unterschiedlicher Schreibweise. #FF0000, rgb(255, 0, 0) und reines Rot sind identisch.' },
  ],
  related: ['datenmengen-umrechner', 'bit-byte-umrechner', 'megapixel-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { richtung: 'hex2rgb', r: 0, g: 0, b: 0, hex: 2003199 },
      expect: [{ label: 'Helligkeit', value: 56, tolerance: 2 }],
    },
    {
      values: { richtung: 'rgb2hex', r: 255, g: 0, b: 0, hex: 0 },
      expect: [{ label: 'Helligkeit', value: 50, tolerance: 1 }],
    },
  ],
};
