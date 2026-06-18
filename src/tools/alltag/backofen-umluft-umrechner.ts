import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'backofen-umluft-umrechner',
  category: 'alltag',
  title: 'Backofen: Umluft zu Ober-/Unterhitze umrechnen',
  shortTitle: 'Umluft/Ober-Unterhitze',
  description:
    'Rechne Backtemperaturen zwischen Umluft und Ober-/Unterhitze um. Umluft heizt effektiver – als Faustregel liegen die Temperaturen rund 20 °C auseinander.',
  keywords: [
    'umluft ober unterhitze umrechnen',
    'backofen temperatur umrechnen',
    'umluft in oberhitze',
    'backofen umluft tabelle',
    'temperatur backen umrechnen',
    'heissluft umrechnen',
  ],
  formula:
    'Umluft → Ober/Unterhitze: T + 20 °C; Ober/Unterhitze → Umluft: T − 20 °C',
  inputs: [
    {
      type: 'number',
      id: 'temperatur',
      label: 'Temperatur im Rezept',
      unit: '°C',
      default: 180,
      min: 50,
      max: 300,
      step: 5,
    },
    {
      type: 'select',
      id: 'richtung',
      label: 'Umrechnungsrichtung',
      default: 'umluft_zu_ouh',
      options: [
        { value: 'umluft_zu_ouh', label: 'Umluft → Ober-/Unterhitze' },
        { value: 'ouh_zu_umluft', label: 'Ober-/Unterhitze → Umluft' },
      ],
    },
    {
      type: 'number',
      id: 'differenz',
      label: 'Temperaturdifferenz',
      unit: '°C',
      default: 20,
      min: 0,
      max: 40,
      step: 5,
      help: 'Übliche Faustregel: 20 °C. Manche Öfen brauchen nur 15 °C.',
    },
  ],
  compute: (v) => {
    const t = num(v.temperatur, 180);
    const richtung = String(v.richtung || 'umluft_zu_ouh');
    const diff = num(v.differenz, 20);
    let ergebnis: number;
    let zielLabel: string;
    if (richtung === 'umluft_zu_ouh') {
      ergebnis = t + diff;
      zielLabel = 'Ober-/Unterhitze';
    } else {
      ergebnis = t - diff;
      zielLabel = 'Umluft';
    }
    return [
      { label: 'Umgerechnete Temperatur', value: ergebnis, unit: '°C', digits: 0, primary: true, help: `entspricht ${zielLabel}` },
      { label: 'Eingabetemperatur', value: t, unit: '°C', digits: 0 },
      { label: 'Differenz', value: diff, unit: '°C', digits: 0 },
    ];
  },
  intro:
    'Umluft verteilt die heiße Luft gleichmäßig im Garraum und gart dadurch effektiver als Ober-/Unterhitze. Als gängige Faustregel reduziert man bei Umluft die Temperatur um etwa 20 °C gegenüber Ober-/Unterhitze – oder erhöht sie umgekehrt. Dieser Rechner setzt die Faustregel um; die ideale Differenz hängt vom Ofen und Gericht ab.',
  howto: [
    'Gib die im Rezept angegebene Temperatur ein.',
    'Wähle, in welche Richtung umgerechnet werden soll.',
    'Passe bei Bedarf die Temperaturdifferenz an (Standard: 20 °C).',
    'Lies die umgerechnete Backtemperatur ab.',
  ],
  faq: [
    { q: 'Warum ist Umluft kühler eingestellt?', a: 'Der Ventilator verteilt die Wärme gleichmäßig und intensiver. Deshalb genügt bei Umluft eine um rund 20 °C niedrigere Temperatur für dasselbe Backergebnis.' },
    { q: 'Gilt die 20-Grad-Regel immer?', a: 'Es ist eine Faustregel. Je nach Ofen und Gebäck können 15 bis 25 °C sinnvoll sein. Beobachte beim ersten Mal das Ergebnis.' },
    { q: 'Verkürzt Umluft auch die Backzeit?', a: 'Oft etwas. Da Umluft gleichmäßiger heizt, sind Gerichte gelegentlich ein paar Minuten früher fertig – ein Blick durch die Scheibe hilft.' },
  ],
  related: ['fahrenheit-celsius-rechner', 'rezept-portionen-rechner', 'pizzateig-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { temperatur: 180, richtung: 'umluft_zu_ouh', differenz: 20 },
      expect: [
        { label: 'Umgerechnete Temperatur', value: 200, tolerance: 0.5 },
      ],
    },
    {
      values: { temperatur: 200, richtung: 'ouh_zu_umluft', differenz: 20 },
      expect: [
        { label: 'Umgerechnete Temperatur', value: 180, tolerance: 0.5 },
      ],
    },
  ],
};
