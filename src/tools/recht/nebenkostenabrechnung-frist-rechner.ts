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

/** Addiert volle Monate kalendergenau (UTC); Monatsende wird begrenzt. */
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
  slug: 'nebenkostenabrechnung-frist-rechner',
  category: 'recht',
  title: 'Nebenkostenabrechnung-Frist-Rechner (§ 556 BGB)',
  shortTitle: 'NK-Abrechnungsfrist',
  description:
    'Berechne die Frist zur Betriebskostenabrechnung: 12 Monate nach Ende des Abrechnungszeitraums. Danach kann der Vermieter keine Nachzahlung mehr verlangen. Orientierung.',
  keywords: [
    'nebenkostenabrechnung frist',
    'betriebskostenabrechnung frist',
    'abrechnungsfrist nebenkosten rechner',
    'nachzahlung nebenkosten frist',
    '556 bgb abrechnungsfrist',
    'wann muss nebenkostenabrechnung kommen',
  ],
  formula: 'Abrechnungsfrist = Ende des Abrechnungszeitraums + 12 Monate (§ 556 Abs. 3 BGB)',
  inputs: [
    {
      type: 'date',
      id: 'ende',
      label: 'Ende des Abrechnungszeitraums',
      default: '2025-12-31',
      help: 'Meist der 31.12. Maßgeblich ist der letzte Tag des abgerechneten Zeitraums.',
    },
    {
      type: 'number',
      id: 'monate',
      label: 'Abrechnungsfrist',
      unit: 'Monate',
      default: 12,
      min: 1,
      max: 24,
      step: 1,
      help: 'Gesetzlich 12 Monate (§ 556 Abs. 3 S. 2 BGB).',
    },
  ],
  compute: (v) => {
    const ende = toDate(String(v.ende));
    const monate = Math.round(num(v.monate, 12));

    if (!ende || monate < 1) {
      return [
        { label: 'Abrechnung muss vorliegen bis', value: 'Ungültige Eingabe', primary: true },
        { label: 'Frist (Monate)', value: 0, unit: 'Monate', digits: 0 },
      ];
    }

    const frist = addMonate(ende, monate);

    return [
      { label: 'Abrechnung muss vorliegen bis', value: formatDE(frist), primary: true, help: 'Nach diesem Tag kann der Vermieter in der Regel keine Nachforderung mehr geltend machen.' },
      { label: 'Wochentag', value: WOCHENTAGE[frist.getUTCDay()] },
      { label: 'Frist (lang)', value: `${WOCHENTAGE[frist.getUTCDay()]}, ${frist.getUTCDate()}. ${MONATE[frist.getUTCMonth()]} ${frist.getUTCFullYear()}` },
      { label: 'Tag', value: frist.getUTCDate(), digits: 0 },
      { label: 'Monat', value: frist.getUTCMonth() + 1, digits: 0 },
      { label: 'Jahr', value: frist.getUTCFullYear(), digits: 0 },
      { label: 'Frist (Monate)', value: monate, unit: 'Monate', digits: 0 },
    ];
  },
  intro:
    'Der Vermieter muss die Betriebskosten spätestens zwölf Monate nach Ende des Abrechnungszeitraums abrechnen (§ 556 Abs. 3 BGB). Versäumt er diese Frist, kann er Nachforderungen grundsätzlich nicht mehr geltend machen – es sei denn, er hat die Verspätung nicht zu vertreten. Guthaben muss er dem Mieter dagegen weiterhin auszahlen. Der Rechner addiert die Frist zum Ende des Abrechnungszeitraums. Es handelt sich um eine Orientierung und ersetzt keine Rechtsberatung.',
  howto: [
    'Letzten Tag des Abrechnungszeitraums eintragen (z. B. 31.12.).',
    'Abrechnungsfrist wählen (gesetzlich 12 Monate).',
    'Datum ablesen, bis zu dem die Abrechnung beim Mieter vorliegen muss.',
  ],
  faq: [
    {
      q: 'Bis wann muss die Nebenkostenabrechnung kommen?',
      a: 'Spätestens 12 Monate nach Ende des Abrechnungszeitraums (§ 556 Abs. 3 S. 2 BGB). Bei Kalenderjahr-Abrechnung (Ende 31.12.) also bis zum 31.12. des Folgejahres.',
    },
    {
      q: 'Was passiert nach Fristablauf?',
      a: 'Nachforderungen sind grundsätzlich ausgeschlossen, wenn der Vermieter die Verspätung zu vertreten hat. Ein Guthaben des Mieters bleibt dagegen bestehen und muss ausgezahlt werden.',
    },
    {
      q: 'Wie lange kann ich Einwendungen erheben?',
      a: 'Der Mieter kann Einwendungen gegen die Abrechnung bis zum Ablauf des 12. Monats nach Zugang der Abrechnung geltend machen (§ 556 Abs. 3 S. 5, 6 BGB).',
    },
    {
      q: 'Ist die Berechnung verbindlich?',
      a: 'Nein. Sie dient der Orientierung. Bei Streit über Fristen und Nachforderungen sollte rechtlicher Rat eingeholt werden.',
    },
  ],
  related: ['nebenkosten-umlage-rechner', 'mietminderung-rechner', 'frist-rechner'],
  examples: [
    {
      // 2025-12-31 + 12 Monate = 2026-12-31
      values: { ende: '2025-12-31', monate: 12 },
      expect: [
        { label: 'Tag', value: 31, tolerance: 0 },
        { label: 'Monat', value: 12, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
        { label: 'Frist (Monate)', value: 12, tolerance: 0 },
      ],
    },
    {
      // 2025-06-30 + 12 Monate = 2026-06-30
      values: { ende: '2025-06-30', monate: 12 },
      expect: [
        { label: 'Tag', value: 30, tolerance: 0 },
        { label: 'Monat', value: 6, tolerance: 0 },
        { label: 'Jahr', value: 2026, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
