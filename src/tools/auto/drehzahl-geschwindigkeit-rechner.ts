import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'drehzahl-geschwindigkeit-rechner',
  category: 'auto',
  title: 'Drehzahl-Geschwindigkeit-Rechner',
  shortTitle: 'Drehzahl & Tempo',
  description:
    'Berechne die Geschwindigkeit aus Motordrehzahl, Reifenumfang sowie Getriebe- und Achsübersetzung – oder umgekehrt die Drehzahl.',
  keywords: [
    'drehzahl geschwindigkeit berechnen',
    'drehzahl tempo rechner',
    'geschwindigkeit aus drehzahl',
    'übersetzung geschwindigkeit auto',
    'motordrehzahl rechner',
    'rpm geschwindigkeit',
  ],
  formula:
    'v (km/h) = (Drehzahl × Reifenumfang in m × 60) / (Getriebe × Achse × 1000)',
  intro:
    'Aus Motordrehzahl, Reifenabrollumfang und Gesamtübersetzung (Getriebe × Achsantrieb) lässt sich die theoretische Geschwindigkeit berechnen. Das hilft, Tempo im jeweiligen Gang oder die Drehzahl bei Reisetempo abzuschätzen (ohne Schlupf).',
  inputs: [
    { type: 'number', id: 'drehzahl', label: 'Motordrehzahl', unit: 'U/min', default: 2500, min: 0, step: 50 },
    { type: 'number', id: 'umfang', label: 'Reifenabrollumfang', unit: 'm', default: 1.95, min: 0.1, step: 0.01, help: 'Typisch 1,8 bis 2,1 m' },
    { type: 'number', id: 'getriebe', label: 'Getriebeübersetzung (Gang)', unit: '', default: 0.85, min: 0.1, step: 0.01 },
    { type: 'number', id: 'achse', label: 'Achsübersetzung', unit: '', default: 3.5, min: 0.1, step: 0.01 },
  ],
  compute: (v) => {
    const drehzahl = num(v.drehzahl);
    const umfang = num(v.umfang);
    const getriebe = num(v.getriebe);
    const achse = num(v.achse);
    const gesamt = getriebe * achse;
    // Radumdrehungen pro Minute = Motordrehzahl / Gesamtübersetzung
    const radDrehzahl = gesamt > 0 ? drehzahl / gesamt : 0;
    const meterProMin = radDrehzahl * umfang;
    const kmh = (meterProMin * 60) / 1000;
    return [
      { label: 'Geschwindigkeit', value: kmh, unit: 'km/h', digits: 1, primary: true },
      { label: 'Radumdrehungen', value: radDrehzahl, unit: 'U/min', digits: 0 },
      { label: 'Gesamtübersetzung', value: gesamt, unit: '', digits: 3 },
      { label: 'Tempo pro 1000 U/min', value: gesamt > 0 ? (1000 / gesamt) * umfang * 60 / 1000 : 0, unit: 'km/h', digits: 1 },
    ];
  },
  howto: [
    'Motordrehzahl in U/min eintragen.',
    'Reifenabrollumfang in Metern erfassen (siehe Reifengrößen-Rechner).',
    'Getriebeübersetzung des gewünschten Gangs und Achsübersetzung eintragen.',
    'Theoretische Geschwindigkeit ablesen.',
  ],
  faq: [
    { q: 'Woher bekomme ich die Übersetzungen?', a: 'Getriebe- und Achsübersetzungen stehen in der technischen Dokumentation des Fahrzeugs oder im Datenblatt. Im höchsten Gang liegt die Getriebeübersetzung oft unter 1,0 (Overdrive).' },
    { q: 'Warum weicht der Wert vom Tacho ab?', a: 'Der Rechner ignoriert den Reifenschlupf und Tacho-Voreilung. Tachos zeigen aus Sicherheitsgründen meist etwas mehr an als die tatsächliche Geschwindigkeit.' },
    { q: 'Wie finde ich den Reifenabrollumfang?', a: 'Diesen berechnest du aus der Reifengröße. Der Reifengrößen-Rechner ermittelt den Abrollumfang aus Breite, Querschnitt und Felgendurchmesser.' },
  ],
  related: ['reifengroesse-abrollumfang-rechner', 'leistungsgewicht-rechner', 'ueberholweg-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { drehzahl: 2500, umfang: 1.95, getriebe: 0.85, achse: 3.5 },
      // gesamt = 2.975 ; radDrehzahl = 2500/2.975 = 840.336 ; m/min = 840.336*1.95 = 1638.655 ; km/h = *60/1000 = 98.32
      expect: [{ label: 'Geschwindigkeit', value: 98.3, tolerance: 0.5 }],
    },
    {
      values: { drehzahl: 3000, umfang: 2.0, getriebe: 1.0, achse: 4.0 },
      // gesamt = 4 ; radDrehzahl = 750 ; m/min = 1500 ; km/h = 90
      expect: [{ label: 'Geschwindigkeit', value: 90, tolerance: 0.5 }],
    },
  ],
};
