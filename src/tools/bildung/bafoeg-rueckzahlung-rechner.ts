import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bafoeg-rueckzahlung-rechner',
  category: 'bildung',
  title: 'BAfoeG-Rueckzahlung-Rechner (vereinfacht)',
  shortTitle: 'BAfoeG-Rueckzahlung',
  description:
    'Schaetze deine BAfoeG-Rueckzahlung: zinslose Rate, Anzahl der Monate und Ersparnis durch eine Einmalzahlung mit Nachlass nach den aktuellen Regeln.',
  keywords: [
    'bafoeg rueckzahlung berechnen',
    'bafoeg zurueckzahlen',
    'bafoeg rate',
    'bafoeg einmalzahlung nachlass',
    'wie viel bafoeg zurueckzahlen',
    'bafoeg darlehen rechner',
    'bafoeg tilgung',
  ],
  intro:
    'Studierenden-BAfoeG wird zur Haelfte als Zuschuss und zur Haelfte als zinsloses Staatsdarlehen gezahlt; nur der Darlehensteil ist zurueckzuzahlen. Die Rueckzahlung ist auf hoechstens 10.010 Euro gedeckelt und erfolgt in Raten von mindestens 130 Euro pro Monat. Wer den Restbetrag auf einmal zahlt, erhaelt einen Nachlass. Dieses Tool rechnet vereinfacht Rate, Laufzeit und moegliche Ersparnis (Stand 2026).',
  formula: 'Schuld = min(Darlehensbetrag; 10.010 €); Monate = Schuld / Rate; aufgerundet',
  inputs: [
    { type: 'number', id: 'darlehen', label: 'Darlehensbetrag (Rueckzahlungsteil)', unit: '€', default: 8000, min: 0, step: 100, help: 'Nur die Haelfte des erhaltenen BAfoeG ist Darlehen.' },
    { type: 'number', id: 'rate', label: 'Monatliche Rate', unit: '€', default: 130, min: 130, step: 10, help: 'Mindestrate 130 € pro Monat (45 € je Monat im Schnitt mehr moeglich).' },
    { type: 'number', id: 'nachlass', label: 'Nachlass bei Einmalzahlung', unit: '%', default: 21, min: 0, max: 50, step: 1, help: 'Prozentualer Nachlass auf den Restbetrag bei vorzeitiger Komplettzahlung.' },
  ],
  compute: (v) => {
    const darlehen = num(v.darlehen);
    const rate = num(v.rate) >= 130 ? num(v.rate) : 130;
    const nachlass = Math.max(0, Math.min(100, num(v.nachlass)));
    // Deckelung der Rueckzahlung auf 10.010 Euro
    const schuld = Math.min(darlehen, 10010);
    const monate = rate > 0 ? Math.ceil(schuld / rate) : 0;
    const jahre = monate / 12;
    const einmalbetrag = schuld * (1 - nachlass / 100);
    const ersparnis = schuld - einmalbetrag;
    return [
      { label: 'Rueckzahlbare Schuld', value: schuld, digits: 2, unit: '€', primary: true },
      { label: 'Anzahl Monatsraten', value: monate, digits: 0 },
      { label: 'Laufzeit', value: jahre, digits: 1, unit: 'Jahre' },
      { label: 'Einmalzahlung mit Nachlass', value: einmalbetrag, digits: 2, unit: '€' },
      { label: 'Ersparnis durch Einmalzahlung', value: ersparnis, digits: 2, unit: '€' },
    ];
  },
  howto: [
    'Den Darlehensanteil eintragen – das ist in der Regel die Haelfte des erhaltenen BAfoeG.',
    'Die monatliche Rate angeben (mindestens 130 Euro).',
    'Optional den Nachlass-Prozentsatz fuer eine Einmalzahlung eintragen.',
    'Schuld, Laufzeit und moegliche Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Wie viel BAfoeG muss ich zurueckzahlen?', a: 'Nur der Darlehensanteil, also etwa die Haelfte des erhaltenen Studierenden-BAfoeG. Die Rueckzahlung ist auf hoechstens 10.010 Euro begrenzt – auch wenn der Darlehensteil hoeher war (Stand 2026).' },
    { q: 'Wie hoch ist die monatliche Rate?', a: 'Die Mindestrate betraegt 130 Euro pro Monat, ueblich gezahlt in Vierteljahresraten von 390 Euro. Du kannst freiwillig hoehere Raten leisten, um schneller schuldenfrei zu sein.' },
    { q: 'Lohnt sich eine Einmalzahlung?', a: 'Wer die Restschuld auf einmal begleicht, bekommt einen prozentualen Nachlass. Die genaue Hoehe richtet sich nach dem Restbetrag – je groesser die Summe, desto hoeher faellt der Nachlass aus. Das Tool rechnet mit deinem eingegebenen Prozentsatz.' },
    { q: 'Fallen Zinsen an?', a: 'Nein. Das BAfoeG-Darlehen ist zinslos, solange du es fristgerecht tilgst. Bei Zahlungsverzug koennen jedoch Gebuehren oder Verzugszinsen hinzukommen.' },
    { q: 'Wann beginnt die Rueckzahlung?', a: 'Die Rueckzahlung startet rund fuenf Jahre nach dem Ende der Foerderungshoechstdauer. Das Bundesverwaltungsamt schickt dazu einen Bescheid. Bei geringem Einkommen kannst du eine Freistellung beantragen.' },
  ],
  related: ['studienkosten-rechner', 'stundenlohn-rechner', 'ects-noten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { darlehen: 8000, rate: 130, nachlass: 21 },
      expect: [
        { label: 'Rueckzahlbare Schuld', value: 8000, tolerance: 0.01 },
        { label: 'Anzahl Monatsraten', value: 62, tolerance: 0.001 },
        { label: 'Einmalzahlung mit Nachlass', value: 6320, tolerance: 0.01 },
      ],
    },
    {
      values: { darlehen: 15000, rate: 130, nachlass: 0 },
      expect: [{ label: 'Rueckzahlbare Schuld', value: 10010, tolerance: 0.01 }],
    },
  ],
};
