import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Kinderbetreuungskosten als Sonderausgaben absetzen.
// Abziehbar sind zwei Drittel der Aufwendungen, höchstens 4.800 € je Kind und Jahr
// (Stand 2026). Die Steuerersparnis ergibt sich aus dem absetzbaren Betrag und
// dem persönlichen Grenzsteuersatz. Etablierte Regelung.

const ANTEIL = 2 / 3;
const HOECHST = 4800; // je Kind und Jahr, Stand 2026

export const tool: Tool = {
  slug: 'kinderbetreuungskosten-steuer-rechner',
  category: 'familie',
  title: 'Kinderbetreuungskosten Steuer-Rechner',
  shortTitle: 'Betreuung absetzen',
  description:
    'Berechne den absetzbaren Anteil der Kinderbetreuungskosten: zwei Drittel der Kosten, höchstens 4.800 € je Kind, plus Steuerersparnis (Stand 2026).',
  keywords: [
    'kinderbetreuungskosten absetzen',
    'betreuungskosten steuer rechner',
    'kita kosten steuer',
    'kinderbetreuung sonderausgaben',
    'zwei drittel betreuungskosten',
    'betreuungskosten steuerersparnis',
  ],
  intro:
    'Eltern können Kinderbetreuungskosten als Sonderausgaben absetzen: zwei Drittel der Aufwendungen, höchstens 4.800 € je Kind und Jahr (Stand 2026). Begünstigt sind etwa Kita, Tagesmutter oder Hort. Dieser Rechner ermittelt den absetzbaren Betrag und die ungefähre Steuerersparnis über Ihren Grenzsteuersatz.',
  formula:
    'Absetzbar = min(Kosten × 2/3; 4.800 €); Steuerersparnis = Absetzbar × Grenzsteuersatz',
  inputs: [
    { type: 'number', id: 'kosten', label: 'Betreuungskosten pro Jahr', unit: '€/Jahr', default: 4500, min: 0, max: 30000, step: 100, help: 'je Kind, z. B. Kita- oder Hortgebühren' },
    { type: 'number', id: 'satz', label: 'Persönlicher Grenzsteuersatz', unit: '%', default: 30, min: 0, max: 45, step: 1 },
  ],
  compute: (v) => {
    const kosten = Math.max(0, num(v.kosten, 4500));
    let satz = num(v.satz, 30);
    if (satz < 0) satz = 0;
    if (satz > 45) satz = 45;
    const zweiDrittel = kosten * ANTEIL;
    const absetzbar = Math.min(zweiDrittel, HOECHST);
    const ersparnis = absetzbar * (satz / 100);
    return [
      { label: 'Absetzbarer Betrag', value: absetzbar, unit: '€', digits: 2, primary: true },
      { label: 'Zwei Drittel der Kosten', value: zweiDrittel, unit: '€', digits: 2 },
      { label: 'Steuerersparnis', value: ersparnis, unit: '€', digits: 2 },
    ];
  },
  howto: [
    'Jährliche Betreuungskosten je Kind eingeben (z. B. Kita- oder Hortgebühren).',
    'Persönlichen Grenzsteuersatz eintragen.',
    'Absetzbaren Betrag (zwei Drittel, max. 4.800 €) und Steuerersparnis ablesen.',
  ],
  faq: [
    { q: 'Wie viel Betreuungskosten kann ich absetzen?', a: 'Zwei Drittel der nachgewiesenen Kosten, höchstens 4.800 € je Kind und Jahr (Stand 2026). Den Höchstbetrag erreicht man bei rund 7.200 € jährlichen Kosten.' },
    { q: 'Welche Kosten zählen?', a: 'Begünstigt sind etwa Kita, Kindergarten, Tagesmutter, Hort oder Babysitter. Verpflegung und Förderkurse zählen meist nicht dazu.' },
    { q: 'Bis zu welchem Alter?', a: 'In der Regel für Kinder bis zur Vollendung des 14. Lebensjahres, bei Behinderung unter weiteren Voraussetzungen länger.' },
    { q: 'Muss die Zahlung nachgewiesen werden?', a: 'Ja. Erforderlich sind eine Rechnung und die Überweisung; Barzahlungen werden vom Finanzamt nicht anerkannt.' },
  ],
  related: ['betreuungskosten-rechner', 'kita-beitrag-rechner', 'kosten-kind-rechner'],
  examples: [
    {
      values: { kosten: 4500, satz: 30 },
      expect: [
        { label: 'Zwei Drittel der Kosten', value: 3000, tolerance: 0.01 },
        { label: 'Absetzbarer Betrag', value: 3000, tolerance: 0.01 },
        { label: 'Steuerersparnis', value: 900, tolerance: 0.01 },
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
