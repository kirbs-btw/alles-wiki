import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'zuladung-rechner',
  category: 'auto',
  title: 'Zuladung-Rechner',
  shortTitle: 'Zuladung',
  description:
    'Berechne die freie Zuladung deines Autos aus zulässigem Gesamtgewicht und Leergewicht – und prüfe, ob deine Beladung passt.',
  keywords: [
    'zuladung berechnen',
    'zuladung auto rechner',
    'maximale zuladung pkw',
    'nutzlast berechnen auto',
    'zulässiges gesamtgewicht zuladung',
    'gewicht ladung auto',
  ],
  formula:
    'Zuladung = zulässiges Gesamtgewicht - Leergewicht; freie Reserve = Zuladung - (Personen + Gepäck)',
  intro:
    'Überladung ist gefährlich und kann Bußgelder kosten. Dieser Rechner ermittelt aus zulässigem Gesamtgewicht und Leergewicht die maximale Zuladung und zeigt, wie viel nach Abzug von Insassen und Gepäck übrig bleibt.',
  inputs: [
    { type: 'number', id: 'gesamtgewicht', label: 'Zulässiges Gesamtgewicht', unit: 'kg', default: 1900, min: 0, step: 10, help: 'Fahrzeugschein Feld F.2' },
    { type: 'number', id: 'leergewicht', label: 'Leergewicht', unit: 'kg', default: 1400, min: 0, step: 10, help: 'Fahrzeugschein Feld G; oft inkl. Fahrer 75 kg' },
    { type: 'number', id: 'personen', label: 'Anzahl Mitfahrer (ohne Fahrer)', unit: '', default: 3, min: 0, step: 1 },
    { type: 'number', id: 'gewichtProPerson', label: 'Gewicht pro Mitfahrer', unit: 'kg', default: 75, min: 0, step: 5 },
    { type: 'number', id: 'gepaeck', label: 'Gepäck & Ladung', unit: 'kg', default: 100, min: 0, step: 5 },
  ],
  compute: (v) => {
    const gesamtgewicht = num(v.gesamtgewicht);
    const leergewicht = num(v.leergewicht);
    const personen = num(v.personen);
    const gewichtProPerson = num(v.gewichtProPerson);
    const gepaeck = num(v.gepaeck);
    const zuladung = gesamtgewicht - leergewicht;
    const beladung = personen * gewichtProPerson + gepaeck;
    const reserve = zuladung - beladung;
    const status = reserve >= 0 ? 'OK – nicht überladen' : 'Achtung – überladen';
    return [
      { label: 'Maximale Zuladung', value: zuladung, unit: 'kg', digits: 0, primary: true },
      { label: 'Aktuelle Beladung', value: beladung, unit: 'kg', digits: 0 },
      { label: 'Freie Reserve', value: reserve, unit: 'kg', digits: 0 },
      { label: 'Status', value: status, unit: '' },
    ];
  },
  howto: [
    'Zulässiges Gesamtgewicht aus dem Fahrzeugschein (Feld F.2) eintragen.',
    'Leergewicht erfassen (Feld G; beachte, dass dort oft 75 kg Fahrer enthalten sind).',
    'Mitfahrer und durchschnittliches Gewicht angeben.',
    'Gepäck ergänzen und freie Reserve prüfen.',
  ],
  faq: [
    { q: 'Ist der Fahrer im Leergewicht enthalten?', a: 'Beim EU-Leergewicht (DIN-Leergewicht) sind 75 kg für den Fahrer und ein voller Tank bereits berücksichtigt. Trage die Mitfahrer dann ohne Fahrer ein.' },
    { q: 'Was kostet Überladung?', a: 'Je nach Grad der Überladung drohen Bußgelder und Weiterfahrtverbote. Zudem leiden Bremsweg, Reifen und Fahrstabilität – daher immer im zulässigen Bereich bleiben.' },
    { q: 'Zählt die Anhängerstützlast zur Zuladung?', a: 'Ja, die Stützlast eines Anhängers belastet die Hinterachse und reduziert die verfügbare Zuladung. Plane sie bei Gespannbetrieb mit ein.' },
  ],
  related: ['stuetzlast-anhaengelast-rechner', 'leistungsgewicht-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { gesamtgewicht: 1900, leergewicht: 1400, personen: 3, gewichtProPerson: 75, gepaeck: 100 },
      // zuladung = 500 ; beladung = 3*75+100 = 325 ; reserve = 175
      expect: [{ label: 'Maximale Zuladung', value: 500, tolerance: 0.5 }],
    },
    {
      values: { gesamtgewicht: 2200, leergewicht: 1500, personen: 4, gewichtProPerson: 80, gepaeck: 200 },
      // zuladung = 700 ; beladung = 320+200 = 520 ; reserve = 180
      expect: [{ label: 'Freie Reserve', value: 180, tolerance: 0.5 }],
    },
  ],
};
