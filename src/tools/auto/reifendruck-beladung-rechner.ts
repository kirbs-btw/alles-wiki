import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reifendruck-beladung-rechner',
  category: 'auto',
  title: 'Reifendruck nach Beladung (Näherung)',
  shortTitle: 'Reifendruck',
  description:
    'Schätze den empfohlenen Reifendruck bei hoher Beladung als Näherung aus dem Basisdruck und der Auslastung der Zuladung.',
  keywords: [
    'reifendruck beladung berechnen',
    'reifendruck volle beladung',
    'reifendruck rechner',
    'luftdruck reifen zuladung',
    'reifendruck anhänger anhängen',
    'reifendruck erhöhen beladung',
  ],
  formula:
    'Empfohlener Druck ≈ Basisdruck + Aufschlag × (Zuladung / max. Zuladung); Näherung',
  intro:
    'Bei voller Beladung oder Anhängerbetrieb empfehlen Hersteller einen höheren Reifendruck. Dieser Rechner schätzt als Näherung, welcher Druck zwischen dem Komfortwert (geringe Beladung) und dem Volllastwert sinnvoll ist – linear anhand der aktuellen Zuladung. Maßgeblich bleibt immer die Tabelle am Türholm, im Tankdeckel oder im Handbuch deines Fahrzeugs.',
  inputs: [
    { type: 'number', id: 'basisdruck', label: 'Basisdruck (geringe Beladung)', unit: 'bar', default: 2.2, min: 1, max: 5, step: 0.1, help: 'Komfortwert laut Tabelle' },
    { type: 'number', id: 'volllastdruck', label: 'Druck bei voller Beladung', unit: 'bar', default: 2.6, min: 1, max: 5, step: 0.1, help: 'Volllastwert laut Tabelle' },
    { type: 'number', id: 'maxZuladung', label: 'Maximale Zuladung', unit: 'kg', default: 500, min: 1, step: 10, help: 'Differenz zul. Gesamt − Leergewicht' },
    { type: 'number', id: 'zuladung', label: 'Aktuelle Zuladung', unit: 'kg', default: 350, min: 0, step: 10, help: 'Personen + Gepäck' },
  ],
  compute: (v) => {
    const basis = num(v.basisdruck);
    const voll = num(v.volllastdruck);
    const maxZu = num(v.maxZuladung);
    const zu = num(v.zuladung);
    const auslastung = maxZu > 0 ? Math.min(zu / maxZu, 1) : 0;
    const aufschlag = voll - basis;
    const empfohlen = basis + aufschlag * auslastung;
    return [
      { label: 'Empfohlener Reifendruck', value: empfohlen, unit: 'bar', digits: 2, primary: true },
      { label: 'Auslastung der Zuladung', value: auslastung * 100, unit: '%', digits: 0 },
      { label: 'Aufschlag ggü. Basisdruck', value: empfohlen - basis, unit: 'bar', digits: 2 },
    ];
  },
  howto: [
    'Basisdruck (geringe Beladung) und Volllastdruck aus der Reifendruck-Tabelle des Fahrzeugs ablesen.',
    'Maximale Zuladung eintragen (zulässiges Gesamtgewicht minus Leergewicht).',
    'Aktuelle Zuladung aus Personen und Gepäck schätzen.',
    'Empfohlenen Reifendruck als Näherung ablesen – immer mit kaltem Reifen prüfen.',
  ],
  faq: [
    { q: 'Ist dieser Wert verbindlich?', a: 'Nein, es ist eine lineare Näherung zwischen Komfort- und Volllastdruck. Verbindlich sind ausschließlich die Herstellerangaben am Türholm, im Tankdeckel oder im Handbuch.' },
    { q: 'Warum höherer Druck bei Beladung?', a: 'Mehr Gewicht walkt den Reifen stärker durch. Ein höherer Druck verhindert Überhitzung, reduziert den Rollwiderstand und sorgt für stabileres Fahrverhalten.' },
    { q: 'Wann messe ich den Reifendruck?', a: 'Immer bei kaltem Reifen, also vor längerer Fahrt. Warme Reifen zeigen einen höheren Druck an, der nicht korrigiert werden sollte.' },
  ],
  related: ['zuladung-rechner', 'reifengroesse-abrollumfang-rechner', 'reifen-restprofil-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { basisdruck: 2.2, volllastdruck: 2.6, maxZuladung: 500, zuladung: 350 },
      // auslastung = 0.7 ; aufschlag = 0.4 ; empfohlen = 2.2 + 0.4*0.7 = 2.48
      expect: [{ label: 'Empfohlener Reifendruck', value: 2.48, tolerance: 0.01 }],
    },
    {
      values: { basisdruck: 2.3, volllastdruck: 2.9, maxZuladung: 600, zuladung: 600 },
      // auslastung = 1 ; empfohlen = 2.9
      expect: [{ label: 'Empfohlener Reifendruck', value: 2.9, tolerance: 0.01 }],
    },
  ],
};
