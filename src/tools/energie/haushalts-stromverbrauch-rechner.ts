import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'haushalts-stromverbrauch-rechner',
  category: 'energie',
  title: 'Haushalts-Stromverbrauch-Rechner',
  shortTitle: 'Stromverbrauch',
  description:
    'Schätze den jährlichen Stromverbrauch deines Haushalts aus Personenzahl, Wohnform und Sonderverbrauchern wie Warmwasser, Wärmepumpe oder E-Auto.',
  keywords: [
    'stromverbrauch berechnen',
    'durchschnittlicher stromverbrauch haushalt',
    'stromverbrauch pro person',
    'wie viel strom verbraucht ein haushalt',
    'jahresstromverbrauch schätzen',
    'stromverbrauch rechner',
  ],
  intro:
    'Wie viel Strom verbraucht dein Haushalt im Jahr? Dieser Rechner schätzt den Jahresverbrauch in kWh auf Basis von Erfahrungswerten: ein Grundbedarf pro Person plus Zuschläge für die Wohnform und große Stromverbraucher. Wohnung verbraucht je Person etwas mehr als ein Haus (mehr gemeinsam genutzte Geräte im Haushalt verteilen sich auf mehr Personen). Die Werte sind Richtwerte (Stand 2026) und ersetzen nicht den Blick auf die eigene Stromrechnung.',
  formula:
    'Verbrauch = Grundbedarf/Person × Personen + Wohnform-Zuschlag + Warmwasser + Wärmepumpe + E-Auto',
  inputs: [
    { type: 'number', id: 'personen', label: 'Personen im Haushalt', unit: '', default: 3, min: 1, max: 10, step: 1 },
    {
      type: 'select',
      id: 'wohnform',
      label: 'Wohnform',
      default: 'haus',
      options: [
        { value: 'wohnung', label: 'Wohnung' },
        { value: 'haus', label: 'Einfamilienhaus' },
      ],
      help: 'Ein Haus hat oft zusätzliche Verbraucher (Außenbeleuchtung, Pumpen, Garage).',
    },
    {
      type: 'select',
      id: 'warmwasser',
      label: 'Warmwasser per Strom',
      default: 'nein',
      options: [
        { value: 'nein', label: 'Nein (Gas/Öl/Fernwärme)' },
        { value: 'ja', label: 'Ja (Durchlauferhitzer/Boiler)' },
      ],
      help: 'Elektrische Warmwasserbereitung erhöht den Stromverbrauch deutlich.',
    },
    { type: 'number', id: 'waermepumpe', label: 'Wärmepumpe (Heizstrom)', unit: 'kWh/Jahr', default: 0, min: 0, step: 100, help: '0 = keine. Einfamilienhaus typisch 3.000-6.000 kWh.' },
    { type: 'number', id: 'eauto', label: 'E-Auto Fahrleistung', unit: 'km/Jahr', default: 0, min: 0, step: 500, help: '0 = kein E-Auto. ~18 kWh je 100 km inkl. Ladeverlust.' },
  ],
  compute: (v) => {
    const personen = Math.max(1, num(v.personen));
    const wohnung = String(v.wohnform) === 'wohnung';
    const wwStrom = String(v.warmwasser) === 'ja';
    const wp = num(v.waermepumpe);
    const km = num(v.eauto);
    // Grundbedarf pro Person (ohne Warmwasser, ohne Heizstrom)
    const proPerson = wohnung ? 1100 : 1000;
    const grund = personen * proPerson;
    // Wohnform-Sockel (Haus: zusätzliche feste Verbraucher)
    const sockel = wohnung ? 200 : 700;
    // Elektrische Warmwasserbereitung: ~550 kWh je Person und Jahr
    const ww = wwStrom ? personen * 550 : 0;
    // E-Auto: 18 kWh je 100 km
    const eauto = (km / 100) * 18;
    const haushaltStrom = grund + sockel + ww;
    const gesamt = haushaltStrom + wp + eauto;
    return [
      { label: 'Stromverbrauch pro Jahr', value: gesamt, unit: 'kWh', digits: 0, primary: true },
      { label: 'Haushaltsstrom (ohne Heizen/E-Auto)', value: haushaltStrom, unit: 'kWh', digits: 0 },
      { label: 'davon Wärmepumpe', value: wp, unit: 'kWh', digits: 0 },
      { label: 'davon E-Auto', value: eauto, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'Anzahl der Personen im Haushalt eingeben.',
    'Wohnform wählen - Wohnung oder Einfamilienhaus.',
    'Angeben, ob Warmwasser elektrisch erzeugt wird.',
    'Heizstrom einer Wärmepumpe und die E-Auto-Fahrleistung ergänzen, falls vorhanden.',
    'Geschätzten Jahresstromverbrauch ablesen.',
  ],
  faq: [
    { q: 'Wie viel Strom verbraucht ein durchschnittlicher Haushalt?', a: 'Grobe Richtwerte ohne elektrisches Warmwasser: 1 Person ~1.500 kWh, 2 Personen ~2.500 kWh, 3 Personen ~3.400 kWh, 4 Personen ~4.000 kWh pro Jahr. Mit Durchlauferhitzer, Wärmepumpe oder E-Auto liegt der Verbrauch deutlich höher.' },
    { q: 'Warum verbraucht eine Wohnung pro Person mehr?', a: 'In kleineren Haushalten verteilen sich Geräte wie Kühlschrank, Router oder Beleuchtung auf weniger Personen. Pro Kopf ist der Verbrauch daher höher als in einem großen Haushalt - der Effekt sinkt mit jeder zusätzlichen Person.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Der Rechner nutzt Durchschnitts- und Erfahrungswerte (Stand 2026). Der reale Verbrauch hängt stark vom Verhalten, vom Gerätebestand und von dessen Alter ab und kann um 20-30 Prozent abweichen. Maßgeblich ist immer die Jahresabrechnung.' },
  ],
  related: ['stromkosten-rechner', 'waermepumpe-stromkosten-rechner', 'e-auto-ladekosten-rechner', 'standby-kosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { personen: 3, wohnform: 'haus', warmwasser: 'nein', waermepumpe: 0, eauto: 0 },
      expect: [
        { label: 'Stromverbrauch pro Jahr', value: 3700, tolerance: 0 },
        { label: 'Haushaltsstrom (ohne Heizen/E-Auto)', value: 3700, tolerance: 0 },
      ],
    },
    {
      values: { personen: 4, wohnform: 'haus', warmwasser: 'ja', waermepumpe: 4000, eauto: 10000 },
      expect: [{ label: 'Stromverbrauch pro Jahr', value: 12700, tolerance: 0 }],
    },
  ],
};
