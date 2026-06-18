import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'examensnote-rechner',
  category: 'bildung',
  title: 'Examensnote berechnen (schriftlich und muendlich gewichtet)',
  shortTitle: 'Examensnote',
  description:
    'Berechne deine Gesamt-Examensnote aus schriftlicher und muendlicher Pruefung mit frei waehlbarer Gewichtung in Prozent.',
  keywords: [
    'examensnote berechnen',
    'staatsexamen note rechner',
    'schriftlich muendlich gewichten',
    'pruefungsnote gewichtet',
    'gesamtnote pruefung',
    'examen endnote',
  ],
  intro:
    'Viele Abschluss- und Staatspruefungen setzen sich aus einem schriftlichen und einem muendlichen Teil zusammen, die unterschiedlich stark zaehlen. Das Tool gewichtet beide Teilnoten mit dem von dir gewaehlten Prozentanteil. Die genaue Aufteilung steht in der jeweiligen Pruefungsordnung – hier kannst du verschiedene Szenarien durchspielen.',
  formula: 'Gesamtnote = (schriftlich × Anteil + muendlich × (100 − Anteil)) / 100',
  inputs: [
    { type: 'number', id: 'schriftlich', label: 'Note schriftlich', default: 2.3, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'muendlich', label: 'Note muendlich', default: 1.7, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'anteilSchriftlich', label: 'Anteil schriftlich', unit: '%', default: 70, min: 0, max: 100, step: 1, help: 'Der muendliche Anteil ergibt sich aus 100 % minus diesem Wert.' },
  ],
  compute: (v) => {
    const s = num(v.schriftlich);
    const m = num(v.muendlich);
    const anteilS = Math.max(0, Math.min(100, num(v.anteilSchriftlich)));
    const anteilM = 100 - anteilS;
    const note = (s * anteilS + m * anteilM) / 100;
    const noteGerundet = Math.round(note * 100) / 100;
    let text = 'mangelhaft';
    if (noteGerundet <= 1.5) text = 'sehr gut';
    else if (noteGerundet <= 2.5) text = 'gut';
    else if (noteGerundet <= 3.5) text = 'befriedigend';
    else if (noteGerundet <= 4.5) text = 'ausreichend';
    else text = 'mangelhaft';
    return [
      { label: 'Gesamtnote', value: noteGerundet, digits: 2, primary: true },
      { label: 'Bewertung', value: text },
      { label: 'Anteil muendlich', value: anteilM, digits: 0, unit: '%' },
    ];
  },
  howto: [
    'Note des schriftlichen Teils eintragen.',
    'Note des muendlichen Teils eintragen.',
    'Prozentanteil der schriftlichen Pruefung angeben.',
    'Gewichtete Gesamtnote ablesen.',
  ],
  faq: [
    { q: 'Wie ueblich ist die 70/30-Gewichtung?', a: 'Eine staerkere Gewichtung des schriftlichen Teils ist verbreitet, aber nicht festgelegt. Maszgeblich ist die Pruefungsordnung deines Studiengangs oder deiner Ausbildung.' },
    { q: 'Kann ich auch drei Teile gewichten?', a: 'Dieses Tool kombiniert zwei Teile. Fuer mehr Teilpruefungen mit Credits oder freier Gewichtung nutze den gewichteten Notendurchschnitt.' },
    { q: 'Wird auf- oder abgerundet?', a: 'Das Tool rundet kaufmaennisch auf zwei Nachkommastellen. Ob deine Pruefungsordnung kaufmaennisch oder immer abrundet, kann abweichen.' },
  ],
  related: ['notendurchschnitt-rechner', 'bachelor-gesamtnote-rechner', 'zeugnisdurchschnitt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { schriftlich: 2, muendlich: 1, anteilSchriftlich: 50 },
      expect: [
        { label: 'Gesamtnote', value: 1.5, tolerance: 0.01 },
        { label: 'Anteil muendlich', value: 50, tolerance: 0.01 },
      ],
    },
    {
      values: { schriftlich: 2.3, muendlich: 1.7, anteilSchriftlich: 70 },
      expect: [{ label: 'Gesamtnote', value: 2.12, tolerance: 0.01 }],
    },
  ],
};
