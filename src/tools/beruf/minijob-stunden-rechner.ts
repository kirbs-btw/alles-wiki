import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'minijob-stunden-rechner',
  category: 'beruf',
  title: 'Minijob-Stunden-Rechner',
  shortTitle: 'Minijob-Stunden',
  description:
    'Finde heraus, wie viele Stunden du bei deinem Stundenlohn im Minijob arbeiten darfst, ohne die monatliche Verdienstgrenze zu überschreiten – plus dein aktueller Verdienst.',
  keywords: [
    'minijob stunden rechner',
    'minijob höchststunden',
    'wie viele stunden minijob',
    'minijob verdienstgrenze stunden',
    'minijob 556 euro stunden',
    'maximale stunden minijob',
    'minijob lohn berechnen',
  ],
  formula:
    'Max. Stunden = Verdienstgrenze ÷ Stundenlohn ; Verdienst = Stundenlohn × gearbeitete Stunden',
  inputs: [
    { type: 'number', id: 'stundenlohn', label: 'Stundenlohn (brutto)', unit: '€', default: 13.5, min: 0.01, step: 0.5, help: 'Mindestens der gesetzliche Mindestlohn (Stand 2026: 13,90 €/h).' },
    { type: 'number', id: 'grenze', label: 'Monatliche Verdienstgrenze', unit: '€', default: 556, min: 0, step: 1, help: 'Minijob-Grenze, Stand 2026: 556 €/Monat. Anpassbar, falls sie sich ändert.' },
    { type: 'number', id: 'stunden', label: 'Tatsächlich gearbeitete Stunden/Monat', unit: 'h', default: 35, min: 0, step: 1 },
  ],
  compute: (v) => {
    const stundenlohn = num(v.stundenlohn);
    const grenze = num(v.grenze);
    const stunden = num(v.stunden);

    const maxStunden = stundenlohn > 0 ? grenze / stundenlohn : 0;
    const verdienst = stundenlohn * stunden;
    const rest = grenze - verdienst;
    const auslastung = grenze > 0 ? (verdienst / grenze) * 100 : 0;

    return [
      { label: 'Maximale Stunden im Monat', value: maxStunden, unit: 'h', digits: 1, primary: true },
      { label: 'Aktueller Verdienst', value: verdienst, unit: '€', digits: 2 },
      { label: 'Noch verfügbar bis zur Grenze', value: rest, unit: '€', digits: 2, help: 'Negativ bedeutet: Grenze überschritten.' },
      { label: 'Auslastung der Grenze', value: auslastung, unit: '%', digits: 1 },
    ];
  },
  intro:
    'Im Minijob ist nicht die Stundenzahl, sondern der monatliche Verdienst gedeckelt. Wie viele Stunden du arbeiten darfst, hängt deshalb direkt von deinem Stundenlohn ab: Je höher der Lohn, desto weniger Stunden bis zur Grenze. Dieser Rechner zeigt deine maximalen Stunden und deinen aktuellen Verdienst. Stand 2026 liegt die Geringfügigkeitsgrenze bei 556 € pro Monat.',
  howto: [
    'Trage deinen Brutto-Stundenlohn ein (mindestens Mindestlohn).',
    'Prüfe die voreingestellte Verdienstgrenze und passe sie bei Bedarf an.',
    'Gib ein, wie viele Stunden du tatsächlich arbeitest.',
    'Lies die maximal mögliche Stundenzahl und deinen Verdienst ab.',
  ],
  faq: [
    { q: 'Wie hoch ist die Minijob-Grenze 2026?', a: 'Stand 2026 beträgt die Geringfügigkeitsgrenze 556 € pro Monat. Sie ist an den Mindestlohn gekoppelt und kann sich künftig ändern – im Rechner anpassbar.' },
    { q: 'Warum hängen die Stunden vom Lohn ab?', a: 'Weil die Grenze in Euro definiert ist. Bei der Grenze von 556 € und einem Mindestlohn von 13,90 € ergeben sich rund 40 Arbeitsstunden im Monat.' },
    { q: 'Darf ich die Grenze gelegentlich überschreiten?', a: 'Ein unvorhersehbares Überschreiten ist in begrenztem Umfang und für maximal zwei Monate im Zeitjahr zulässig. Regelmäßiges Überschreiten führt zur Sozialversicherungspflicht.' },
    { q: 'Gilt im Minijob der Mindestlohn?', a: 'Ja. Auch Minijobber haben Anspruch auf den gesetzlichen Mindestlohn (Stand 2026: 13,90 €/h). Ein niedrigerer Stundenlohn ist nicht zulässig.' },
    { q: 'Wird über das Jahr oder pro Monat gerechnet?', a: 'Die Grenze gilt im Monatsdurchschnitt; jährlich entspricht das dem Zwölffachen, also 6.672 € bei 556 €. Dieser Rechner betrachtet den einzelnen Monat.' },
  ],
  related: ['stundenlohn-rechner', 'teilzeit-gehalt-rechner', 'brutto-stundensatz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { stundenlohn: 13.9, grenze: 556, stunden: 35 },
      expect: [
        { label: 'Maximale Stunden im Monat', value: 40, tolerance: 0.1 },
        { label: 'Aktueller Verdienst', value: 486.5, tolerance: 0.01 },
      ],
    },
  ],
};
