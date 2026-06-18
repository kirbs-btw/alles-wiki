import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kinderbetreuungskosten als Sonderausgaben absetzen.
// Abziehbar sind 80 % der Aufwendungen, höchstens 4.800 € je Kind und Jahr
// (seit 01.01.2025, gilt auch 2026). Den Höchstbetrag erreicht man bei 6.000 €
// jährlichen Kosten. Die Steuerersparnis ergibt sich aus dem absetzbaren Betrag
// und dem persönlichen Grenzsteuersatz. Etablierte Regelung.

const ANTEIL = 0.8;
const HOECHST = 4800; // je Kind und Jahr, Stand 2026

export const tool: Tool = {
  slug: 'kinderbetreuungskosten-steuer-rechner',
  category: 'familie',
  title: 'Kinderbetreuungskosten Steuer-Rechner',
  shortTitle: 'Betreuung absetzen',
  description:
    'Berechne den absetzbaren Anteil der Kinderbetreuungskosten: 80 % der Kosten, höchstens 4.800 € je Kind, plus Steuerersparnis (Stand 2026).',
  keywords: [
    'kinderbetreuungskosten absetzen',
    'betreuungskosten steuer rechner',
    'kita kosten steuer',
    'kinderbetreuung sonderausgaben',
    '80 prozent betreuungskosten',
    'betreuungskosten steuerersparnis',
  ],
  intro:
    'Eltern können Kinderbetreuungskosten als Sonderausgaben absetzen: 80 % der Aufwendungen, höchstens 4.800 € je Kind und Jahr (Stand 2026). Begünstigt sind etwa Kita, Tagesmutter oder Hort. Dieser Rechner ermittelt den absetzbaren Betrag und die ungefähre Steuerersparnis über Ihren Grenzsteuersatz.',
  formula:
    'Absetzbar = min(Kosten × 80 %; 4.800 €); Steuerersparnis = Absetzbar × Grenzsteuersatz',
  inputs: [
    { type: 'number', id: 'kosten', label: 'Betreuungskosten pro Jahr', unit: '€/Jahr', default: 4500, min: 0, max: 30000, step: 100, help: 'je Kind, z. B. Kita- oder Hortgebühren' },
    { type: 'number', id: 'satz', label: 'Persönlicher Grenzsteuersatz', unit: '%', default: 30, min: 0, max: 45, step: 1 },
  ],
  compute: (v) => {
    const kosten = Math.max(0, num(v.kosten, 4500));
    let satz = num(v.satz, 30);
    if (satz < 0) satz = 0;
    if (satz > 45) satz = 45;
    const anteilig = kosten * ANTEIL;
    const absetzbar = Math.min(anteilig, HOECHST);
    const ersparnis = absetzbar * (satz / 100);
    return [
      { label: 'Absetzbarer Betrag', value: absetzbar, unit: '€', digits: 2, primary: true },
      { label: '80 % der Kosten', value: anteilig, unit: '€', digits: 2 },
      { label: 'Steuerersparnis', value: ersparnis, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jährliche Betreuungskosten je Kind eingeben (z. B. Kita- oder Hortgebühren).',
    'Persönlichen Grenzsteuersatz eintragen.',
    'Absetzbaren Betrag (80 %, max. 4.800 €) und Steuerersparnis ablesen.',
  ],
  faq: [
    { q: 'Wie viel Betreuungskosten kann ich absetzen?', a: '80 % der nachgewiesenen Kosten, höchstens 4.800 € je Kind und Jahr (Stand 2026). Den Höchstbetrag erreicht man bei 6.000 € jährlichen Kosten.' },
    { q: 'Welche Kosten zählen?', a: 'Begünstigt sind etwa Kita, Kindergarten, Tagesmutter, Hort oder Babysitter. Verpflegung und Förderkurse zählen meist nicht dazu.' },
    { q: 'Bis zu welchem Alter?', a: 'In der Regel für Kinder bis zur Vollendung des 14. Lebensjahres, bei Behinderung unter weiteren Voraussetzungen länger.' },
    { q: 'Muss die Zahlung nachgewiesen werden?', a: 'Ja. Erforderlich sind eine Rechnung und die Überweisung; Barzahlungen werden vom Finanzamt nicht anerkannt.' },
  ],
  related: ['betreuungskosten-rechner', 'kita-beitrag-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { kosten: 4500, satz: 30 },
      expect: [
        { label: '80 % der Kosten', value: 3600, tolerance: 0.01 },
        { label: 'Absetzbarer Betrag', value: 3600, tolerance: 0.01 },
        { label: 'Steuerersparnis', value: 1080, tolerance: 0.01 },
      ],
    },
    {
      values: { kosten: 9000, satz: 42 },
      expect: [
        { label: 'Absetzbarer Betrag', value: 4800, tolerance: 0.01 },
        { label: 'Steuerersparnis', value: 2016, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
