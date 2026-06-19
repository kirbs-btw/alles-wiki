import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'nebenjob-hinzuverdienst-rechner',
  category: 'beruf',
  title: 'Nebenjob-Hinzuverdienst-Rechner',
  shortTitle: 'Nebenjob-Verdienst',
  description:
    'Berechne, was vom Nebenjob bleibt: Monats- und Jahresverdienst, der Abstand zur Minijob-Grenze und der Effekt eines geschätzten Steuersatzes auf den Zuverdienst.',
  keywords: [
    'nebenjob rechner',
    'hinzuverdienst rechner',
    'nebenjob verdienst berechnen',
    'zweitjob steuer',
    'nebenjob minijob grenze',
    'wie viel bleibt vom nebenjob',
  ],
  formula:
    'Monatsverdienst = Stundenlohn × Stunden/Monat ; Netto-Zuverdienst = Monatsverdienst × (1 − Grenzsteuersatz%)',
  inputs: [
    { type: 'number', id: 'stundenlohn', label: 'Stundenlohn (brutto)', unit: '€', default: 15, min: 0.01, step: 0.5 },
    { type: 'number', id: 'stunden', label: 'Stunden pro Monat', unit: 'h', default: 30, min: 0, step: 1 },
    { type: 'number', id: 'steuersatz', label: 'Geschätzter Grenzsteuersatz', unit: '%', default: 0, min: 0, max: 60, step: 1, help: 'Bei einem Minijob (Steuerklasse, Pauschale durch Arbeitgeber) oft 0 %. Bei einem zweiten Arbeitsvertrag (Steuerklasse VI) meist deutlich höher.' },
    { type: 'number', id: 'minijobGrenze', label: 'Minijob-Grenze (Vergleich)', unit: '€', default: 603, min: 0, step: 1, help: 'Geringfügigkeitsgrenze Stand 2026: 603 €/Monat.' },
  ],
  compute: (v) => {
    const stundenlohn = num(v.stundenlohn);
    const stunden = num(v.stunden);
    const steuersatz = num(v.steuersatz) / 100;
    const grenze = num(v.minijobGrenze);

    const brutto = stundenlohn * stunden;
    const netto = brutto * (1 - steuersatz);
    const jahresNetto = netto * 12;
    const abstand = grenze - brutto;

    return [
      { label: 'Netto-Zuverdienst pro Monat', value: netto, unit: '€', digits: 2, primary: true, help: 'Bruttoverdienst abzüglich des geschätzten Grenzsteuersatzes.' },
      { label: 'Brutto-Zuverdienst pro Monat', value: brutto, unit: '€', digits: 2 },
      { label: 'Abstand zur Minijob-Grenze', value: abstand, unit: '€', digits: 2, help: 'Negativ bedeutet: Du liegst über der Minijob-Grenze.' },
      { label: 'Netto-Zuverdienst pro Jahr', value: jahresNetto, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wer neben dem Hauptjob etwas dazuverdient, sollte wissen, was netto übrig bleibt. Entscheidend ist die Art des Nebenjobs: Ein Minijob bis zur Geringfügigkeitsgrenze kann pauschal versteuert beim Arbeitnehmer komplett brutto = netto sein. Ein zweiter regulärer Job läuft dagegen über die ungünstige Steuerklasse VI. Dieser Rechner zeigt deinen Brutto- und Netto-Zuverdienst und den Abstand zur Minijob-Grenze – der Steuersatz ist eine Schätzung.',
  howto: [
    'Trage den Brutto-Stundenlohn deines Nebenjobs ein.',
    'Gib die monatlichen Arbeitsstunden an.',
    'Schätze deinen Grenzsteuersatz (Minijob oft 0 %, Steuerklasse VI deutlich höher).',
    'Lies Netto-Zuverdienst und Abstand zur Minijob-Grenze ab.',
  ],
  faq: [
    { q: 'Wann bleibt der Nebenjob steuerfrei?', a: 'Bei einem Minijob kann der Arbeitgeber die Steuer pauschal übernehmen, dann bleibt der Verdienst für dich brutto wie netto. Versteuerst du den Minijob über die Lohnsteuerkarte oder hast du einen zweiten regulären Job, fällt Lohnsteuer an.' },
    { q: 'Was ist Steuerklasse VI?', a: 'Ein zweiter sozialversicherungspflichtiger Job wird über Steuerklasse VI abgerechnet – die mit dem höchsten Abzug, da hier kein Grundfreibetrag berücksichtigt wird. Über die Steuererklärung kann sich am Jahresende ein Teil ausgleichen.' },
    { q: 'Ist der Steuersatz im Rechner exakt?', a: 'Nein. Der Grenzsteuersatz ist eine grobe Schätzung zur Orientierung (Stand 2026). Die tatsächliche Belastung hängt von deinem Gesamteinkommen, Steuerklasse und Sozialabgaben ab.' },
    { q: 'Darf mein Arbeitgeber den Nebenjob verbieten?', a: 'Eine generelle Nebentätigkeit darf nicht pauschal untersagt werden. Sie kann aber eingeschränkt sein, wenn sie mit dem Hauptjob konkurriert oder deine Arbeitsleistung beeinträchtigt. Oft besteht eine Anzeigepflicht.' },
  ],
  related: ['minijob-stunden-rechner', 'midijob-uebergangsbereich-rechner', 'netto-stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { stundenlohn: 15, stunden: 30, steuersatz: 0, minijobGrenze: 603 },
      expect: [
        { label: 'Brutto-Zuverdienst pro Monat', value: 450, tolerance: 0.01 },
        { label: 'Netto-Zuverdienst pro Monat', value: 450, tolerance: 0.01 },
        { label: 'Abstand zur Minijob-Grenze', value: 153, tolerance: 0.01 },
        { label: 'Netto-Zuverdienst pro Jahr', value: 5400, tolerance: 0.01 },
      ],
    },
    {
      values: { stundenlohn: 20, stunden: 40, steuersatz: 25, minijobGrenze: 603 },
      expect: [
        { label: 'Brutto-Zuverdienst pro Monat', value: 800, tolerance: 0.01 },
        { label: 'Netto-Zuverdienst pro Monat', value: 600, tolerance: 0.01 },
      ],
    },
  ],
};
