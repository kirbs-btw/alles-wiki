import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'ueberholweg-rechner',
  category: 'auto',
  title: 'Überholweg-Rechner',
  shortTitle: 'Überholweg',
  description:
    'Berechne die Strecke, die du zum Überholen brauchst, aus den Geschwindigkeiten von überholendem und überholtem Fahrzeug sowie der Fahrzeuglänge.',
  keywords: [
    'überholweg berechnen',
    'überholstrecke rechner',
    'überholweg formel',
    'überholvorgang dauer',
    'überholen sicherheitsabstand',
    'überholweg landstraße',
  ],
  formula:
    'Überholweg = (Geschwindigkeit überholend / Differenz) × (Sicherheitsabstand vorher + Längen + Sicherheitsabstand nachher)',
  intro:
    'Beim Überholen auf der Landstraße ist die zurückgelegte Strecke entscheidend für die Sicherheit. Dieser Rechner schätzt Überholweg und -dauer aus den beteiligten Geschwindigkeiten, den Fahrzeuglängen und dem nötigen Sicherheitsabstand (vereinfachtes Modell mit konstanten Geschwindigkeiten).',
  inputs: [
    { type: 'number', id: 'vUeberholend', label: 'Geschwindigkeit überholend', unit: 'km/h', default: 100, min: 1, step: 5 },
    { type: 'number', id: 'vUeberholt', label: 'Geschwindigkeit überholtes Fahrzeug', unit: 'km/h', default: 80, min: 0, step: 5 },
    { type: 'number', id: 'laengeEigen', label: 'Länge eigenes Fahrzeug', unit: 'm', default: 4.5, min: 0, step: 0.5 },
    { type: 'number', id: 'laengeAndere', label: 'Länge überholtes Fahrzeug', unit: 'm', default: 12, min: 0, step: 0.5, help: 'z. B. Lkw mit 12 m' },
    { type: 'number', id: 'abstand', label: 'Sicherheitsabstand (je Seite)', unit: 'm', default: 30, min: 0, step: 5, help: 'Abstand vor und nach dem Überholen' },
  ],
  compute: (v) => {
    const vUeberholend = num(v.vUeberholend);
    const vUeberholt = num(v.vUeberholt);
    const laengeEigen = num(v.laengeEigen);
    const laengeAndere = num(v.laengeAndere);
    const abstand = num(v.abstand);
    const diffKmh = vUeberholend - vUeberholt;
    const ueberholstrecke = 2 * abstand + laengeEigen + laengeAndere; // Relativweg
    let weg = 0;
    let dauer = 0;
    if (diffKmh > 0) {
      const diffMs = diffKmh / 3.6;
      dauer = ueberholstrecke / diffMs; // Sekunden
      const vMs = vUeberholend / 3.6;
      weg = vMs * dauer; // eigener zurückgelegter Weg
    }
    const gegenverkehrWeg = diffKmh > 0 ? (vUeberholend / 3.6) * dauer * 2 : 0; // grobe Reserve bei Gegenverkehr gleicher Geschw.
    return [
      { label: 'Überholweg', value: weg, unit: 'm', digits: 0, primary: true },
      { label: 'Überholdauer', value: dauer, unit: 's', digits: 1 },
      { label: 'Geschwindigkeitsdifferenz', value: diffKmh, unit: 'km/h', digits: 0 },
      { label: 'Sichtweite mit Gegenverkehr', value: gegenverkehrWeg, unit: 'm', digits: 0, help: 'Falls Gegenverkehr mit gleicher Geschwindigkeit kommt' },
    ];
  },
  howto: [
    'Eigene Überholgeschwindigkeit und Tempo des überholten Fahrzeugs eintragen.',
    'Längen beider Fahrzeuge erfassen.',
    'Sicherheitsabstand je Seite angeben.',
    'Überholweg und benötigte freie Sichtweite ablesen.',
  ],
  faq: [
    { q: 'Warum ist die Geschwindigkeitsdifferenz so wichtig?', a: 'Je geringer der Tempounterschied, desto länger dauert das Überholen und desto mehr Strecke wird benötigt. Bei sehr kleiner Differenz steigt der Überholweg stark an.' },
    { q: 'Wie viel Sichtweite brauche ich bei Gegenverkehr?', a: 'Kommt Gegenverkehr mit ähnlicher Geschwindigkeit, musst du grob die doppelte eigene Überholstrecke frei einsehen können – der Rechner gibt dazu eine Orientierung.' },
    { q: 'Ist die Rechnung exakt?', a: 'Nein, sie nimmt konstante Geschwindigkeiten an und ignoriert die Beschleunigung während des Überholvorgangs. In der Praxis ist mehr Strecke einzuplanen.' },
  ],
  related: ['bremsweg-anhalteweg-rechner', 'drehzahl-geschwindigkeit-rechner', 'beschleunigung-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { vUeberholend: 100, vUeberholt: 80, laengeEigen: 4.5, laengeAndere: 12, abstand: 30 },
      // strecke = 60+4.5+12 = 76.5 ; diffMs = 20/3.6 = 5.5556 ; dauer = 76.5/5.5556 = 13.77 s
      // vMs = 100/3.6 = 27.778 ; weg = 27.778*13.77 = 382.5
      expect: [{ label: 'Überholweg', value: 382.5, tolerance: 2 }],
    },
    {
      values: { vUeberholend: 100, vUeberholt: 80, laengeEigen: 4.5, laengeAndere: 12, abstand: 30 },
      // dauer = 13.77 s
      expect: [{ label: 'Überholdauer', value: 13.8, tolerance: 0.2 }],
    },
  ],
};
