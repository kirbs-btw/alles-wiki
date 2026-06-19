import type { Tool } from '../../lib/types';
import { num, toDate } from '../../lib/types';

const WOCHENTAGE = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
] as const;
const MONATE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
] as const;

function formatDE(d: Date): string {
  const tag = String(d.getUTCDate()).padStart(2, '0');
  const monat = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${tag}.${monat}.${d.getUTCFullYear()}`;
}

/** Addiert volle Monate kalendergenau (UTC); Monatsende wird begrenzt (z. B. 31.01. + 1 Monat = 28./29.02.). */
function addMonate(d: Date, m: number): Date {
  let y = d.getUTCFullYear();
  let mo = d.getUTCMonth() + m;
  y += Math.floor(mo / 12);
  mo = ((mo % 12) + 12) % 12;
  let day = d.getUTCDate();
  const last = new Date(Date.UTC(y, mo + 1, 0)).getUTCDate();
  if (day > last) day = last;
  return new Date(Date.UTC(y, mo, day));
}

export const tool: Tool = {
  slug: 'raeumungsfrist-rechner',
  category: 'recht',
  title: 'Räumungsfrist-Rechner (Ende der Räumungsfrist)',
  shortTitle: 'Räumungsfrist',
  description:
    'Berechne das Ende einer gerichtlich gewährten Räumungsfrist: Stichtag plus Anzahl Monate ergibt den letzten Tag, an dem die Wohnung geräumt sein muss. Orientierung.',
  keywords: [
    'räumungsfrist rechner',
    'räumungsfrist berechnen',
    'wann muss ich ausziehen',
    'räumungsfrist ende',
    'räumungsfrist nach urteil',
    '721 zpo räumungsfrist',
  ],
  formula: 'Ende der Räumungsfrist = Stichtag (Urteil/Rechtskraft) + gewährte Monate',
  inputs: [
    {
      type: 'date',
      id: 'start',
      label: 'Stichtag (Urteil bzw. Rechtskraft)',
      default: '2026-03-15',
      help: 'Tag, ab dem die Räumungsfrist läuft – meist das Räumungsurteil oder dessen Rechtskraft.',
    },
    {
      type: 'number',
      id: 'monate',
      label: 'Gewährte Räumungsfrist',
      unit: 'Monate',
      default: 6,
      min: 0,
      max: 24,
      step: 1,
      help: 'Vom Gericht eingeräumte Frist (§ 721 ZPO). Höchstens insgesamt ein Jahr ab Rechtskraft.',
    },
  ],
  compute: (v) => {
    const start = toDate(String(v.start));
    const monate = Math.round(num(v.monate, 0));

    if (!start || monate < 0) {
      return [
        { label: 'Ende der Räumungsfrist', value: 'Ungültige Eingabe', primary: true },
        { label: 'Frist (Monate)', value: 0, unit: 'Monate', digits: 0 },
      ];
    }

    const ende = addMonate(start, monate);

    return [
      { label: 'Ende der Räumungsfrist', value: formatDE(ende), primary: true, help: 'Bis zu diesem Tag muss die Wohnung geräumt und herausgegeben sein.' },
      { label: 'Wochentag', value: WOCHENTAGE[ende.getUTCDay()] },
      { label: 'Ende (lang)', value: `${WOCHENTAGE[ende.getUTCDay()]}, ${ende.getUTCDate()}. ${MONATE[ende.getUTCMonth()]} ${ende.getUTCFullYear()}` },
      { label: 'Tag', value: ende.getUTCDate(), digits: 0 },
      { label: 'Monat', value: ende.getUTCMonth() + 1, digits: 0 },
      { label: 'Jahr', value: ende.getUTCFullYear(), digits: 0 },
      { label: 'Frist (Monate)', value: monate, unit: 'Monate', digits: 0 },
    ];
  },
  intro:
    'Verurteilt ein Gericht den Mieter zur Räumung, kann es ihm auf Antrag eine Räumungsfrist gewähren (§ 721 ZPO). Diese Frist verschafft Zeit, eine neue Wohnung zu finden. Sie darf insgesamt ein Jahr ab Rechtskraft des Urteils nicht überschreiten. Der Rechner addiert die gewährten Monate zum Stichtag und zeigt den letzten Tag der Frist. Das ist eine reine Kalenderberechnung zur Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Stichtag eintragen (Datum des Räumungsurteils bzw. der Rechtskraft).',
    'Anzahl der gewährten Monate eingeben.',
    'Letzten Tag der Räumungsfrist ablesen.',
  ],
  faq: [
    {
      q: 'Wer gewährt die Räumungsfrist?',
      a: 'Das Gericht im Räumungsurteil oder später das Vollstreckungsgericht (§ 721, § 794a ZPO). Sie wird auf Antrag und nach Abwägung der Interessen beider Seiten festgelegt.',
    },
    {
      q: 'Wie lange kann sie höchstens dauern?',
      a: 'Insgesamt höchstens ein Jahr, gerechnet ab Rechtskraft des Urteils (§ 721 Abs. 5 ZPO). Innerhalb dieser Grenze kann sie verlängert oder verkürzt werden.',
    },
    {
      q: 'Was passiert nach Ablauf der Frist?',
      a: 'Räumt der Mieter nicht freiwillig, kann der Vermieter die Zwangsräumung durch den Gerichtsvollzieher betreiben. Eine erneute Verlängerung muss rechtzeitig vorher beantragt werden.',
    },
    {
      q: 'Ist die Berechnung verbindlich?',
      a: 'Nein. Maßgeblich ist der genaue Tenor des Urteils bzw. Beschlusses. Der Rechner liefert nur eine Orientierung und ersetzt keine anwaltliche Beratung.',
    },
  ],
  related: ['kuendigungsfrist-rechner', 'frist-rechner', 'mietminderung-rechner'],
  examples: [
    {
      // 2026-03-15 + 6 Monate = 2026-09-15
      values: { start: '2026-03-15', monate: 6 },
      expect: [
        { label: 'Tag', value: 15, tolerance: 0 },
        { label: 'Monat', value: 9, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Frist (Monate)', value: 6, tolerance: 0 },
      ],
    },
    {
      // 2025-12-31 + 2 Monate = 2026-02-28 (Monatsende-Begrenzung)
      values: { start: '2025-12-31', monate: 2 },
      expect: [
        { label: 'Tag', value: 28, tolerance: 0 },
        { label: 'Monat', value: 2, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Frist (Monate)', value: 2, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
