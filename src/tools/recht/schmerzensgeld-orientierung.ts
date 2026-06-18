import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schmerzensgeld-orientierung',
  category: 'recht',
  title: 'Schmerzensgeld-Orientierung (grobe Einschätzung)',
  shortTitle: 'Schmerzensgeld',
  description:
    'Erhalte eine grobe Orientierung für ein mögliches Schmerzensgeld anhand von Schwere und Dauer der Beeinträchtigung. Nur Hinweis, keine Rechtsberatung.',
  keywords: [
    'schmerzensgeld rechner',
    'schmerzensgeld höhe',
    'schmerzensgeld berechnen',
    'schmerzensgeld tabelle',
    'wie viel schmerzensgeld',
    'schmerzensgeld unfall',
    'schmerzensgeld orientierung',
  ],
  formula: 'Orientierung = Tagessatz nach Schwere × Behandlungstage (grobe Spanne, keine Tabelle)',
  inputs: [
    { type: 'number', id: 'tage', label: 'Dauer der Beeinträchtigung', unit: 'Tage', default: 30, min: 0, step: 1, help: 'Behandlungs- bzw. Beeinträchtigungstage.' },
    {
      type: 'select', id: 'schwere', label: 'Schwere der Verletzung', default: 'mittel',
      options: [
        { value: 'leicht', label: 'Leicht (Prellung, kleine Wunde)' },
        { value: 'mittel', label: 'Mittel (Knochenbruch, längere Heilung)' },
        { value: 'schwer', label: 'Schwer (Operation, bleibende Folgen)' },
      ],
    },
    {
      type: 'select', id: 'verschulden', label: 'Verschulden des Schädigers', default: 'normal',
      options: [
        { value: 'normal', label: 'Einfache Fahrlässigkeit' },
        { value: 'grob', label: 'Grobe Fahrlässigkeit / Vorsatz (Zuschlag)' },
      ],
    },
  ],
  compute: (v) => {
    const tage = num(v.tage);
    const schwere = String(v.schwere);
    const grob = String(v.verschulden) === 'grob';
    // Grobe Tagessätze als reine Orientierung (keine amtliche Tabelle).
    const satz = schwere === 'schwer' ? 80 : schwere === 'mittel' ? 40 : 15;
    const faktor = grob ? 1.3 : 1;
    const mitte = satz * tage * faktor;
    const unten = mitte * 0.7;
    const oben = mitte * 1.4;
    return [
      { label: 'Grobe Orientierung (Mitte)', value: mitte, unit: '€', digits: 0, primary: true },
      { label: 'Untere Spanne', value: unten, unit: '€', digits: 0 },
      { label: 'Obere Spanne', value: oben, unit: '€', digits: 0 },
    ];
  },
  intro:
    'Schmerzensgeld lässt sich nicht exakt berechnen: Gerichte entscheiden im Einzelfall anhand von Art, Schwere und Dauer der Verletzung, dem Verschulden und den Folgen. Als grobe Orientierung dienen veröffentlichte Schmerzensgeldtabellen mit Vergleichsfällen. Dieser Rechner gibt nur eine sehr grobe Spanne und ist ausdrücklich keine Rechtsberatung – ziehe für eine belastbare Einschätzung einen Anwalt hinzu.',
  howto: [
    'Dauer der Beeinträchtigung in Tagen eingeben.',
    'Schwere der Verletzung einordnen.',
    'Verschuldensgrad des Schädigers wählen.',
    'Die grobe Spanne als ersten Anhaltspunkt verstehen – maßgeblich sind Vergleichsfälle.',
  ],
  faq: [
    { q: 'Kann man Schmerzensgeld genau berechnen?', a: 'Nein. Es gibt keine feste Formel. Gerichte orientieren sich an vergleichbaren entschiedenen Fällen (Schmerzensgeldtabellen) und gewichten den Einzelfall.' },
    { q: 'Welche Faktoren erhöhen das Schmerzensgeld?', a: 'Schwere und Dauer der Verletzung, bleibende Schäden, Anzahl der Operationen, psychische Folgen sowie grobes Verschulden oder Vorsatz des Schädigers.' },
    { q: 'Was ist eine Schmerzensgeldtabelle?', a: 'Eine Sammlung gerichtlicher Entscheidungen, geordnet nach Verletzungsart und zugesprochenem Betrag. Sie dient als Vergleichsmaßstab, ist aber nicht bindend.' },
    { q: 'Ist die Zahl hier verlässlich?', a: 'Nein, sie ist nur eine sehr grobe Orientierung mit fiktiven Tagessätzen. Die tatsächliche Höhe kann deutlich abweichen. Lass dich anwaltlich beraten.' },
    { q: 'Verjährt der Anspruch?', a: 'Schmerzensgeldansprüche verjähren regelmäßig in drei Jahren ab Kenntnis von Schaden und Schädiger (§§ 195, 199 BGB). Bei bestimmten Verletzungen gelten längere Fristen.' },
  ],
  related: ['anwaltskosten-rechner', 'gerichtskosten-rechner', 'prozesskostenrisiko-rechner'],
  examples: [
    {
      values: { tage: 30, schwere: 'mittel', verschulden: 'normal' },
      expect: [
        { label: 'Grobe Orientierung (Mitte)', value: 1200, tolerance: 1 },
        { label: 'Obere Spanne', value: 1680, tolerance: 1 },
      ],
    },
    {
      values: { tage: 10, schwere: 'schwer', verschulden: 'grob' },
      expect: [
        { label: 'Grobe Orientierung (Mitte)', value: 1040, tolerance: 1 },
      ],
    },
  ],
  updated: '2026-06-18',
};
