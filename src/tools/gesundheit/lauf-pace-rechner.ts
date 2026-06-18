import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lauf-pace-rechner',
  category: 'gesundheit',
  title: 'Lauf-Pace-Rechner',
  shortTitle: 'Lauf-Pace',
  description:
    'Berechne deine Lauf-Pace in Minuten pro Kilometer sowie deine Geschwindigkeit in km/h aus zurückgelegter Strecke und Laufzeit.',
  keywords: [
    'pace rechner',
    'lauf pace berechnen',
    'min pro km rechner',
    'laufgeschwindigkeit rechner',
    'pace in km/h',
    'running pace',
  ],
  formula:
    'Pace (min/km) = Zeit(min) / Strecke(km); Geschwindigkeit (km/h) = Strecke(km) / Zeit(h)',
  inputs: [
    { type: 'number', id: 'strecke', label: 'Strecke', unit: 'km', default: 10, min: 0.01, step: 0.1 },
    { type: 'number', id: 'minuten', label: 'Laufzeit (Minutenanteil)', unit: 'min', default: 50, min: 0, step: 1, help: 'Ganze Minuten der Gesamtzeit.' },
    { type: 'number', id: 'sekunden', label: 'Laufzeit (Sekundenanteil)', unit: 's', default: 0, min: 0, max: 59, step: 1, help: 'Restliche Sekunden.' },
  ],
  compute: (v) => {
    const strecke = num(v.strecke);
    const min = num(v.minuten);
    const sek = num(v.sekunden);
    const zeitMin = min + sek / 60;
    const paceMin = strecke > 0 ? zeitMin / strecke : 0;
    const paceMinGanz = Math.floor(paceMin);
    const paceSek = Math.round((paceMin - paceMinGanz) * 60);
    const kmh = zeitMin > 0 ? strecke / (zeitMin / 60) : 0;
    return [
      { label: 'Pace', value: paceMin, unit: 'min/km', digits: 2, primary: true },
      { label: 'Pace Minuten', value: paceMinGanz, unit: 'min', digits: 0 },
      { label: 'Pace Sekunden', value: paceSek, unit: 's', digits: 0 },
      { label: 'Geschwindigkeit', value: kmh, unit: 'km/h', digits: 2 },
    ];
  },
  intro:
    'Die Pace gibt an, wie viele Minuten du für einen Kilometer benötigst – die zentrale Kennzahl im Laufsport. Dieser Rechner ermittelt sie aus deiner gelaufenen Strecke und der dafür benötigten Zeit und zeigt zusätzlich deine Durchschnittsgeschwindigkeit in Kilometern pro Stunde.',
  howto: [
    'Gelaufene Strecke in Kilometern eingeben.',
    'Laufzeit als Minuten- und Sekundenanteil eintragen.',
    'Pace in Minuten pro Kilometer und Geschwindigkeit ablesen.',
  ],
  faq: [
    { q: 'Was bedeutet eine Pace von 5:00 min/km?', a: 'Du benötigst fünf Minuten für einen Kilometer. Das entspricht einer Geschwindigkeit von 12 km/h.' },
    { q: 'Wie rechne ich Pace in km/h um?', a: 'Geschwindigkeit in km/h = 60 geteilt durch die Pace in Minuten pro Kilometer. Bei 6:00 min/km sind das 10 km/h.' },
    { q: 'Ist die Pace bei jedem Tempo konstant?', a: 'Der Rechner liefert eine Durchschnitts-Pace. Auf der Strecke schwankt das Tempo je nach Steigung, Wind und Tagesform.' },
  ],
  related: ['schritte-in-km-rechner', 'kalorien-gehen-rechner', 'vo2max-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { strecke: 10, minuten: 50, sekunden: 0 },
      expect: [
        { label: 'Pace', value: 5, tolerance: 0.01 },
        { label: 'Geschwindigkeit', value: 12, tolerance: 0.05 },
      ],
    },
    {
      values: { strecke: 5, minuten: 27, sekunden: 30 },
      expect: [
        { label: 'Pace', value: 5.5, tolerance: 0.01 },
        { label: 'Pace Sekunden', value: 30, tolerance: 0.5 },
        { label: 'Geschwindigkeit', value: 10.91, tolerance: 0.05 },
      ],
    },
  ],
};
