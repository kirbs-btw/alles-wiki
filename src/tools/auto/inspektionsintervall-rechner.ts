import type { Tool } from '../../lib/types';
import { num, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'inspektionsintervall-rechner',
  category: 'auto',
  title: 'Inspektionsintervall-Rechner',
  shortTitle: 'Inspektion',
  description:
    'Berechne, wann die nächste Auto-Inspektion fällig ist – ob zuerst die Kilometergrenze oder das Zeitintervall erreicht wird.',
  keywords: [
    'inspektionsintervall berechnen',
    'nächste inspektion auto rechner',
    'wartungsintervall km zeit',
    'wann inspektion fällig',
    'inspektion km oder zeit',
  ],
  formula:
    'Km bis Inspektion = Km-Intervall − seit letzter Inspektion; Zeit bis Inspektion = Zeitintervall − vergangene Zeit. Maßgeblich ist, was zuerst eintritt.',
  intro:
    'Hersteller geben für die Inspektion meist zwei Grenzen vor: eine Kilometerlaufleistung und ein Zeitintervall. Fällig ist die Wartung, sobald der erste Wert erreicht ist. Dieser Rechner zeigt anhand deiner Fahrleistung, ob zuerst die Kilometer oder die Zeit greifen, und schätzt das voraussichtliche Datum.',
  inputs: [
    { type: 'date', id: 'letzte', label: 'Datum der letzten Inspektion', default: '2025-06-19' },
    { type: 'date', id: 'heute', label: 'Heutiges Datum', default: '2026-06-19', today: true, help: 'Standard: heute.' },
    { type: 'number', id: 'kmAktuell', label: 'Aktueller Kilometerstand', unit: 'km', default: 30000, min: 0, step: 100 },
    { type: 'number', id: 'kmLetzte', label: 'Km-Stand bei letzter Inspektion', unit: 'km', default: 15000, min: 0, step: 100 },
    { type: 'number', id: 'kmIntervall', label: 'Km-Intervall', unit: 'km', default: 30000, min: 1, step: 1000, help: 'Laut Serviceplan, z. B. 15.000 oder 30.000 km.' },
    { type: 'number', id: 'zeitIntervall', label: 'Zeit-Intervall', unit: 'Monate', default: 12, min: 1, step: 1, help: 'Meist 12 oder 24 Monate.' },
  ],
  compute: (v) => {
    const letzte = String(v.letzte);
    const heute = String(v.heute);
    const kmAktuell = num(v.kmAktuell);
    const kmLetzte = num(v.kmLetzte);
    const kmIntervall = num(v.kmIntervall);
    const zeitIntervall = num(v.zeitIntervall);

    const gefahren = Math.max(0, kmAktuell - kmLetzte);
    const kmBis = kmIntervall - gefahren;

    const vergangeneTage = Math.max(0, daysBetween(letzte, heute));
    const zeitIntervallTage = (zeitIntervall * 365.25) / 12;
    const tageBis = zeitIntervallTage - vergangeneTage;

    // km/Tag aus bisheriger Nutzung; bei zu wenig Tagen Fallback auf grobe 41 km/Tag (~15.000/Jahr)
    const kmProTag = vergangeneTage >= 1 ? gefahren / vergangeneTage : 0;
    const tageBisKmGrenze = kmProTag > 0 ? kmBis / kmProTag : Infinity;

    const limitiertDurchKm = tageBisKmGrenze <= tageBis;
    const tageBisFaellig = Math.max(0, Math.min(tageBisKmGrenze, tageBis));

    return [
      {
        label: 'Maßgebliches Limit',
        value: limitiertDurchKm ? 'Kilometerstand' : 'Zeit',
        primary: true,
      },
      { label: 'Tage bis Inspektion', value: Number.isFinite(tageBisFaellig) ? tageBisFaellig : 0, unit: 'Tage', digits: 0 },
      { label: 'Kilometer bis Inspektion', value: kmBis, unit: 'km', digits: 0 },
      { label: 'Monate bis Zeitlimit', value: tageBis / (365.25 / 12), unit: 'Monate', digits: 1 },
    ];
  },
  howto: [
    'Datum und Kilometerstand der letzten Inspektion eintragen.',
    'Aktuelles Datum und aktuellen Kilometerstand angeben.',
    'Km- und Zeit-Intervall aus dem Serviceplan deines Fahrzeugs übernehmen.',
    'Ablesen, ob zuerst die Kilometer- oder die Zeitgrenze erreicht wird.',
  ],
  faq: [
    { q: 'Was gilt: Kilometer oder Zeit?', a: 'Maßgeblich ist immer, was zuerst eintritt. Wer wenig fährt, erreicht meist die Zeitgrenze (z. B. 12 Monate) zuerst; Vielfahrer die Kilometergrenze.' },
    { q: 'Was ist mit Longlife-/flexiblen Intervallen?', a: 'Viele moderne Autos berechnen das Intervall variabel über einen Sensor (Ölqualität, Fahrprofil). Dieser Rechner bildet feste Intervalle ab – orientiere dich sonst an der Serviceanzeige im Bordcomputer.' },
    { q: 'Ist die Inspektion das Gleiche wie die HU/TÜV?', a: 'Nein. Die Inspektion ist die herstellerseitige Wartung. Die Hauptuntersuchung (HU/TÜV) ist eine gesetzlich vorgeschriebene Prüfung, meist alle zwei Jahre, und davon unabhängig.' },
  ],
  related: ['reifen-restprofil-rechner', 'auto-gesamtkosten-rechner', 'wertverlust-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: {
        letzte: '2025-06-19', heute: '2026-06-19',
        kmAktuell: 30000, kmLetzte: 15000, kmIntervall: 30000, zeitIntervall: 12,
      },
      // gefahren = 15000, kmBis = 15000; vergangene Tage = 365; Zeitintervall = 365,25 Tage
      // -> Monate bis Zeitlimit = (365,25-365)/30,4375 = 0,00821... ≈ 0,0
      expect: [{ label: 'Monate bis Zeitlimit', value: 0, tolerance: 0.05 }],
    },
    {
      values: {
        letzte: '2025-06-19', heute: '2026-06-19',
        kmAktuell: 25000, kmLetzte: 15000, kmIntervall: 30000, zeitIntervall: 24,
      },
      // gefahren = 10000, kmBis = 20000
      expect: [{ label: 'Kilometer bis Inspektion', value: 20000, tolerance: 0 }],
    },
  ],
};
