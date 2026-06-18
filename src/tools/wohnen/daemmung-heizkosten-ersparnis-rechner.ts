import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'daemmung-heizkosten-ersparnis-rechner',
  category: 'wohnen',
  title: 'Dämmung-Heizkosten-Ersparnis-Rechner',
  shortTitle: 'Dämmung-Ersparnis',
  description:
    'Schätze, wie viel Heizenergie und Heizkosten eine bessere Dämmung spart – aus Bauteilfläche, altem und neuem U-Wert sowie Energiepreis.',
  keywords: [
    'dämmung ersparnis berechnen',
    'heizkosten dämmung rechner',
    'u-wert ersparnis',
    'fassadendämmung sparen',
    'wärmedämmung heizkosten',
    'dämmung amortisation',
  ],
  formula:
    'Verlust = U-Wert × Fläche × Gradtagzahl × 24 / 1000 (kWh/Jahr); Ersparnis = (U_alt − U_neu) × Fläche × Gradtagzahl × 24 / 1000 × Energiepreis',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Bauteilfläche (z. B. Außenwand)', unit: 'm²', default: 100, min: 1, step: 1, help: 'Fläche des zu dämmenden Bauteils, z. B. Fassade oder Dach.' },
    { type: 'number', id: 'uAlt', label: 'U-Wert vorher', unit: 'W/m²K', default: 1.4, min: 0.05, step: 0.05, help: 'Ungedämmte Wand ca. 1,2–1,6; alte Häuser oft höher.' },
    { type: 'number', id: 'uNeu', label: 'U-Wert nachher', unit: 'W/m²K', default: 0.24, min: 0.05, step: 0.01, help: 'GEG-Anforderung Außenwand ca. 0,24 W/m²K.' },
    { type: 'number', id: 'gradtage', label: 'Gradtagzahl (Kelvintage)', unit: 'Kd/a', default: 3500, min: 1000, max: 5000, step: 100, help: 'Deutschland-Mittel ca. 3.500 Kelvintage pro Jahr.' },
    { type: 'number', id: 'preis', label: 'Energiepreis', unit: '€/kWh', default: 0.12, min: 0.01, step: 0.01, help: 'Gas 2026 ca. 0,11–0,14 €/kWh, Strom (Wärmepumpe) höher.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const uAlt = num(v.uAlt);
    const uNeu = num(v.uNeu);
    const gradtage = num(v.gradtage);
    const preis = num(v.preis);
    const faktor = (flaeche * gradtage * 24) / 1000;
    const verlustAlt = uAlt * faktor;
    const verlustNeu = uNeu * faktor;
    const kwhErsparnis = Math.max(verlustAlt - verlustNeu, 0);
    const kostenErsparnis = kwhErsparnis * preis;
    return [
      { label: 'Jährliche Kostenersparnis', value: kostenErsparnis, unit: '€/Jahr', digits: 2, primary: true },
      { label: 'Eingesparte Energie', value: kwhErsparnis, unit: 'kWh/Jahr', digits: 0 },
      { label: 'Wärmeverlust vorher', value: verlustAlt, unit: 'kWh/Jahr', digits: 0 },
      { label: 'Wärmeverlust nachher', value: verlustNeu, unit: 'kWh/Jahr', digits: 0 },
    ];
  },
  intro:
    'Eine Dämmung senkt den Wärmedurchgang durch ein Bauteil, ausgedrückt im U-Wert (W/m²K). Je niedriger der U-Wert, desto weniger Heizwärme geht verloren. Der Rechner vergleicht den Wärmeverlust vor und nach der Dämmung über ein Heizjahr und schätzt daraus die Energie- und Kostenersparnis. Die Berechnung ist eine vereinfachte Näherung: Sie nutzt die Gradtagzahl und berücksichtigt keine solaren Gewinne, Wärmebrücken oder den Anlagenwirkungsgrad.',
  howto: [
    'Fläche des zu dämmenden Bauteils eingeben (z. B. Außenwand).',
    'Alten U-Wert (ungedämmt) und neuen U-Wert (nach Dämmung) eintragen.',
    'Gradtagzahl deiner Region wählen – Deutschland-Mittel rund 3.500.',
    'Energiepreis je kWh angeben und jährliche Ersparnis ablesen.',
  ],
  faq: [
    { q: 'Was ist der U-Wert?', a: 'Der Wärmedurchgangskoeffizient gibt an, wie viel Wärme pro m², Grad Temperaturunterschied und Sekunde durch ein Bauteil verloren geht (Einheit W/m²K). Eine ungedämmte Altbauwand hat oft 1,2–1,6, eine gut gedämmte Wand etwa 0,2.' },
    { q: 'Was bedeutet die Gradtagzahl?', a: 'Sie summiert über das Jahr die Temperaturunterschiede zwischen Innen- und Außentemperatur an Heiztagen. In Deutschland liegt sie im Mittel bei rund 3.500 Kelvintagen und ist die Basis für die Verlustberechnung.' },
    { q: 'Wie genau ist das Ergebnis?', a: 'Es ist eine Näherung. In der Praxis beeinflussen Wärmebrücken, Luftdichtheit, solare Gewinne und der Wirkungsgrad der Heizung das Ergebnis. Für eine belastbare Aussage hilft eine Energieberatung.' },
    { q: 'Lohnt sich eine Dämmung finanziell?', a: 'Das hängt von Fläche, U-Wert-Verbesserung, Energiepreis und Investitionskosten ab. Teile die Dämmkosten durch die jährliche Ersparnis, um die Amortisationszeit grob zu schätzen – Förderungen verkürzen sie deutlich.' },
  ],
  related: ['heizkosten-rechner', 'co2-abgabe-heizung-rechner', 'gaskosten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 100, uAlt: 1.4, uNeu: 0.24, gradtage: 3500, preis: 0.12 },
      expect: [
        { label: 'Jährliche Kostenersparnis', value: 1169.28, tolerance: 0.5 },
        { label: 'Eingesparte Energie', value: 9744, tolerance: 1 },
        { label: 'Wärmeverlust vorher', value: 11760, tolerance: 1 },
      ],
    },
    {
      values: { flaeche: 50, uAlt: 1.0, uNeu: 0.2, gradtage: 3500, preis: 0.1 },
      expect: [
        { label: 'Eingesparte Energie', value: 3360, tolerance: 1 },
        { label: 'Jährliche Kostenersparnis', value: 336, tolerance: 0.5 },
      ],
    },
  ],
};
