import type { Tool } from '../../lib/types';
import { num, toDate, daysBetween } from '../../lib/types';

const MS_PRO_TAG = 86_400_000;
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

export const tool: Tool = {
  slug: 'verzugseintritt-rechner',
  category: 'recht',
  title: 'Verzugseintritt-Rechner (§ 286 BGB)',
  shortTitle: 'Verzugseintritt',
  description:
    'Berechne, ab wann ein Schuldner in Verzug gerät: nach Mahnung oder automatisch 30 Tage nach Zugang der Rechnung (§ 286 BGB). Orientierung, kein Rechtsrat.',
  keywords: [
    'verzug rechner',
    'verzugseintritt berechnen',
    'wann tritt verzug ein',
    '30 tage verzug rechnung',
    '286 bgb verzug',
    'verzug ohne mahnung',
  ],
  formula:
    'Variante Mahnung: Verzug ab dem Tag nach der Mahnung.  Variante 30-Tage-Regel: Verzug ab dem 31. Tag nach Zugang der Rechnung (§ 286 Abs. 3 BGB)',
  inputs: [
    {
      type: 'date',
      id: 'start',
      label: 'Zugang der Rechnung bzw. Datum der Mahnung',
      default: '2026-02-01',
      help: 'Bei der 30-Tage-Regel zählt der Zugang der Rechnung; bei der Mahnung deren Zugang beim Schuldner.',
    },
    {
      type: 'select',
      id: 'art',
      label: 'Art des Verzugseintritts',
      default: 'dreissig',
      options: [
        { value: 'mahnung', label: 'Nach Mahnung (Verzug am Folgetag)' },
        { value: 'dreissig', label: '30-Tage-Regel ohne Mahnung (§ 286 III BGB)' },
      ],
      help: 'Die 30-Tage-Regel greift gegenüber Verbrauchern nur bei Hinweis auf der Rechnung.',
    },
  ],
  compute: (v) => {
    const start = toDate(String(v.start));
    const art = String(v.art || 'dreissig');

    if (!start) {
      return [
        { label: 'Verzug tritt ein am', value: 'Ungültige Eingabe', primary: true },
        { label: 'Tage bis Verzug', value: 0, unit: 'Tage', digits: 0 },
      ];
    }

    // Mahnung: Verzug am Folgetag. 30-Tage-Regel: Frist von 30 Tagen, Verzug am 31. Tag.
    const offset = art === 'mahnung' ? 1 : 31;
    const verzug = new Date(start.getTime() + offset * MS_PRO_TAG);
    const verzugIso = verzug.toISOString().slice(0, 10);
    const tageBis = daysBetween(String(v.start), verzugIso);

    return [
      { label: 'Verzug tritt ein am', value: formatDE(verzug), primary: true, help: 'Ab diesem Tag schuldet der Schuldner Verzugszinsen und ggf. Schadensersatz.' },
      { label: 'Wochentag', value: WOCHENTAGE[verzug.getUTCDay()] },
      { label: 'Verzug (lang)', value: `${WOCHENTAGE[verzug.getUTCDay()]}, ${verzug.getUTCDate()}. ${MONATE[verzug.getUTCMonth()]} ${verzug.getUTCFullYear()}` },
      { label: 'Tag', value: verzug.getUTCDate(), digits: 0 },
      { label: 'Monat', value: verzug.getUTCMonth() + 1, digits: 0 },
      { label: 'Jahr', value: verzug.getUTCFullYear(), digits: 0 },
      { label: 'Tage bis Verzug', value: tageBis, unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Verzug bedeutet, dass eine fällige Leistung schuldhaft nicht rechtzeitig erbracht wird. In der Regel tritt er durch eine Mahnung ein – dann ab dem Folgetag. Auch ohne Mahnung gerät der Schuldner spätestens 30 Tage nach Zugang einer Rechnung in Verzug (§ 286 Abs. 3 BGB); gegenüber Verbrauchern nur, wenn die Rechnung darauf hinweist. Ab Verzugseintritt fallen Verzugszinsen und ggf. Schadensersatz an. Der Rechner liefert eine Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Datum eintragen: Zugang der Rechnung (30-Tage-Regel) oder Zugang der Mahnung.',
    'Art des Verzugseintritts wählen.',
    'Tag des Verzugseintritts ablesen – ab dann laufen Verzugszinsen.',
  ],
  faq: [
    {
      q: 'Wann tritt Verzug automatisch ein?',
      a: 'Ohne Mahnung spätestens 30 Tage nach Fälligkeit und Zugang der Rechnung (§ 286 Abs. 3 BGB). Bei Verbrauchern setzt das einen entsprechenden Hinweis auf der Rechnung voraus.',
    },
    {
      q: 'Brauche ich immer eine Mahnung?',
      a: 'Nein. Bei kalendermäßig bestimmter Leistungszeit oder ernsthafter Erfüllungsverweigerung tritt Verzug auch ohne Mahnung ein (§ 286 Abs. 2 BGB).',
    },
    {
      q: 'Was kostet der Verzug den Schuldner?',
      a: 'Verzugszinsen (gegenüber Verbrauchern 5 Prozentpunkte über dem Basiszins, sonst 9 Prozentpunkte) sowie Ersatz des Verzugsschadens, etwa Mahnkosten. Den Zinsbetrag kannst du mit dem Verzugszinsen-Rechner ermitteln.',
    },
    {
      q: 'Ist die Berechnung verbindlich?',
      a: 'Nein. Der genaue Verzugsbeginn hängt vom Einzelfall ab (Fälligkeit, Zugang, Hinweise). Der Rechner liefert nur eine Orientierung.',
    },
  ],
  related: ['verzugszinsen-rechner', 'mahngebuehren-rechner', 'widerrufsfrist-rechner'],
  examples: [
    {
      // 30-Tage-Regel: 2026-02-01 + 31 Tage = 2026-03-04
      values: { start: '2026-02-01', art: 'dreissig' },
      expect: [
        { label: 'Tag', value: 4, tolerance: 0 },
        { label: 'Monat', value: 3, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Tage bis Verzug', value: 31, tolerance: 0 },
      ],
    },
    {
      // Mahnung: 2026-02-01 + 1 Tag = 2026-02-02
      values: { start: '2026-02-01', art: 'mahnung' },
      expect: [
        { label: 'Tag', value: 2, tolerance: 0 },
        { label: 'Monat', value: 2, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Tage bis Verzug', value: 1, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
