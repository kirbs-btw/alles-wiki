import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schreibzeit-rechner',
  category: 'bildung',
  title: 'Schreibzeit-Rechner: Wie lange dauert die Hausarbeit?',
  shortTitle: 'Schreibzeit',
  description:
    'Schaetze, wie lange das Schreiben einer Hausarbeit oder eines Textes dauert – aus Wortzahl, Schreibtempo und Zuschlag fuer Recherche und Korrektur.',
  keywords: [
    'schreibzeit berechnen',
    'wie lange hausarbeit schreiben',
    'woerter in stunden',
    'schreibdauer rechner',
    'wie lange dauert text schreiben',
    'schreibtempo rechner',
  ],
  intro:
    'Wie viel Zeit kostet das Schreiben? Diese Schaetzung teilt die geplante Wortzahl durch dein Schreibtempo (Woerter pro Stunde). Reines Tippen erreicht hohe Tempi, doch wissenschaftliches Schreiben mit Denken, Formulieren und Belegen liegt eher bei 150 bis 400 Woertern pro Stunde. Ein zusaetzlicher Zuschlag deckt Recherche, Ueberarbeitung und Korrektur ab. So bekommst du einen realistischen Gesamtaufwand statt nur der reinen Tippzeit.',
  formula: 'Reine Schreibzeit = Woerter / Schreibtempo; Gesamt = Schreibzeit × (1 + Zuschlag %/100)',
  inputs: [
    { type: 'number', id: 'woerter', label: 'Geplante Wortzahl', default: 4000, min: 1, step: 100 },
    { type: 'number', id: 'tempo', label: 'Schreibtempo', unit: 'Woerter/Std.', default: 300, min: 10, step: 10, help: 'Wissenschaftliches Schreiben oft 150-400.' },
    { type: 'number', id: 'zuschlag', label: 'Zuschlag fuer Recherche & Korrektur', unit: '%', default: 50, min: 0, step: 5, help: 'Aufschlag auf die reine Schreibzeit.' },
  ],
  compute: (v) => {
    const woerter = num(v.woerter);
    const tempo = num(v.tempo) > 0 ? num(v.tempo) : 300;
    const zuschlag = num(v.zuschlag);
    const reineStunden = woerter / tempo;
    const gesamtStunden = reineStunden * (1 + zuschlag / 100);
    return [
      { label: 'Gesamter Zeitaufwand', value: gesamtStunden, digits: 1, unit: 'Std.', primary: true },
      { label: 'Reine Schreibzeit', value: reineStunden, digits: 1, unit: 'Std.' },
      { label: 'Zuschlag (Recherche/Korrektur)', value: gesamtStunden - reineStunden, digits: 1, unit: 'Std.' },
      { label: 'Aufwand in Tagen (4 Std./Tag)', value: gesamtStunden / 4, digits: 1, unit: 'Tage' },
    ];
  },
  howto: [
    'Geplante Wortzahl der Arbeit eintragen.',
    'Dein realistisches Schreibtempo in Woertern pro Stunde angeben.',
    'Zuschlag fuer Recherche, Ueberarbeitung und Korrektur waehlen.',
    'Gesamtaufwand in Stunden und Arbeitstagen ablesen.',
  ],
  faq: [
    { q: 'Wie schnell schreibt man wissenschaftliche Texte?', a: 'Inklusive Denken und Formulieren liegt das Tempo meist bei 150 bis 400 Woertern pro Stunde – deutlich langsamer als reines Abtippen. Schwierige Passagen koennen noch laenger dauern.' },
    { q: 'Wie viele Woerter hat eine Seite?', a: 'Eine wissenschaftliche Textseite enthaelt grob 250 bis 350 Woerter. Eine 15-seitige Hausarbeit umfasst damit etwa 4.000 bis 5.000 Woerter.' },
    { q: 'Wofuer ist der Zuschlag?', a: 'Schreiben ist nur ein Teil der Arbeit. Recherche, Gliederung, Quellenarbeit, Ueberarbeitung und Korrektur kommen hinzu – der Zuschlag bildet diesen Mehraufwand ab.' },
    { q: 'Wie genau ist die Schaetzung?', a: 'Es ist ein Richtwert zur Planung. Dein tatsaechlicher Aufwand haengt stark von Thema, Materiallage und Routine ab. Plane lieber etwas grosszuegiger.' },
  ],
  related: ['lesezeit-rechner', 'redezeit-vortrag-rechner', 'tippgeschwindigkeit-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { woerter: 4000, tempo: 400, zuschlag: 50 },
      expect: [
        { label: 'Reine Schreibzeit', value: 10, tolerance: 0.01 },
        { label: 'Gesamter Zeitaufwand', value: 15, tolerance: 0.01 },
        { label: 'Aufwand in Tagen (4 Std./Tag)', value: 3.75, tolerance: 0.01 },
      ],
    },
  ],
};
