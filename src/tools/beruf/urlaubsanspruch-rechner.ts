import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'urlaubsanspruch-rechner',
  category: 'beruf',
  title: 'Urlaubsanspruch-Rechner (anteilig)',
  shortTitle: 'Urlaubsanspruch',
  description:
    'Berechne deinen anteiligen Urlaubsanspruch bei Teilzeit, anderer Arbeitstage-Woche oder unterjährigem Ein- bzw. Austritt – auf Basis deines Jahresurlaubs.',
  keywords: [
    'urlaubsanspruch rechner',
    'urlaub anteilig berechnen',
    'urlaubsanspruch teilzeit',
    'urlaub bei eintritt unterjährig',
    'resturlaub berechnen',
    'urlaubstage umrechnen',
    'urlaubsanspruch 4 tage woche',
  ],
  formula:
    'Anspruch = Jahresurlaub × (Arbeitstage/Woche ÷ Vollzeit-Tage) × (gearbeitete Monate ÷ 12)',
  inputs: [
    { type: 'number', id: 'jahresurlaub', label: 'Jahresurlaub (Vollzeit, 5-Tage-Woche)', unit: 'Tage', default: 30, min: 0, step: 1, help: 'Vertraglicher Urlaub bei Vollzeit und 5 Arbeitstagen pro Woche.' },
    { type: 'number', id: 'vollzeittage', label: 'Vollzeit-Arbeitstage pro Woche', unit: 'Tage', default: 5, min: 1, max: 6, step: 1 },
    { type: 'number', id: 'arbeitstage', label: 'Deine Arbeitstage pro Woche', unit: 'Tage', default: 4, min: 1, max: 6, step: 1 },
    { type: 'number', id: 'monate', label: 'Beschäftigte Monate im Jahr', unit: 'Monate', default: 12, min: 1, max: 12, step: 1, help: 'Bei unterjährigem Ein- oder Austritt die vollen Beschäftigungsmonate eintragen.' },
  ],
  compute: (v) => {
    const jahresurlaub = num(v.jahresurlaub);
    const vollzeittage = num(v.vollzeittage);
    const arbeitstage = num(v.arbeitstage);
    const monate = num(v.monate);

    const tagesfaktor = vollzeittage > 0 ? arbeitstage / vollzeittage : 0;
    const monatsfaktor = monate / 12;
    const exakt = jahresurlaub * tagesfaktor * monatsfaktor;
    const gerundet = Math.round(exakt);

    return [
      { label: 'Urlaubsanspruch (gerundet)', value: gerundet, unit: 'Tage', digits: 0, primary: true, help: 'Bruchteile ab 0,5 werden meist aufgerundet (§ 5 BUrlG-Logik).' },
      { label: 'Urlaubsanspruch (exakt)', value: exakt, unit: 'Tage', digits: 2 },
      { label: 'Angepasst auf Arbeitstage', value: jahresurlaub * tagesfaktor, unit: 'Tage', digits: 2, help: 'Voller Jahresanspruch umgerechnet auf deine Wochen-Arbeitstage.' },
      { label: 'Anteil pro Monat', value: monate > 0 ? exakt / monate : 0, unit: 'Tage', digits: 2 },
    ];
  },
  intro:
    'Wer in Teilzeit arbeitet, weniger Tage pro Woche im Einsatz ist oder erst unterjährig einsteigt, hat einen anteiligen Urlaubsanspruch. Entscheidend ist nicht die Stundenzahl, sondern die Zahl der Arbeitstage pro Woche. Dieser Rechner rechnet deinen Vollzeit-Jahresurlaub fair auf deine Tage und Monate um.',
  howto: [
    'Trage den vollen Jahresurlaub ein, der bei Vollzeit (5-Tage-Woche) gilt.',
    'Gib an, an wie vielen Tagen pro Woche du tatsächlich arbeitest.',
    'Bei Ein- oder Austritt im Jahr die vollen Beschäftigungsmonate eingeben.',
    'Lies den anteiligen Anspruch ab – gerundet und exakt.',
  ],
  faq: [
    { q: 'Zählen die Arbeitstage oder die Stunden?', a: 'Für die Urlaubsumrechnung zählen die Arbeitstage pro Woche, nicht die Stunden. Wer an 4 von 5 Tagen arbeitet, erhält 4/5 des Jahresurlaubs in Tagen.' },
    { q: 'Wie wird auf- oder abgerundet?', a: 'Üblich ist: Bruchteile von mindestens einem halben Tag werden aufgerundet. Viele Arbeitgeber runden generell zugunsten der Beschäftigten – der Vertrag ist maßgeblich.' },
    { q: 'Wie hoch ist der gesetzliche Mindesturlaub?', a: 'Das Bundesurlaubsgesetz nennt 24 Werktage bei einer 6-Tage-Woche, also 20 Arbeitstage bei einer 5-Tage-Woche. Viele Verträge gewähren mehr.' },
    { q: 'Was gilt bei unterjährigem Eintritt?', a: 'Für jeden vollen Beschäftigungsmonat entsteht ein Zwölftel des Jahresanspruchs. Nach 6 Monaten besteht zudem der volle gesetzliche Anspruch (Wartezeit).' },
    { q: 'Ändert sich der Anspruch bei Wechsel der Arbeitstage?', a: 'Ja. Wechselst du im Jahr die Zahl der Wochen-Arbeitstage, wird der Urlaub für die jeweiligen Zeiträume getrennt berechnet.' },
  ],
  related: ['teilzeit-gehalt-rechner', 'stundenlohn-rechner', 'ueberstunden-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { jahresurlaub: 30, vollzeittage: 5, arbeitstage: 4, monate: 12 },
      expect: [
        { label: 'Urlaubsanspruch (exakt)', value: 24, tolerance: 0.01 },
        { label: 'Urlaubsanspruch (gerundet)', value: 24, tolerance: 0.01 },
      ],
    },
    {
      values: { jahresurlaub: 30, vollzeittage: 5, arbeitstage: 5, monate: 6 },
      expect: [{ label: 'Urlaubsanspruch (exakt)', value: 15, tolerance: 0.01 }],
    },
  ],
};
