import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'e-auto-ladekosten-rechner',
  category: 'energie',
  title: 'E-Auto Ladekosten-Rechner',
  shortTitle: 'Ladekosten',
  description:
    'Berechne die Stromkosten deines Elektroautos aus Verbrauch pro 100 km, Ladeverlusten und Strompreis - mit Kosten pro 100 km und pro Jahr.',
  keywords: [
    'e-auto ladekosten rechner',
    'elektroauto stromkosten',
    'ladekosten berechnen',
    'kosten pro 100 km elektroauto',
    'e-auto kosten pro km',
    'stromkosten elektroauto',
    'laden kosten kwh',
  ],
  intro:
    'Dieser Rechner zeigt, was das Laden deines Elektroautos kostet. Der Verbrauch pro 100 Kilometer mal dein Strompreis ergibt die Energiekosten je Strecke. Ladeverluste beim Laden (typisch 10-15 Prozent) werden berücksichtigt, damit die Rechnung realistisch bleibt.',
  formula: 'Kosten/100 km = Verbrauch ÷ (1 − Verluste) × Strompreis',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Verbrauch pro 100 km', unit: 'kWh', default: 18, min: 0, step: 0.5, help: 'Bordcomputer-Wert. Kleinwagen ~15, SUV ~22 kWh.' },
    { type: 'number', id: 'preis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 1, help: 'Hausstrom ~35, öffentlich AC ~50, Schnelllader ~70.' },
    { type: 'number', id: 'verluste', label: 'Ladeverluste', unit: '%', default: 12, min: 0, max: 50, step: 1, help: 'Energie, die beim Laden verloren geht.' },
    { type: 'number', id: 'jahreskm', label: 'Fahrleistung pro Jahr', unit: 'km', default: 15000, min: 0, step: 500 },
    { type: 'number', id: 'akku', label: 'Nutzbare Akkukapazität', unit: 'kWh', default: 60, min: 0, step: 1, help: 'Für die Kosten einer Vollladung.' },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const preis = num(v.preis) / 100;
    const verlustFaktor = 1 - num(v.verluste) / 100;
    const jahreskm = num(v.jahreskm);
    const akku = num(v.akku);
    const verbrauchAbLader = verlustFaktor > 0 ? verbrauch / verlustFaktor : verbrauch;
    const kostenPro100 = verbrauchAbLader * preis;
    const kostenJahr = (kostenPro100 / 100) * jahreskm;
    const ladungKwh = verlustFaktor > 0 ? akku / verlustFaktor : akku;
    const kostenLadung = ladungKwh * preis;
    return [
      { label: 'Kosten pro 100 km', value: kostenPro100, unit: '€', digits: 2, primary: true },
      { label: 'Kosten pro Jahr', value: kostenJahr, unit: '€', digits: 2 },
      { label: 'Kosten pro Vollladung', value: kostenLadung, unit: '€', digits: 2 },
      { label: 'Geladene Energie pro 100 km', value: verbrauchAbLader, unit: 'kWh', digits: 2 },
    ];
  },
  howto: [
    'Durchschnittsverbrauch pro 100 km aus dem Bordcomputer eintragen.',
    'Strompreis pro kWh deiner Lademöglichkeit eingeben.',
    'Ladeverluste schätzen (Wallbox AC ~12 %, Schnelllader weniger).',
    'Jahresfahrleistung und Akkukapazität ergänzen und Kosten ablesen.',
  ],
  faq: [
    { q: 'Warum spielen Ladeverluste eine Rolle?', a: 'Beim Laden geht Energie als Wärme verloren. Du zahlst die aus dem Netz gezogene Energie, das Auto speichert aber weniger. Üblich sind 10-15 Prozent Verlust an der heimischen Wallbox.' },
    { q: 'Was kostet 100 km mit dem E-Auto?', a: 'Bei 18 kWh/100 km und 35 ct/kWh sind es inklusive Verlusten rund 7 Euro. An teuren Schnellladern kann sich das mehr als verdoppeln.' },
    { q: 'Wie hoch ist der Verbrauch typischer E-Autos?', a: 'Kompakte Modelle liegen bei 15-18 kWh/100 km, größere Limousinen und SUV bei 20-25 kWh. Winter und Autobahn erhöhen den Wert deutlich.' },
    { q: 'Lohnt sich Hausstrom gegenüber Schnellladen?', a: 'Fast immer. Hausstrom kostet oft 30-40 ct/kWh, Schnelllader 60-80 ct/kWh. Wer überwiegend zu Hause oder mit eigener PV-Anlage lädt, fährt am günstigsten.' },
  ],
  related: ['kwh-kosten-rechner', 'pv-ertrag-rechner', 'stromkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { verbrauch: 18, preis: 35, verluste: 12, jahreskm: 15000, akku: 60 },
      expect: [
        { label: 'Geladene Energie pro 100 km', value: 20.4545, tolerance: 0.01 },
        { label: 'Kosten pro 100 km', value: 7.159, tolerance: 0.01 },
      ],
    },
  ],
};
