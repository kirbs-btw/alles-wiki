import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'werkstudent-stunden-rechner',
  category: 'beruf',
  title: 'Werkstudent-Stunden-Rechner (20-Stunden-Grenze)',
  shortTitle: 'Werkstudent-Stunden',
  description:
    'Prüfe die 20-Stunden-Grenze als Werkstudent: Wie viel verdienst du pro Monat und wie viel Puffer bleibt bis zur Wochengrenze während der Vorlesungszeit?',
  keywords: [
    'werkstudent stunden rechner',
    '20 stunden grenze werkstudent',
    'werkstudent verdienst rechner',
    'werkstudent wochenstunden',
    'werkstudentenprivileg stunden',
    'wie viel darf werkstudent arbeiten',
  ],
  formula:
    'Monatsverdienst = Stundenlohn × Wochenstunden × (52 ÷ 12) ; Puffer = 20 − Wochenstunden',
  inputs: [
    { type: 'number', id: 'wochenstunden', label: 'Wochenstunden (Vorlesungszeit)', unit: 'h', default: 18, min: 0, max: 40, step: 1, help: 'In der Vorlesungszeit gilt das Werkstudentenprivileg nur bis 20 h/Woche.' },
    { type: 'number', id: 'stundenlohn', label: 'Stundenlohn (brutto)', unit: '€', default: 16, min: 0.01, step: 0.5, help: 'Mindestens der gesetzliche Mindestlohn (Stand 2026: 13,90 €/h).' },
    { type: 'number', id: 'grenze', label: 'Wochenstunden-Grenze', unit: 'h', default: 20, min: 1, max: 40, step: 1, help: 'Werkstudentenprivileg in der Vorlesungszeit: i. d. R. 20 h/Woche.' },
  ],
  compute: (v) => {
    const wochenstunden = num(v.wochenstunden);
    const stundenlohn = num(v.stundenlohn);
    const grenze = num(v.grenze);

    const wochenProMonat = 52 / 12;
    const monatsverdienst = stundenlohn * wochenstunden * wochenProMonat;
    const jahresverdienst = stundenlohn * wochenstunden * 52;
    const puffer = grenze - wochenstunden;

    return [
      { label: 'Monatsverdienst (Schnitt)', value: monatsverdienst, unit: '€', digits: 2, primary: true, help: 'Durchschnitt über das Jahr (52 Wochen ÷ 12 Monate).' },
      { label: 'Puffer bis zur Grenze', value: puffer, unit: 'h/Woche', digits: 1, help: 'Negativ bedeutet: Grenze überschritten – Werkstudentenstatus gefährdet.' },
      { label: 'Jahresverdienst (Schnitt)', value: jahresverdienst, unit: '€', digits: 2 },
      { label: 'Auslastung der Grenze', value: grenze > 0 ? (wochenstunden / grenze) * 100 : 0, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Als Werkstudent bist du von der Renten-, Kranken- und Pflegeversicherung über die Werkstudentenregelung befreit – solange du in der Vorlesungszeit höchstens 20 Stunden pro Woche arbeitest. Dieser Rechner zeigt deinen durchschnittlichen Verdienst und wie viel Spielraum bis zur 20-Stunden-Grenze bleibt. In den Semesterferien darf auch mehr gearbeitet werden.',
  howto: [
    'Trage deine wöchentliche Arbeitszeit in der Vorlesungszeit ein.',
    'Gib deinen Brutto-Stundenlohn an.',
    'Belasse die Grenze bei 20 h oder passe sie an deinen Vertrag an.',
    'Lies Monatsverdienst und den verbleibenden Puffer ab.',
  ],
  faq: [
    { q: 'Was besagt die 20-Stunden-Grenze?', a: 'Wer als eingeschriebener Student in der Vorlesungszeit höchstens 20 Stunden pro Woche arbeitet, bleibt versicherungsfrei in der Kranken-, Pflege- und Arbeitslosenversicherung (Werkstudentenprivileg). Nur Rentenbeiträge fallen an.' },
    { q: 'Gilt die Grenze auch in den Semesterferien?', a: 'Nein. In den vorlesungsfreien Zeiten darf auch mehr als 20 Stunden gearbeitet werden, ohne den Werkstudentenstatus zu verlieren – solange das Studium die Hauptsache bleibt.' },
    { q: 'Was passiert bei dauerhaftem Überschreiten?', a: 'Wer regelmäßig mehr als 20 Stunden in der Vorlesungszeit arbeitet, verliert das Privileg und wird voll sozialversicherungspflichtig wie ein normaler Arbeitnehmer.' },
    { q: 'Warum wird mit 52 ÷ 12 gerechnet?', a: 'Ein Monat hat im Schnitt rund 4,33 Wochen (52 Wochen ÷ 12 Monate). So ergibt sich aus dem Wochenverdienst ein realistischer Monatsdurchschnitt.' },
  ],
  related: ['minijob-stunden-rechner', 'stundenlohn-rechner', 'midijob-uebergangsbereich-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { wochenstunden: 18, stundenlohn: 16, grenze: 20 },
      expect: [
        { label: 'Puffer bis zur Grenze', value: 2, tolerance: 0.01 },
        { label: 'Monatsverdienst (Schnitt)', value: 1248, tolerance: 0.01 },
        { label: 'Jahresverdienst (Schnitt)', value: 14976, tolerance: 0.01 },
      ],
    },
  ],
};
