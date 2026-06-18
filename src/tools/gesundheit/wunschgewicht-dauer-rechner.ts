import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wunschgewicht-dauer-rechner',
  category: 'gesundheit',
  title: 'Wunschgewicht-Dauer-Rechner',
  shortTitle: 'Wunschgewicht',
  description:
    'Berechne, wie lange du brauchst, um dein Wunschgewicht zu erreichen – aus aktuellem Gewicht, Zielgewicht und täglichem Kaloriendefizit.',
  keywords: [
    'wunschgewicht rechner',
    'wie lange abnehmen',
    'abnehm dauer berechnen',
    'zielgewicht rechner',
    'wann erreiche ich mein wunschgewicht',
    'abnehmen dauer',
  ],
  formula:
    'zu verlieren = aktuell − Ziel; kcal gesamt = zu verlieren × 7000; Tage = kcal gesamt / Defizit/Tag',
  inputs: [
    { type: 'number', id: 'aktuell', label: 'Aktuelles Gewicht', unit: 'kg', default: 85, min: 1, step: 0.1 },
    { type: 'number', id: 'ziel', label: 'Wunschgewicht', unit: 'kg', default: 75, min: 1, step: 0.1 },
    { type: 'number', id: 'defizit', label: 'Tägliches Kaloriendefizit', unit: 'kcal/Tag', default: 500, min: 1, step: 10, help: 'Empfehlung: 300–600 kcal pro Tag.' },
  ],
  compute: (v) => {
    const aktuell = num(v.aktuell);
    const ziel = num(v.ziel);
    const defizit = num(v.defizit);
    const verlust = aktuell - ziel;
    const gesamtKcal = verlust * 7000;
    const tage = defizit > 0 ? gesamtKcal / defizit : 0;
    const wochen = tage / 7;
    const monate = tage / 30.44;
    return [
      { label: 'Dauer in Tagen', value: tage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Dauer in Wochen', value: wochen, unit: 'Wochen', digits: 1 },
      { label: 'Dauer in Monaten', value: monate, unit: 'Monate', digits: 1 },
      { label: 'Zu verlierendes Gewicht', value: verlust, unit: 'kg', digits: 1 },
    ];
  },
  intro:
    'Dieser Rechner schätzt, wie lange es bei einem gleichbleibenden täglichen Kaloriendefizit dauert, bis du dein Wunschgewicht erreichst. Grundlage ist der Richtwert, dass etwa 7000 kcal einem Kilogramm Körperfett entsprechen. Es handelt sich um eine Orientierung; in der Praxis verändert sich der Bedarf mit sinkendem Gewicht, sodass die Abnahme später langsamer verläuft.',
  howto: [
    'Aktuelles Gewicht in Kilogramm eingeben.',
    'Dein Wunschgewicht eintragen.',
    'Geplantes tägliches Kaloriendefizit angeben.',
    'Voraussichtliche Dauer in Tagen, Wochen und Monaten ablesen.',
  ],
  faq: [
    { q: 'Ist eine schnelle Abnahme gesund?', a: 'Empfohlen wird meist ein Verlust von etwa 0,5 bis 1 Kilogramm pro Woche. Schnellere Abnahmen erhöhen das Risiko für Muskelverlust und Jojo-Effekt.' },
    { q: 'Warum stimmt die Dauer nicht exakt?', a: 'Mit sinkendem Körpergewicht sinkt auch der Kalorienbedarf. Dadurch wird das tatsächliche Defizit kleiner und die Abnahme verlangsamt sich gegen Ende.' },
    { q: 'Was, wenn ich Muskeln aufbauen will?', a: 'Dann ist das Körpergewicht allein wenig aussagekräftig. Bei gleichzeitigem Muskelaufbau kann die Waage trotz Fettabbau stagnieren oder steigen.' },
  ],
  related: ['kaloriendefizit-rechner', 'kalorienbedarf-rechner', 'bmi-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { aktuell: 85, ziel: 75, defizit: 500 },
      expect: [
        { label: 'Dauer in Tagen', value: 140, tolerance: 0.5 },
        { label: 'Dauer in Wochen', value: 20, tolerance: 0.1 },
      ],
    },
    {
      values: { aktuell: 80, ziel: 72, defizit: 400 },
      expect: [
        { label: 'Zu verlierendes Gewicht', value: 8, tolerance: 0.1 },
        { label: 'Dauer in Tagen', value: 140, tolerance: 0.5 },
      ],
    },
  ],
};
