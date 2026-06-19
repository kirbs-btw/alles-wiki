import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'winter-reichweite-rechner',
  category: 'auto',
  title: 'Winter-Reichweite-Rechner (E-Auto)',
  shortTitle: 'Winter-Reichweite',
  description:
    'Schätze den Reichweitenverlust deines E-Autos im Winter aus Sommerreichweite und prozentualem Verlust durch Kälte und Heizung.',
  keywords: [
    'reichweitenverlust e auto winter',
    'winter reichweite elektroauto',
    'e auto reichweite kälte',
    'reichweite winter berechnen',
    'elektroauto winter verlust',
  ],
  formula:
    'Winterreichweite = Sommerreichweite × (1 − Verlust/100)',
  intro:
    'Im Winter sinkt die Reichweite von Elektroautos spürbar: Die Batterie arbeitet bei Kälte weniger effizient und die Heizung verbraucht zusätzlich Energie. Je nach Temperatur und Fahrprofil sind Einbußen von 10–35 % realistisch. Dieser Rechner schätzt die verbleibende Winterreichweite.',
  inputs: [
    { type: 'number', id: 'sommer', label: 'Reichweite im Sommer', unit: 'km', default: 400, min: 0, step: 5, help: 'Realistische Reichweite bei mildem Wetter.' },
    {
      type: 'select', id: 'szenario', label: 'Witterung', default: 'kalt',
      options: [
        { value: 'mild', label: 'Mild (ca. 5–10 °C): −10 %' },
        { value: 'kalt', label: 'Kalt (ca. 0 °C): −20 %' },
        { value: 'frost', label: 'Frost (ca. −10 °C): −30 %' },
        { value: 'manuell', label: 'Eigener Wert' },
      ],
      help: 'Richtwerte – wähle „Eigener Wert" für eine individuelle Schätzung.',
    },
    { type: 'number', id: 'verlust', label: 'Verlust (eigener Wert)', unit: '%', default: 20, min: 0, max: 80, step: 1, help: 'Wird nur bei „Eigener Wert" verwendet.' },
  ],
  compute: (v) => {
    const sommer = num(v.sommer);
    const szenario = String(v.szenario || 'kalt');
    const preset: Record<string, number> = { mild: 10, kalt: 20, frost: 30 };
    const verlustProzent = szenario === 'manuell' ? num(v.verlust) : preset[szenario] ?? 20;
    const winter = sommer * (1 - verlustProzent / 100);
    const differenz = sommer - winter;
    return [
      { label: 'Winterreichweite', value: winter, unit: 'km', digits: 0, primary: true },
      { label: 'Reichweitenverlust', value: differenz, unit: 'km', digits: 0 },
      { label: 'Angesetzter Verlust', value: verlustProzent, unit: '%', digits: 0 },
    ];
  },
  howto: [
    'Realistische Sommerreichweite deines E-Autos eintragen.',
    'Witterungsszenario wählen oder „Eigener Wert" für eine individuelle Schätzung.',
    'Bei eigenem Wert den erwarteten prozentualen Verlust angeben.',
    'Verbleibende Winterreichweite ablesen.',
  ],
  faq: [
    { q: 'Warum verliert das E-Auto im Winter Reichweite?', a: 'Zwei Effekte überlagern sich: Bei Kälte sinkt die nutzbare Batteriekapazität und der Innenwiderstand steigt. Zusätzlich braucht die Innenraumheizung viel Energie, da kein Abwärmemotor wie beim Verbrenner vorhanden ist.' },
    { q: 'Wie kann ich den Verlust verringern?', a: 'Vorheizen während des Ladens (Vorklimatisierung am Netz), Wärmepumpe nutzen, Sitz- und Lenkradheizung statt Gebläse, moderate Geschwindigkeit und gut aufgewärmte Batterie senken den Mehrverbrauch deutlich.' },
    { q: 'Sind die Prozentwerte allgemeingültig?', a: 'Es sind Orientierungswerte. Der tatsächliche Verlust hängt von Fahrzeug, Wärmepumpe, Streckenprofil (Stadt verliert mehr) und Außentemperatur ab und kann abweichen.' },
  ],
  related: ['reichweite-rechner', 'e-auto-ladekosten-rechner', 'e-auto-ladezeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { sommer: 400, szenario: 'kalt', verlust: 20 },
      // 400*(1-0,20) = 320
      expect: [
        { label: 'Winterreichweite', value: 320, tolerance: 0 },
        { label: 'Reichweitenverlust', value: 80, tolerance: 0 },
      ],
    },
    {
      values: { sommer: 500, szenario: 'manuell', verlust: 35 },
      // 500*(1-0,35) = 325
      expect: [{ label: 'Winterreichweite', value: 325, tolerance: 0 }],
    },
  ],
};
