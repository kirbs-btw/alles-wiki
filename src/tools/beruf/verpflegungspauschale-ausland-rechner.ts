import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verpflegungspauschale-ausland-rechner',
  category: 'beruf',
  title: 'Verpflegungspauschale Ausland Rechner',
  shortTitle: 'Verpflegung Ausland',
  description:
    'Berechne die Verpflegungspauschale für Auslandsdienstreisen aus den länderspezifischen Sätzen: voller Satz für 24-Stunden-Tage, 80 % für An-/Abreise und Tage über 8 Stunden.',
  keywords: [
    'verpflegungspauschale ausland rechner',
    'auslandstagegeld berechnen',
    'verpflegungsmehraufwand ausland',
    'spesen auslandsreise rechner',
    'reisekosten ausland verpflegung',
  ],
  formula:
    'Pauschale = volle Tage × Auslandssatz + (An-/Abreise + Tage 8–24 h) × 80 % × Auslandssatz − Kürzungen',
  inputs: [
    { type: 'number', id: 'satz', label: 'Voller Auslands-Tagessatz (Land)', unit: '€', default: 50, min: 0, step: 1, help: 'Länderspezifischer Verpflegungssatz aus der BMF-Tabelle für das jeweilige Land (Stand 2026).' },
    { type: 'number', id: 'volleTage', label: 'Volle Reisetage (24 h abwesend)', unit: 'Tage', default: 2, min: 0, step: 1 },
    { type: 'number', id: 'teilTage', label: 'An-/Abreisetage & Tage über 8 h', unit: 'Tage', default: 2, min: 0, step: 1, help: 'Hier zählen 80 % des vollen Auslandssatzes.' },
    { type: 'number', id: 'fruehstueck', label: 'Gestellte Frühstücke', unit: 'x', default: 0, min: 0, step: 1, help: 'Kürzung je gestelltem Frühstück: 20 % des vollen Auslandssatzes.' },
    { type: 'number', id: 'hauptmahlzeit', label: 'Gestellte Mittag-/Abendessen', unit: 'x', default: 0, min: 0, step: 1, help: 'Kürzung je gestellter Hauptmahlzeit: 40 % des vollen Auslandssatzes.' },
  ],
  compute: (v) => {
    const satz = num(v.satz);
    const volleTage = num(v.volleTage);
    const teilTage = num(v.teilTage);
    const fruehstueck = num(v.fruehstueck);
    const hauptmahlzeit = num(v.hauptmahlzeit);

    const satzTeil = satz * 0.8;
    const grundpauschale = volleTage * satz + teilTage * satzTeil;
    const kuerzungFruehstueck = fruehstueck * (satz * 0.2);
    const kuerzungHaupt = hauptmahlzeit * (satz * 0.4);
    const kuerzungGesamt = kuerzungFruehstueck + kuerzungHaupt;
    const auszahlung = Math.max(grundpauschale - kuerzungGesamt, 0);

    return [
      { label: 'Verpflegungspauschale', value: auszahlung, unit: '€', digits: 2, primary: true },
      { label: 'Pauschale vor Kürzung', value: grundpauschale, unit: '€', digits: 2 },
      { label: 'Satz An-/Abreise (80 %)', value: satzTeil, unit: '€', digits: 2 },
      { label: 'Kürzung gesamt', value: kuerzungGesamt, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Bei Auslandsdienstreisen gelten statt der Inlandspauschalen länderspezifische Verpflegungssätze, die das Bundesfinanzministerium jährlich festlegt. Für volle Abwesenheitstage (24 Stunden) gilt der volle Auslandssatz, für An- und Abreisetage sowie eintägige Reisen über 8 Stunden 80 % davon. Werden Mahlzeiten gestellt, wird gekürzt: Frühstück um 20 %, Mittag- oder Abendessen um je 40 % des vollen Satzes. Trage den passenden Ländersatz ein – dieser Rechner liefert die ansetzbare Pauschale (Stand 2026).',
  howto: [
    'Schlage den vollen Verpflegungssatz für das Reiseland in der BMF-Tabelle nach und trage ihn ein.',
    'Gib die vollen Reisetage (24 Stunden abwesend) an.',
    'Erfasse An-/Abreisetage und eintägige Reisen über 8 Stunden.',
    'Trage gestellte Mahlzeiten ein und lies die Pauschale ab.',
  ],
  faq: [
    { q: 'Woher bekomme ich die Auslandssätze?', a: 'Die länderspezifischen Verpflegungs- und Übernachtungssätze veröffentlicht das Bundesfinanzministerium (BMF) jährlich in einem Schreiben. Trage den vollen Tagessatz des jeweiligen Landes ein.' },
    { q: 'Wie hoch ist der Satz für An- und Abreise?', a: 'Für An- und Abreisetage sowie eintägige Auslandsreisen über 8 Stunden gelten 80 % des vollen Auslandssatzes – analog zur Inlandsregelung.' },
    { q: 'Wie wirken sich gestellte Mahlzeiten aus?', a: 'Ein gestelltes Frühstück kürzt um 20 % des vollen Auslandssatzes, ein Mittag- oder Abendessen um je 40 %. Die Kürzung bezieht sich stets auf den vollen Tagessatz des Landes.' },
    { q: 'Welcher Ländersatz gilt bei Reisen durch mehrere Länder?', a: 'Maßgeblich ist in der Regel das Land, das der Reisende vor 24 Uhr Ortszeit zuletzt erreicht. Bei reinen An-/Abreisetagen gilt der Satz des letzten Tätigkeitsortes.' },
  ],
  related: ['verpflegungsmehraufwand-rechner', 'reisekosten-kilometergeld-rechner', 'pendlerpauschale-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { satz: 50, volleTage: 2, teilTage: 2, fruehstueck: 0, hauptmahlzeit: 0 },
      expect: [
        { label: 'Pauschale vor Kürzung', value: 180, tolerance: 0.01 },
        { label: 'Verpflegungspauschale', value: 180, tolerance: 0.01 },
      ],
    },
    {
      values: { satz: 50, volleTage: 1, teilTage: 2, fruehstueck: 1, hauptmahlzeit: 1 },
      expect: [
        { label: 'Pauschale vor Kürzung', value: 130, tolerance: 0.01 },
        { label: 'Verpflegungspauschale', value: 100, tolerance: 0.01 },
      ],
    },
  ],
};
