import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Betreuungskosten sind als Sonderausgaben absetzbar:
// 80 % der Kosten, max. 4.800 € pro Kind und Jahr (Stand 2026).
const ABZUGSQUOTE = 0.8;
const HOECHSTBETRAG = 4800;

export const tool: Tool = {
  slug: 'betreuungskosten-rechner',
  category: 'familie',
  title: 'Betreuungskosten absetzen – Rechner',
  shortTitle: 'Betreuungskosten',
  description:
    'Berechne den absetzbaren Anteil der Kinderbetreuungskosten: 80 % der Kosten, höchstens 4.800 € pro Kind und Jahr (Stand 2026).',
  keywords: [
    'betreuungskosten absetzen',
    'kinderbetreuungskosten rechner',
    'kita kosten absetzen',
    'betreuungskosten steuer',
    'sonderausgaben kinderbetreuung',
    'absetzbare betreuungskosten',
    'betreuungskosten anteil',
  ],
  intro:
    'Kinderbetreuungskosten – etwa für Kita, Tagesmutter oder Hort – lassen sich als Sonderausgaben von der Steuer absetzen. Abziehbar sind 80 % der Kosten, höchstens 4.800 € pro Kind und Jahr (Stand 2026). Dieser Rechner zeigt den absetzbaren Betrag und schätzt die mögliche Steuerersparnis anhand Ihres Grenzsteuersatzes.',
  formula:
    'Absetzbar = min(80 % × Kosten; 4.800 €) pro Kind/Jahr; Ersparnis ≈ Absetzbar × Grenzsteuersatz',
  inputs: [
    { type: 'number', id: 'kostenMonat', label: 'Betreuungskosten pro Monat', unit: '€', default: 300, min: 0, step: 10 },
    { type: 'number', id: 'monate', label: 'Monate pro Jahr', unit: 'Monate', default: 12, min: 1, max: 12, step: 1 },
    { type: 'number', id: 'steuersatz', label: 'Persönlicher Grenzsteuersatz', unit: '%', default: 30, min: 0, max: 45, step: 1, help: 'Zur Schätzung der Ersparnis' },
  ],
  compute: (v) => {
    const kostenMonat = Math.max(0, num(v.kostenMonat));
    let monate = Math.round(num(v.monate, 12));
    if (monate < 1) monate = 1;
    if (monate > 12) monate = 12;
    const steuersatz = Math.min(45, Math.max(0, num(v.steuersatz, 30)));
    const kostenJahr = kostenMonat * monate;
    const absetzbarRoh = kostenJahr * ABZUGSQUOTE;
    const absetzbar = Math.min(absetzbarRoh, HOECHSTBETRAG);
    const nichtAbsetzbar = kostenJahr - absetzbar;
    const ersparnis = absetzbar * (steuersatz / 100);
    return [
      { label: 'Absetzbarer Betrag pro Jahr', value: absetzbar, unit: '€', digits: 2, primary: true },
      { label: 'Betreuungskosten pro Jahr', value: kostenJahr, unit: '€', digits: 2 },
      { label: 'Nicht absetzbar', value: nichtAbsetzbar, unit: '€', digits: 2, help: 'Eigenanteil + Betrag über Höchstgrenze' },
      { label: 'Geschätzte Steuerersparnis', value: ersparnis, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Monatliche Betreuungskosten (Kita, Hort, Tagesmutter) eingeben.',
    'Anzahl der bezahlten Monate pro Jahr wählen.',
    'Persönlichen Grenzsteuersatz schätzen (oft 20 bis 42 %).',
    'Absetzbaren Betrag und mögliche Steuerersparnis ablesen.',
  ],
  faq: [
    { q: 'Wie viel der Betreuungskosten ist absetzbar?', a: '80 % der Aufwendungen, höchstens 4.800 € pro Kind und Jahr. Den Höchstbetrag erreicht man bei Kosten von 6.000 € im Jahr (Stand 2026).' },
    { q: 'Für welche Kinder gilt der Abzug?', a: 'Grundsätzlich für Kinder bis zum 14. Geburtstag. Bei Kindern mit Behinderung gelten erweiterte Regelungen.' },
    { q: 'Welche Kosten zählen dazu?', a: 'Gebühren für Kita, Krippe, Hort und Tagesmutter sowie Kinderfrau. Kosten für Verpflegung, Sport- oder Musikunterricht zählen nicht dazu.' },
    { q: 'Muss ich die Kosten überweisen?', a: 'Ja. Das Finanzamt erkennt nur unbare Zahlungen an – also Überweisungen mit Rechnung. Barzahlungen werden nicht akzeptiert.' },
    { q: 'Ist die Steuerersparnis exakt?', a: 'Nein, sie ist eine Schätzung auf Basis Ihres Grenzsteuersatzes. Der tatsächliche Effekt hängt von Ihrer gesamten Steuersituation ab (Stand 2026).' },
  ],
  related: ['kosten-kind-rechner', 'kindergeld-rechner', 'netto-vom-brutto-rechner'],
  examples: [
    {
      values: { kostenMonat: 300, monate: 12, steuersatz: 30 },
      expect: [
        { label: 'Betreuungskosten pro Jahr', value: 3600, tolerance: 0.01 },
        { label: 'Absetzbarer Betrag pro Jahr', value: 2880, tolerance: 0.01 },
        { label: 'Geschätzte Steuerersparnis', value: 864, tolerance: 0.01 },
      ],
    },
    {
      values: { kostenMonat: 600, monate: 12, steuersatz: 30 },
      expect: [{ label: 'Absetzbarer Betrag pro Jahr', value: 4800, tolerance: 0.01 }],
    },
  ],
  updated: '2026-06-18',
};
