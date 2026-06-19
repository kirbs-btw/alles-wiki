import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'notgroschen-rechner',
  category: 'finanzen',
  title: 'Notgroschen-Rechner',
  shortTitle: 'Notgroschen',
  description:
    'Berechne deinen Notgroschen-Zielbetrag aus monatlichen Fixkosten und Rücklagen-Monaten – die finanzielle Reserve für Notfälle.',
  keywords: [
    'notgroschen rechner',
    'notgroschen berechnen',
    'eiserne reserve berechnen',
    'finanzielle reserve rechner',
    'wie viel notgroschen',
  ],
  formula: 'Notgroschen = monatliche Fixkosten × Anzahl Monate; Sparmonate = (Ziel − Vorhanden) / Sparrate',
  inputs: [
    { type: 'number', id: 'fixkosten', label: 'Monatliche Fixkosten', unit: '€', default: 2000, min: 0, step: 50, help: 'Miete, Strom, Versicherungen, Lebensmittel usw.' },
    { type: 'number', id: 'monate', label: 'Rücklage für … Monate', unit: 'Monate', default: 4, min: 1, max: 24, step: 1, help: 'Empfehlung: 3–6 Monatsausgaben.' },
    { type: 'number', id: 'vorhanden', label: 'Bereits gespart', unit: '€', default: 2000, min: 0, step: 100 },
    { type: 'number', id: 'sparrate', label: 'Monatliche Sparrate', unit: '€', default: 200, min: 0, step: 10, help: 'Zum Aufbau des Notgroschens.' },
  ],
  compute: (v) => {
    const fixkosten = num(v.fixkosten);
    const monate = num(v.monate);
    const vorhanden = num(v.vorhanden);
    const sparrate = num(v.sparrate);
    const ziel = fixkosten * monate;
    const luecke = Math.max(0, ziel - vorhanden);
    const sparmonate = luecke <= 0 ? 0 : sparrate > 0 ? Math.ceil(luecke / sparrate) : Infinity;
    return [
      { label: 'Notgroschen-Zielbetrag', value: ziel, unit: '€', digits: 0, primary: true },
      { label: 'Noch zu sparen', value: luecke, unit: '€', digits: 0 },
      { label: 'Dauer bis zum Ziel', value: Number.isFinite(sparmonate) ? sparmonate : 0, unit: 'Monate', digits: 0, help: luecke > 0 && sparrate <= 0 ? 'Ohne Sparrate nicht erreichbar.' : undefined },
    ];
  },
  intro:
    'Der Notgroschen (auch „eiserne Reserve") ist Geld, das du jederzeit für unerwartete Ausgaben wie eine kaputte Waschmaschine, Autoreparatur oder einen Jobverlust verfügbar hast. Übliche Empfehlung: 3 bis 6 Monatsausgaben, am besten auf einem Tagesgeldkonto. Dieser Rechner ermittelt den Zielbetrag und wie lange du bei deiner Sparrate dafür brauchst.',
  howto: [
    'Trage deine monatlichen Fixkosten ein – alles, was zum Leben unbedingt nötig ist.',
    'Wähle, für wie viele Monate du eine Reserve halten willst (3–6 Monate sind üblich).',
    'Gib an, wie viel du schon gespart hast und wie viel du monatlich zurücklegst.',
    'Lies Zielbetrag und voraussichtliche Spardauer ab.',
  ],
  faq: [
    { q: 'Wie hoch sollte der Notgroschen sein?', a: 'Als Faustregel gelten 3 Monatsausgaben für Angestellte mit sicherem Job, 6 oder mehr für Selbstständige oder bei unsicherem Einkommen.' },
    { q: 'Wo lege ich den Notgroschen an?', a: 'Auf einem Tagesgeld- oder Girokonto – wichtig ist tägliche Verfügbarkeit und kein Kursrisiko. Aktien oder Festgeld eignen sich nicht, weil du im Notfall sofort drankommen musst.' },
    { q: 'Zähle ich auch Lebensmittel zu den Fixkosten?', a: 'Ja, für den Notgroschen rechnest du alle laufenden Ausgaben ein, die du im Notfall weiter stemmen musst – inklusive Lebensmittel, Mobilität und Versicherungen.' },
  ],
  related: ['tagesgeld-rechner', 'sparrate-rechner', 'sparplan-rechner'],
  examples: [
    {
      values: { fixkosten: 2000, monate: 4, vorhanden: 2000, sparrate: 200 },
      expect: [
        { label: 'Notgroschen-Zielbetrag', value: 8000, tolerance: 0 },
        { label: 'Noch zu sparen', value: 6000, tolerance: 0 },
        { label: 'Dauer bis zum Ziel', value: 30, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
