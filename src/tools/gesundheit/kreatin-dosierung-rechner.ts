import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kreatin-dosierung-rechner',
  category: 'gesundheit',
  title: 'Kreatin-Dosierung-Rechner',
  shortTitle: 'Kreatin-Dosis',
  description:
    'Berechne deine Kreatin-Monohydrat-Dosierung nach Körpergewicht – Ladephase, Erhaltungsdosis und wie lange eine Packung reicht.',
  keywords: [
    'kreatin dosierung rechner',
    'kreatin monohydrat dosierung',
    'wie viel kreatin am tag',
    'kreatin ladephase',
    'kreatin erhaltungsdosis',
    'kreatin pro kg körpergewicht',
  ],
  formula: 'Ladephase ≈ 0,3 g/kg/Tag (geteilt), Erhaltung ≈ 0,03 g/kg/Tag (mind. 3 g)',
  inputs: [
    { type: 'number', id: 'gewicht', label: 'Körpergewicht', unit: 'kg', default: 80, min: 1, step: 0.5 },
    { type: 'number', id: 'packung', label: 'Packungsgröße', unit: 'g', default: 500, min: 1, step: 50, help: 'Für die Reichweite bei Erhaltungsdosis.' },
  ],
  compute: (v) => {
    const kg = num(v.gewicht);
    const packung = num(v.packung);
    // Ladephase: ~0,3 g/kg/Tag über 5-7 Tage; Erhaltung: ~0,03 g/kg/Tag, mind. 3 g
    const ladephase = kg * 0.3;
    const erhaltung = Math.max(kg * 0.03, 3);
    const reichweite = erhaltung > 0 ? packung / erhaltung : 0;
    return [
      { label: 'Erhaltungsdosis', value: erhaltung, unit: 'g/Tag', digits: 1, primary: true },
      { label: 'Ladephase (5–7 Tage)', value: ladephase, unit: 'g/Tag', digits: 1, help: 'Auf 3–4 Portionen verteilen.' },
      { label: 'Packung reicht für', value: reichweite, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Kreatin-Monohydrat ist eines der am besten untersuchten Supplemente im Kraft- und Schnellkraftsport. Üblich ist eine dauerhafte Erhaltungsdosis von etwa 3 bis 5 Gramm pro Tag (rund 0,03 g pro kg Körpergewicht). Wer die Muskelspeicher schneller füllen möchte, kann eine Ladephase von etwa 0,3 g pro kg pro Tag über 5 bis 7 Tage einlegen, verteilt auf mehrere Portionen. Die Ladephase ist optional. Dies ist eine allgemeine Orientierung (Stand 2026) und ersetzt keine individuelle Beratung.',
  howto: [
    'Körpergewicht in Kilogramm eingeben.',
    'Packungsgröße eintragen, um die Reichweite zu sehen.',
    'Erhaltungsdosis und optionale Ladephasen-Dosis ablesen.',
  ],
  faq: [
    { q: 'Wie viel Kreatin pro Tag ist sinnvoll?', a: 'Eine tägliche Erhaltungsdosis von etwa 3 bis 5 g (rund 0,03 g pro kg Körpergewicht) gilt als Standard und füllt die Muskelspeicher über einige Wochen auf.' },
    { q: 'Brauche ich eine Ladephase?', a: 'Nein, sie ist optional. Mit etwa 0,3 g pro kg pro Tag über 5 bis 7 Tage sind die Speicher schneller gefüllt. Ohne Ladephase wird derselbe Speicherstand mit der Erhaltungsdosis nur etwas langsamer erreicht.' },
    { q: 'Wann sollte ich Kreatin einnehmen?', a: 'Der Zeitpunkt ist zweitrangig – entscheidend ist die regelmäßige tägliche Einnahme. Viele nehmen es zusammen mit einer kohlenhydrathaltigen Mahlzeit oder nach dem Training.' },
    { q: 'Ist Kreatin sicher?', a: 'Für gesunde Erwachsene gilt Kreatin-Monohydrat in den üblichen Dosierungen als gut verträglich. Bei Vorerkrankungen, insbesondere der Nieren, sollte die Einnahme ärztlich abgesprochen werden.' },
  ],
  related: ['eiweissbedarf-rechner', 'ffmi-rechner', 'wasserbedarf-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { gewicht: 80, packung: 500 },
      expect: [
        { label: 'Erhaltungsdosis', value: 3, tolerance: 0.05 },
        { label: 'Ladephase (5–7 Tage)', value: 24, tolerance: 0.1 },
      ],
    },
    {
      values: { gewicht: 120, packung: 500 },
      expect: [
        { label: 'Erhaltungsdosis', value: 3.6, tolerance: 0.05 },
        { label: 'Ladephase (5–7 Tage)', value: 36, tolerance: 0.1 },
      ],
    },
  ],
};
