import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'wltp-realverbrauch-rechner',
  category: 'auto',
  title: 'WLTP- vs. Realverbrauch-Rechner',
  shortTitle: 'WLTP vs. Real',
  description:
    'Schätze den realen Spritverbrauch aus dem WLTP-Normwert über einen Aufschlag und vergleiche die Mehrkosten gegenüber dem Prospektwert.',
  keywords: [
    'wltp realverbrauch rechner',
    'wltp echter verbrauch',
    'normverbrauch realverbrauch',
    'wltp aufschlag berechnen',
    'realer spritverbrauch schätzen',
    'verbrauch prospekt vs realität',
  ],
  formula:
    'Realverbrauch = WLTP-Wert × (1 + Aufschlag%/100); Mehrkosten = (Real − WLTP)/100 × km × Preis',
  intro:
    'Der WLTP-Normverbrauch aus dem Prospekt wird unter standardisierten Bedingungen ermittelt und liegt fast immer unter dem Alltagsverbrauch. Realistische Aufschläge bewegen sich je nach Fahrweise und Strecke häufig zwischen 10 und 25 Prozent. Dieser Rechner schätzt den Realverbrauch und die jährlichen Mehrkosten – als Näherung, nicht als Garantie.',
  inputs: [
    { type: 'number', id: 'wltp', label: 'WLTP-Verbrauch', unit: 'l/100 km', default: 5.5, min: 0.1, step: 0.1, help: 'Wert aus Prospekt/Datenblatt' },
    { type: 'number', id: 'aufschlag', label: 'Realitäts-Aufschlag', unit: '%', default: 15, min: 0, max: 60, step: 1, help: 'Erfahrungswert 10–25 %' },
    { type: 'number', id: 'jahreskm', label: 'Fahrleistung pro Jahr', unit: 'km', default: 15000, min: 0, step: 500 },
    { type: 'number', id: 'preis', label: 'Spritpreis', unit: 'EUR/l', default: 1.75, min: 0, step: 0.01 },
  ],
  compute: (v) => {
    const wltp = num(v.wltp);
    const aufschlag = num(v.aufschlag);
    const jahreskm = num(v.jahreskm);
    const preis = num(v.preis);
    const real = wltp * (1 + aufschlag / 100);
    const mehrverbrauch = real - wltp;
    const litProJahrReal = (real / 100) * jahreskm;
    const litProJahrWltp = (wltp / 100) * jahreskm;
    const mehrkostenJahr = (litProJahrReal - litProJahrWltp) * preis;
    const kostenJahrReal = litProJahrReal * preis;
    return [
      { label: 'Geschätzter Realverbrauch', value: real, unit: 'l/100 km', digits: 2, primary: true },
      { label: 'Mehrverbrauch ggü. WLTP', value: mehrverbrauch, unit: 'l/100 km', digits: 2 },
      { label: 'Spritkosten pro Jahr (real)', value: kostenJahrReal, unit: 'EUR', digits: 2 },
      { label: 'Mehrkosten pro Jahr', value: mehrkostenJahr, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'WLTP-Verbrauch aus dem Datenblatt oder Prospekt eintragen.',
    'Realitäts-Aufschlag schätzen (häufig 10–25 %).',
    'Jährliche Fahrleistung und aktuellen Spritpreis ergänzen.',
    'Realverbrauch und Mehrkosten gegenüber dem Normwert ablesen.',
  ],
  faq: [
    { q: 'Warum weicht der reale Verbrauch ab?', a: 'Der WLTP-Zyklus läuft unter Idealbedingungen ohne Klimaanlage-Dauerlast, mit definierter Beladung und Fahrweise. Im Alltag erhöhen Kurzstrecke, Stadtverkehr, Tempo und Witterung den Verbrauch.' },
    { q: 'Wie groß ist der Aufschlag typischerweise?', a: 'Als grobe Näherung liegen Realwerte oft 10 bis 25 Prozent über dem WLTP-Wert. Bei Plug-in-Hybriden und sehr sparsamer Fahrweise kann die Spanne stark abweichen.' },
    { q: 'Ist das exakt?', a: 'Nein, es ist eine Schätzung. Der tatsächliche Verbrauch hängt von Fahrprofil, Topografie, Beladung und Witterung ab. Für genaue Werte nutze den Durchschnittsverbrauch-Rechner mit deinen Tankdaten.' },
  ],
  related: ['durchschnittsverbrauch-rechner', 'spritkosten-rechner', 'pendler-spritkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { wltp: 5.5, aufschlag: 15, jahreskm: 15000, preis: 1.75 },
      // real = 5.5*1.15 = 6.325 ; mehr = 0.825 ; litRealJahr = 6.325/100*15000 = 948.75 ; kostenReal = 948.75*1.75 = 1660.3125
      expect: [{ label: 'Geschätzter Realverbrauch', value: 6.325, tolerance: 0.01 }],
    },
    {
      values: { wltp: 6, aufschlag: 20, jahreskm: 20000, preis: 1.8 },
      // real = 7.2 ; mehr = 1.2 ; mehrlit = 1.2/100*20000 = 240 ; mehrkosten = 240*1.8 = 432
      expect: [{ label: 'Mehrkosten pro Jahr', value: 432, tolerance: 0.5 }],
    },
  ],
};
