import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'reichweite-rechner',
  category: 'auto',
  title: 'Reichweite-Rechner (E-Auto & Verbrenner)',
  shortTitle: 'Reichweite',
  description:
    'Berechne die Reichweite deines Autos aus Akku- bzw. Tankinhalt und Verbrauch – für Elektroautos in kWh und für Verbrenner in Litern.',
  keywords: [
    'reichweite e auto berechnen',
    'reichweite elektroauto rechner',
    'reichweite tankfüllung',
    'wie weit komme ich rechner',
    'reichweite akku kwh',
    'restreichweite berechnen',
    'kilometer pro tankfüllung',
  ],
  formula: 'Reichweite = Energie-/Tankinhalt / Verbrauch × 100',
  inputs: [
    {
      type: 'select', id: 'typ', label: 'Antriebsart', default: 'elektro',
      options: [
        { value: 'elektro', label: 'Elektroauto (kWh)' },
        { value: 'verbrenner', label: 'Verbrenner (Liter)' },
      ],
    },
    { type: 'number', id: 'inhalt', label: 'Akku- bzw. Tankinhalt', default: 60, min: 0, step: 0.5, help: 'kWh beim E-Auto, Liter beim Verbrenner.' },
    { type: 'number', id: 'verbrauch', label: 'Verbrauch je 100 km', default: 18, min: 0, step: 0.1, help: 'kWh/100 km bzw. l/100 km.' },
    { type: 'number', id: 'fuellstand', label: 'Aktueller Füllstand', unit: '%', default: 100, min: 0, max: 100, step: 1 },
    { type: 'number', id: 'reserve', label: 'Reserve (nicht nutzen)', unit: '%', default: 0, min: 0, max: 50, step: 1, help: 'Puffer, den du nicht verfahren willst.' },
  ],
  compute: (v) => {
    const typ = String(v.typ || 'elektro');
    const inhalt = num(v.inhalt);
    const verbrauch = num(v.verbrauch);
    const fuellstand = num(v.fuellstand);
    const reserve = num(v.reserve);
    const einheit = typ === 'verbrenner' ? 'l' : 'kWh';
    const maxReichweite = verbrauch > 0 ? (inhalt / verbrauch) * 100 : 0;
    const nutzbarerAnteil = Math.max(0, fuellstand - reserve) / 100;
    const aktuelleReichweite = verbrauch > 0 ? (inhalt * nutzbarerAnteil / verbrauch) * 100 : 0;
    const verfuegbareEnergie = inhalt * (fuellstand / 100);
    return [
      { label: 'Aktuelle Reichweite', value: aktuelleReichweite, unit: 'km', digits: 0, primary: true },
      { label: 'Maximale Reichweite (voll)', value: maxReichweite, unit: 'km', digits: 0 },
      { label: 'Verfügbarer Energie-/Tankinhalt', value: verfuegbareEnergie, unit: einheit, digits: 1 },
    ];
  },
  intro:
    'Wie weit komme ich noch? Aus dem aktuellen Füllstand und dem Verbrauch lässt sich die verbleibende Reichweite gut abschätzen – für E-Autos in kWh und für Verbrenner in Litern. Mit einem Reserve-Puffer planst du sicher, ohne mit leerem Tank oder Akku liegenzubleiben.',
  howto: [
    'Antriebsart wählen: Elektroauto (kWh) oder Verbrenner (Liter).',
    'Akku- bzw. Tankinhalt und den Verbrauch je 100 km eintragen.',
    'Aktuellen Füllstand in Prozent angeben.',
    'Optional eine Reserve einplanen, die du nicht verfahren möchtest.',
  ],
  faq: [
    { q: 'Warum schwankt die reale Reichweite so stark?', a: 'Tempo, Topografie, Außentemperatur, Heizung/Klimaanlage, Beladung und Fahrstil beeinflussen den Verbrauch erheblich – beim E-Auto im Winter oft 20–30 % mehr.' },
    { q: 'Wie viel Reserve ist sinnvoll?', a: 'Beim E-Auto sind 10–20 % Puffer praktisch, um sicher die nächste Ladesäule zu erreichen. Beim Verbrenner reicht meist die werkseitige Reserve.' },
    { q: 'Stimmt die Reichweitenanzeige im Auto?', a: 'Sie schätzt aus dem bisherigen Verbrauch und ist nur ein Richtwert. Bei wechselndem Fahrprofil kann sie deutlich daneben liegen.' },
    { q: 'Gilt der Rechner auch für Hybride?', a: 'Für den rein elektrischen Anteil ja. Den Verbrennerteil rechnest du separat mit der Antriebsart „Verbrenner".' },
  ],
  related: ['e-auto-ladekosten-rechner', 'durchschnittsverbrauch-rechner', 'spritkosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { typ: 'elektro', inhalt: 60, verbrauch: 18, fuellstand: 100, reserve: 0 },
      expect: [{ label: 'Maximale Reichweite (voll)', value: 333, tolerance: 1 }],
    },
    {
      values: { typ: 'verbrenner', inhalt: 50, verbrauch: 7, fuellstand: 50, reserve: 0 },
      expect: [{ label: 'Aktuelle Reichweite', value: 357, tolerance: 1 }],
    },
  ],
};
