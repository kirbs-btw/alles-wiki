import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'benoetigte-note-rechner',
  category: 'bildung',
  title: 'Benoetigte Note fuer Wunschdurchschnitt',
  shortTitle: 'Benoetigte Note',
  description:
    'Berechne, welche Note du in der naechsten Pruefung brauchst, um deinen Wunschdurchschnitt zu erreichen – aus bisherigem Schnitt und Gewichtung.',
  keywords: [
    'welche note brauche ich',
    'benoetigte note berechnen',
    'note fuer durchschnitt',
    'wunschnote rechner',
    'note naechste klausur',
    'durchschnitt halten note',
    'zielnote berechnen',
  ],
  intro:
    'Du moechtest einen bestimmten Durchschnitt erreichen und fragst dich, welche Note du in der naechsten Pruefung schreiben musst? Dieses Tool nutzt deinen bisherigen Durchschnitt, das Gesamtgewicht der bisherigen Noten und das Gewicht der kommenden Pruefung. Es loest die Durchschnittsformel nach der fehlenden Note auf. Ist das Ergebnis besser als 1 oder schlechter als 6, ist das Ziel rechnerisch nicht mehr erreichbar.',
  formula: 'Note = (Zielschnitt × (Gewicht_alt + Gewicht_neu) − Schnitt_alt × Gewicht_alt) / Gewicht_neu',
  inputs: [
    { type: 'number', id: 'schnittAlt', label: 'Bisheriger Durchschnitt', default: 2.4, min: 1, max: 6, step: 0.1 },
    { type: 'number', id: 'gewichtAlt', label: 'Gewicht der bisherigen Noten', default: 3, min: 0, step: 0.5, help: 'Z. B. Anzahl oder Summe der Gewichte aller bisherigen Noten.' },
    { type: 'number', id: 'gewichtNeu', label: 'Gewicht der naechsten Pruefung', default: 1, min: 0.5, step: 0.5 },
    { type: 'number', id: 'ziel', label: 'Gewuenschter Durchschnitt', default: 2, min: 1, max: 6, step: 0.1 },
  ],
  compute: (v) => {
    const schnittAlt = num(v.schnittAlt);
    const gAlt = num(v.gewichtAlt);
    const gNeu = num(v.gewichtNeu) > 0 ? num(v.gewichtNeu) : 1;
    const ziel = num(v.ziel);
    const benoetigt = (ziel * (gAlt + gNeu) - schnittAlt * gAlt) / gNeu;
    const erreichbar = benoetigt >= 1 && benoetigt <= 6;
    let hinweis = 'erreichbar';
    if (benoetigt < 1) hinweis = 'Ziel bereits uebertroffen – jede Note 1 reicht';
    else if (benoetigt > 6) hinweis = 'rechnerisch nicht mehr erreichbar';
    // gedeckelter Anzeigewert
    let anzeige = benoetigt;
    if (anzeige < 1) anzeige = 1;
    if (anzeige > 6) anzeige = 6;
    return [
      { label: 'Benoetigte Note (rechnerisch)', value: Math.round(benoetigt * 100) / 100, digits: 2, primary: true, help: 'Reine Rechengroesse: Werte unter 1 bzw. ueber 6 sind keine echten Schulnoten.' },
      { label: 'Realistisch (1–6)', value: Math.round(anzeige * 100) / 100, digits: 2 },
      { label: 'Status', value: hinweis },
      { label: 'Ziel erreichbar', value: erreichbar ? 'ja' : 'nein' },
    ];
  },
  howto: [
    'Deinen bisherigen Durchschnitt eintragen.',
    'Das Gesamtgewicht der bisherigen Noten angeben (z. B. ihre Anzahl).',
    'Das Gewicht der naechsten Pruefung eintragen.',
    'Wunschdurchschnitt angeben und die benoetigte Note ablesen.',
  ],
  faq: [
    { q: 'Wie wird die benoetigte Note berechnet?', a: 'Das Tool stellt die gewichtete Durchschnittsformel nach der fehlenden Note um: Es zieht den bisherigen Beitrag vom Zielwert ab und teilt durch das Gewicht der neuen Pruefung.' },
    { q: 'Was bedeutet ein Wert unter 1 oder ueber 6?', a: 'Ein Wert unter 1 heisst, dass du dein Ziel schon sicher erreichst. Ein Wert ueber 6 bedeutet, dass selbst eine 1 nicht mehr reicht – das Ziel ist rechnerisch nicht erreichbar.' },
    { q: 'Was trage ich als Gewicht ein?', a: 'Wenn alle Noten gleich zaehlen, ist das Gewicht einfach die Anzahl. Zaehlen Klausuren doppelt, gib die Summe der Gewichte ein, z. B. 4 fuer zwei doppelt zaehlende Klausuren.' },
    { q: 'Gilt das auch fuer das Studium?', a: 'Ja, die Formel funktioniert fuer jeden gewichteten Durchschnitt – ob Schulnoten, Modulnoten oder ECTS-gewichtete Studienleistungen. Setze als Gewicht die jeweiligen Leistungspunkte ein.' },
  ],
  related: ['notendurchschnitt-rechner', 'prozent-in-note-rechner', 'ects-noten-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { schnittAlt: 2.4, gewichtAlt: 3, gewichtNeu: 1, ziel: 2 },
      expect: [{ label: 'Benoetigte Note (rechnerisch)', value: 0.8, tolerance: 0.01 }],
    },
    {
      values: { schnittAlt: 3, gewichtAlt: 2, gewichtNeu: 1, ziel: 2.5 },
      expect: [{ label: 'Benoetigte Note (rechnerisch)', value: 1.5, tolerance: 0.01 }],
    },
  ],
};
