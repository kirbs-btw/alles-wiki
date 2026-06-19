import type { Tool } from '../../lib/types';
import { toDate, daysBetween } from '../../lib/types';

// Mutterschutz-Fristen-Rechner: Aus dem errechneten Geburtstermin (ET) werden
// Beginn und Ende der Schutzfrist bestimmt.
// Vorgeburtliche Schutzfrist: 6 Wochen vor ET = 42 Tage.
// Nachgeburtliche Schutzfrist: regulär 8 Wochen = 56 Tage,
// bei Früh-/Mehrlingsgeburten oder Behinderung des Kindes 12 Wochen = 84 Tage.
// (Maßgeblich für die Nachfrist ist der tatsächliche Geburtstag; hier zur
// Planung näherungsweise ab ET gerechnet.) Orientierung, kein Rechtsersatz (Stand 2026).

const VOR_TAGE = 42; // 6 Wochen vor ET
const NACH_REGULAER = 56; // 8 Wochen
const NACH_VERLAENGERT = 84; // 12 Wochen

function addDaysIso(iso: string, n: number): string {
  const d = toDate(iso);
  if (!d) return iso;
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

function wochentag(iso: string): string {
  const d = toDate(iso);
  if (!d) return '';
  return ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][
    d.getUTCDay()
  ];
}

function fmt(iso: string): string {
  const d = toDate(iso);
  if (!d) return iso;
  const tt = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tt}.${mm}.${d.getUTCFullYear()}`;
}

export const tool: Tool = {
  slug: 'mutterschutz-fristen-rechner',
  category: 'familie',
  title: 'Mutterschutz-Fristen berechnen',
  shortTitle: 'Mutterschutz-Fristen',
  description:
    'Berechne Beginn und Ende der Mutterschutz-Frist aus dem errechneten Geburtstermin: 6 Wochen vor und 8 (bzw. 12) Wochen nach der Geburt. Orientierung (Stand 2026).',
  keywords: [
    'mutterschutz fristen rechner',
    'schutzfrist berechnen',
    'mutterschutz beginn',
    'wann beginnt mutterschutz',
    'mutterschutz ende berechnen',
    'schutzfrist mutterschutz datum',
  ],
  intro:
    'Die Mutterschutzfrist schützt werdende Mütter rund um die Geburt. Sie beginnt 6 Wochen (42 Tage) vor dem errechneten Geburtstermin und endet regulär 8 Wochen nach der Geburt. Bei Früh- oder Mehrlingsgeburten sowie bei einer Behinderung des Kindes verlängert sich die nachgeburtliche Frist auf 12 Wochen. Dieser Rechner ermittelt aus dem errechneten Termin Beginn, Ende und Gesamtdauer der Schutzfrist. Hinweis: Orientierung zur Planung – für die Nachfrist ist der tatsächliche Geburtstag maßgeblich. Kein Rechts- oder Beratungsersatz (Stand 2026).',
  formula:
    'Beginn = ET − 42 Tage; Ende = ET + 56 Tage (regulär) bzw. + 84 Tage (verlängert)',
  inputs: [
    { type: 'date', id: 'et', label: 'Errechneter Geburtstermin (ET)', default: '2026-09-01', help: 'Voraussichtlicher Geburtstermin.' },
    {
      type: 'select', id: 'art', label: 'Art der Geburt',
      default: 'regulaer',
      options: [
        { value: 'regulaer', label: 'Regulär (Nachfrist 8 Wochen)' },
        { value: 'verlaengert', label: 'Früh-/Mehrlingsgeburt o. Behinderung (12 Wochen)' },
      ],
      help: 'Bestimmt die Länge der Frist nach der Geburt.',
    },
  ],
  compute: (v) => {
    const et = String(v.et);
    const etDate = toDate(et);
    if (!etDate) {
      return [{ label: 'Beginn der Schutzfrist', value: 'ungültiges Datum', primary: true }];
    }
    const nachTage = String(v.art) === 'verlaengert' ? NACH_VERLAENGERT : NACH_REGULAER;
    const beginn = addDaysIso(et, -VOR_TAGE);
    const ende = addDaysIso(et, nachTage);
    const tageGesamt = daysBetween(beginn, ende);
    return [
      { label: 'Beginn der Schutzfrist', value: fmt(beginn), primary: true, help: `${VOR_TAGE} Tage vor ET, ${wochentag(beginn)}` },
      { label: 'Voraussichtliches Ende', value: fmt(ende), help: `${nachTage} Tage nach ET, ${wochentag(ende)}` },
      { label: 'Vorgeburtliche Frist', value: VOR_TAGE, unit: 'Tage', digits: 0, help: '6 Wochen' },
      { label: 'Nachgeburtliche Frist', value: nachTage, unit: 'Tage', digits: 0, help: nachTage === NACH_REGULAER ? '8 Wochen' : '12 Wochen' },
      { label: 'Gesamtdauer der Schutzfrist', value: tageGesamt, unit: 'Tage', digits: 0 },
    ];
  },
  howto: [
    'Errechneten Geburtstermin (ET) eintragen.',
    'Art der Geburt wählen – regulär oder verlängerte Nachfrist.',
    'Beginn, Ende und Gesamtdauer der Schutzfrist ablesen.',
  ],
  faq: [
    { q: 'Wann beginnt die Mutterschutzfrist?', a: '6 Wochen (42 Tage) vor dem errechneten Geburtstermin. Werdende Mütter dürfen in dieser Zeit nur auf ausdrücklichen eigenen Wunsch weiterarbeiten.' },
    { q: 'Wie lange dauert der Mutterschutz nach der Geburt?', a: 'Regulär 8 Wochen. Bei Früh- und Mehrlingsgeburten sowie bei einer Behinderung des Kindes verlängert sich die Frist auf 12 Wochen. In dieser Zeit besteht ein absolutes Beschäftigungsverbot.' },
    { q: 'Was, wenn das Kind früher oder später kommt?', a: 'Für die nachgeburtliche Frist zählt der tatsächliche Geburtstag. Kommt das Kind vor dem ET, werden die „verlorenen" Tage der vorgeburtlichen Frist an die Nachfrist angehängt. Dieser Rechner rechnet zur Planung näherungsweise ab ET.' },
    { q: 'Ist das eine rechtsverbindliche Auskunft?', a: 'Nein. Der Rechner dient der zeitlichen Orientierung nach dem Mutterschutzgesetz (Stand 2026). Verbindlich sind die gesetzlichen Regelungen und die Bescheinigung über den errechneten Termin.' },
  ],
  related: ['geburtstermin-rechner', 'mutterschaftsgeld-rechner', 'elterngeld-rechner', 'elternzeit-ende-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { et: '2026-09-01', art: 'regulaer' },
      expect: [
        { label: 'Gesamtdauer der Schutzfrist', value: 98, tolerance: 0 },
        { label: 'Nachgeburtliche Frist', value: 56, tolerance: 0 },
      ],
    },
    {
      values: { et: '2026-09-01', art: 'verlaengert' },
      expect: [
        { label: 'Gesamtdauer der Schutzfrist', value: 126, tolerance: 0 },
        { label: 'Nachgeburtliche Frist', value: 84, tolerance: 0 },
      ],
    },
  ],
};
