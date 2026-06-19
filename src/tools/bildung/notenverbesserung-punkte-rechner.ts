import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'notenverbesserung-punkte-rechner',
  category: 'bildung',
  title: 'Notenverbesserung: noetige Punkte berechnen',
  shortTitle: 'Noetige Punkte',
  description:
    'Berechne, wie viele Punkte du in den restlichen Pruefungen brauchst, um deine Wunsch-Prozentmarke (z. B. Bestehensgrenze oder Notenstufe) zu erreichen.',
  keywords: [
    'noetige punkte berechnen',
    'wie viele punkte zum bestehen',
    'punkte fuer note rechner',
    'notenverbesserung punkte',
    'restpunkte berechnen',
    'punkte bis ziel klausur',
  ],
  intro:
    'In vielen Pruefungen sammelst du Punkte ueber mehrere Teile (Klausuren, Aufgaben, Module). Dieses Tool rechnet aus, wie viele Punkte du aus den verbleibenden, noch erreichbaren Punkten holen musst, um eine Ziel-Prozentmarke zu erreichen – etwa die Bestehensgrenze von 50 Prozent oder die Schwelle fuer eine bessere Notenstufe. Es zieht deine bereits erreichten Punkte vom Gesamtziel ab. Liegt das Ziel hoeher als die noch erreichbaren Punkte, ist es rechnerisch nicht mehr moeglich; ist es bereits sicher, brauchst du keine weiteren Punkte.',
  formula: 'Noetig = Zielanteil × Gesamtpunkte − bereits erreichte Punkte (Gesamt = erreicht + Maximum + Rest)',
  inputs: [
    { type: 'number', id: 'erreicht', label: 'Bereits erreichte Punkte', default: 60, min: 0, step: 1 },
    { type: 'number', id: 'rest', label: 'Noch erreichbare Punkte', default: 100, min: 0, step: 1, help: 'Maximalpunkte der ausstehenden Pruefungen.' },
    { type: 'number', id: 'ziel', label: 'Ziel-Prozentmarke', unit: '%', default: 50, min: 0, max: 100, step: 1, help: 'Z. B. 50 % zum Bestehen.' },
  ],
  compute: (v) => {
    const erreicht = num(v.erreicht);
    const rest = num(v.rest);
    const zielProzent = num(v.ziel);
    const gesamt = erreicht + rest;
    const zielPunkte = (zielProzent / 100) * gesamt;
    const noetigRoh = zielPunkte - erreicht;
    let status: string;
    let noetigAnzeige = noetigRoh;
    if (noetigRoh <= 0) {
      status = 'Ziel bereits sicher erreicht';
      noetigAnzeige = 0;
    } else if (noetigRoh > rest) {
      status = 'Rechnerisch nicht mehr erreichbar';
    } else {
      status = 'Erreichbar';
    }
    const anteilRest = rest > 0 ? (Math.max(0, noetigRoh) / rest) * 100 : 0;
    return [
      { label: 'Benoetigte Punkte (Rest)', value: Math.max(0, noetigAnzeige), digits: 1, primary: true },
      { label: 'Status', value: status },
      { label: 'Noetiger Anteil der Restpunkte', value: Math.min(100, anteilRest), unit: '%', digits: 1 },
      { label: 'Gesamtpunkte (Maximum)', value: gesamt, digits: 0 },
      { label: 'Zielpunkte gesamt', value: zielPunkte, digits: 1 },
    ];
  },
  howto: [
    'Bereits erreichte Punkte eintragen.',
    'Noch erreichbare Maximalpunkte der ausstehenden Pruefungen angeben.',
    'Ziel-Prozentmarke waehlen (z. B. 50 % zum Bestehen oder Schwelle einer Notenstufe).',
    'Benoetigte Restpunkte und Erreichbarkeit ablesen.',
  ],
  faq: [
    { q: 'Wie nutze ich das fuer eine bestimmte Note?', a: 'Trage die Prozentschwelle der Wunschnote ein. Viele Notenschluessel ordnen z. B. ab 85 % eine 2 und ab 50 % ein Bestehen zu. Pruefe den Schluessel deiner Pruefung und setze die passende Marke ein.' },
    { q: 'Was bedeutet "nicht mehr erreichbar"?', a: 'Selbst wenn du alle verbleibenden Punkte holst, reicht es nicht fuer die Zielmarke. Dann liegt die Ziel-Punktzahl ueber der Summe aus bereits erreichten und noch moeglichen Punkten.' },
    { q: 'Zaehlen alle Punkte gleich?', a: 'Das Tool geht von gleich gewichteten Punkten aus. Zaehlen einzelne Pruefungen staerker, rechne ihre Punkte vorab mit dem Gewicht hoch, bevor du sie eintraegst.' },
    { q: 'Was, wenn ich das Ziel schon sicher habe?', a: 'Sind die bereits erreichten Punkte ueber der Zielmarke des Gesamtmaximums, zeigt das Tool 0 benoetigte Punkte und meldet, dass das Ziel sicher erreicht ist.' },
  ],
  related: ['benoetigte-note-rechner', 'prozent-in-note-rechner', 'durchfallquote-bestehensgrenze-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { erreicht: 60, rest: 100, ziel: 50 },
      // gesamt 160, ziel 80 Pkt, noetig 80-60 = 20
      expect: [
        { label: 'Gesamtpunkte (Maximum)', value: 160, tolerance: 0 },
        { label: 'Benoetigte Punkte (Rest)', value: 20, tolerance: 0.01 },
      ],
    },
    {
      values: { erreicht: 30, rest: 50, ziel: 90 },
      // gesamt 80, ziel 72, noetig 42 > 50? nein 42<=50 erreichbar
      expect: [{ label: 'Benoetigte Punkte (Rest)', value: 42, tolerance: 0.01 }],
    },
  ],
};
