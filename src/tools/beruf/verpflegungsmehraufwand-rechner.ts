import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verpflegungsmehraufwand-rechner',
  category: 'beruf',
  title: 'Verpflegungsmehraufwand Rechner (Inland)',
  shortTitle: 'Verpflegungsmehraufwand',
  description:
    'Berechne deine Verpflegungspauschalen bei Dienstreisen im Inland: 14 € für An-/Abreise und Tage über 8 Stunden, 28 € für volle 24-Stunden-Tage.',
  keywords: [
    'verpflegungsmehraufwand rechner',
    'verpflegungspauschale berechnen',
    'spesen dienstreise inland',
    'tagespauschale dienstreise',
    'verpflegungspauschale 28 euro',
    'reisekosten verpflegung',
  ],
  formula:
    'Pauschale = volle Tage × 28 € + (An-/Abreise-Tage + Tage 8–24 h) × 14 € − Kürzungen',
  inputs: [
    { type: 'number', id: 'volleTage', label: 'Volle Reisetage (24 h abwesend)', unit: 'Tage', default: 2, min: 0, step: 1, help: 'Kalendertage mit 24 Stunden Abwesenheit (Zwischentage einer mehrtägigen Reise).' },
    { type: 'number', id: 'teilTage', label: 'An-/Abreisetage & Tage über 8 h', unit: 'Tage', default: 2, min: 0, step: 1, help: 'An- und Abreisetag einer mehrtägigen Reise sowie eintägige Reisen mit mehr als 8 Stunden Abwesenheit.' },
    { type: 'number', id: 'fruehstueck', label: 'Gestellte Frühstücke', unit: 'x', default: 0, min: 0, step: 1, help: 'Vom Arbeitgeber/Hotel gestelltes Frühstück kürzt die Pauschale um 20 % von 28 € = 5,60 €.' },
    { type: 'number', id: 'hauptmahlzeit', label: 'Gestellte Mittag-/Abendessen', unit: 'x', default: 0, min: 0, step: 1, help: 'Jede gestellte Hauptmahlzeit kürzt um 40 % von 28 € = 11,20 €.' },
  ],
  compute: (v) => {
    const volleTage = num(v.volleTage);
    const teilTage = num(v.teilTage);
    const fruehstueck = num(v.fruehstueck);
    const hauptmahlzeit = num(v.hauptmahlzeit);

    const satzVoll = 28;
    const satzTeil = 14;

    const grundpauschale = volleTage * satzVoll + teilTage * satzTeil;
    const kuerzungFruehstueck = fruehstueck * (satzVoll * 0.2);
    const kuerzungHaupt = hauptmahlzeit * (satzVoll * 0.4);
    const kuerzungGesamt = kuerzungFruehstueck + kuerzungHaupt;
    const auszahlung = Math.max(grundpauschale - kuerzungGesamt, 0);

    return [
      { label: 'Verpflegungspauschale', value: auszahlung, unit: '€', digits: 2, primary: true },
      { label: 'Pauschale vor Kürzung', value: grundpauschale, unit: '€', digits: 2 },
      { label: 'Kürzung Frühstück', value: kuerzungFruehstueck, unit: '€', digits: 2 },
      { label: 'Kürzung Hauptmahlzeiten', value: kuerzungHaupt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei beruflichen Auswärtstätigkeiten im Inland gibt es Verpflegungspauschalen: 28 € für volle Abwesenheitstage (24 Stunden) und 14 € für An- und Abreisetage sowie eintägige Reisen mit mehr als 8 Stunden. Werden Mahlzeiten gestellt, wird die Pauschale gekürzt – Frühstück um 5,60 €, Mittag- oder Abendessen um je 11,20 €. Der Rechner gibt eine Orientierung zu den steuerfrei ansetzbaren Beträgen.',
  howto: [
    'Trage die Zahl der vollen Reisetage (24 Stunden abwesend) ein.',
    'Gib die An- und Abreisetage sowie eintägige Reisen über 8 Stunden an.',
    'Erfasse vom Arbeitgeber oder Hotel gestellte Mahlzeiten zur Kürzung.',
    'Lies die ansetzbare Verpflegungspauschale ab.',
  ],
  faq: [
    { q: 'Wie hoch sind die Pauschalen im Inland?', a: '28 € für volle Kalendertage mit 24 Stunden Abwesenheit und 14 € für An-/Abreisetage sowie eintägige Auswärtstätigkeiten von mehr als 8 Stunden.' },
    { q: 'Wie wirken sich gestellte Mahlzeiten aus?', a: 'Ein gestelltes Frühstück kürzt die Tagespauschale um 20 % des vollen Satzes (5,60 €), ein Mittag- oder Abendessen um je 40 % (11,20 €).' },
    { q: 'Gilt das auch für Auslandsreisen?', a: 'Im Ausland gelten länderspezifische Pauschalen, die hier nicht abgebildet sind. Dieser Rechner deckt nur die Inlandspauschalen ab.' },
    { q: 'Kann die Pauschale negativ werden?', a: 'Nein. Übersteigen die Kürzungen die Pauschale, wird der Betrag auf 0 € begrenzt – eine Rückzahlung entsteht nicht.' },
  ],
  related: ['reisekosten-kilometergeld-rechner', 'pendlerpauschale-rechner', 'dienstwagen-1-prozent-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { volleTage: 2, teilTage: 2, fruehstueck: 0, hauptmahlzeit: 0 },
      expect: [
        { label: 'Verpflegungspauschale', value: 84, tolerance: 0.01 },
        { label: 'Pauschale vor Kürzung', value: 84, tolerance: 0.01 },
      ],
    },
    {
      values: { volleTage: 1, teilTage: 2, fruehstueck: 2, hauptmahlzeit: 1 },
      expect: [
        { label: 'Pauschale vor Kürzung', value: 56, tolerance: 0.01 },
        { label: 'Verpflegungspauschale', value: 33.6, tolerance: 0.01 },
      ],
    },
  ],
};
