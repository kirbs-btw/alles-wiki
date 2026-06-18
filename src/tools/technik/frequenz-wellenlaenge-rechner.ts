import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Ausbreitungsgeschwindigkeit je Medium in Meter pro Sekunde.
const SPEED: Record<string, number> = {
  licht: 299792458, // elektromagnetische Welle im Vakuum/Luft
  schall: 343, // Schall in Luft bei ca. 20 Grad C
};

// Multiplikator der gewählten Frequenzeinheit in Hertz.
const FREQ_FAKTOR: Record<string, number> = {
  hz: 1,
  khz: 1e3,
  mhz: 1e6,
  ghz: 1e9,
};

export const tool: Tool = {
  slug: 'frequenz-wellenlaenge-rechner',
  category: 'technik',
  title: 'Frequenz-Wellenlänge-Rechner',
  shortTitle: 'Wellenlänge',
  description:
    'Berechne die Wellenlänge aus der Frequenz – für Funk und Licht (Lichtgeschwindigkeit) oder Schall in Luft, mit Einheit von Hz bis GHz.',
  keywords: [
    'wellenlänge berechnen',
    'frequenz wellenlänge',
    'wellenlänge aus frequenz',
    'lambda berechnen frequenz',
    'funk wellenlänge rechner',
    'schall wellenlänge',
  ],
  formula: 'Wellenlänge λ = Ausbreitungsgeschwindigkeit c / Frequenz f',
  inputs: [
    {
      type: 'number',
      id: 'frequenz',
      label: 'Frequenz',
      default: 100,
      min: 0,
      step: 1,
    },
    {
      type: 'select',
      id: 'einheit',
      label: 'Frequenzeinheit',
      default: 'mhz',
      options: [
        { value: 'hz', label: 'Hertz (Hz)' },
        { value: 'khz', label: 'Kilohertz (kHz)' },
        { value: 'mhz', label: 'Megahertz (MHz)' },
        { value: 'ghz', label: 'Gigahertz (GHz)' },
      ],
    },
    {
      type: 'select',
      id: 'medium',
      label: 'Wellenart / Medium',
      default: 'licht',
      options: [
        { value: 'licht', label: 'Funk/Licht (c = 299.792.458 m/s)' },
        { value: 'schall', label: 'Schall in Luft (343 m/s)' },
      ],
      help: 'Funkwellen und Licht breiten sich mit Lichtgeschwindigkeit aus, Schall deutlich langsamer.',
    },
  ],
  compute: (v) => {
    const c = SPEED[String(v.medium)] ?? SPEED.licht;
    const f = num(v.frequenz) * (FREQ_FAKTOR[String(v.einheit)] ?? 1);
    const lambdaM = f > 0 ? c / f : 0;
    return [
      { label: 'Wellenlänge', value: lambdaM, unit: 'm', digits: 4, primary: true },
      { label: 'Wellenlänge in cm', value: lambdaM * 100, unit: 'cm', digits: 2 },
      { label: 'Frequenz in Hz', value: f, unit: 'Hz', digits: 0 },
    ];
  },
  intro:
    'Frequenz und Wellenlänge sind über die Ausbreitungsgeschwindigkeit fest verknüpft: λ = c / f. Bei Funk und Licht ist c die Lichtgeschwindigkeit (rund 300 Millionen m/s), bei Schall in Luft nur etwa 343 m/s. So hat eine 100-MHz-UKW-Welle rund 3 m Wellenlänge, während ein 343-Hz-Ton in Luft genau 1 m misst. Wähle Einheit und Medium und der Rechner liefert die Wellenlänge in Meter und Zentimeter.',
  howto: [
    'Die Frequenz als Zahl eingeben.',
    'Die passende Frequenzeinheit wählen (Hz, kHz, MHz oder GHz).',
    'Wellenart bzw. Medium festlegen (Funk/Licht oder Schall in Luft).',
    'Die Wellenlänge ablesen.',
  ],
  faq: [
    {
      q: 'Welche Geschwindigkeit wird für Funkwellen verwendet?',
      a: 'Für elektromagnetische Wellen (Funk, Radio, WLAN, Licht) wird die Vakuum-Lichtgeschwindigkeit von 299.792.458 m/s genutzt. In Luft ist der Unterschied vernachlässigbar.',
    },
    {
      q: 'Warum ist die Wellenlänge bei Schall so viel kürzer?',
      a: 'Schall breitet sich in Luft mit nur etwa 343 m/s aus – fast eine Million Mal langsamer als Licht. Bei gleicher Frequenz ergibt das eine entsprechend kürzere Wellenlänge.',
    },
    {
      q: 'Wie rechne ich von Wellenlänge zurück zur Frequenz?',
      a: 'Durch Umstellen der Formel: f = c / λ. Bei bekannter Wellenlänge und Geschwindigkeit teilt man die Geschwindigkeit durch die Wellenlänge.',
    },
  ],
  related: ['ohmsches-gesetz-rechner', 'datenrate-umrechner', 'subnetz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { frequenz: 100, einheit: 'mhz', medium: 'licht' },
      expect: [{ label: 'Wellenlänge', value: 2.9979, tolerance: 0.001 }],
    },
    {
      values: { frequenz: 343, einheit: 'hz', medium: 'schall' },
      expect: [{ label: 'Wellenlänge', value: 1, tolerance: 0.0001 }],
    },
  ],
};
