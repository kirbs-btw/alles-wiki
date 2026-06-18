import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Größe des Zeichenraums je gewählter Zusammensetzung.
const ZEICHENRAUM: Record<string, number> = {
  ziffern: 10, // 0-9
  klein: 26, // a-z
  kleingross: 52, // a-z A-Z
  alnum: 62, // a-z A-Z 0-9
  voll: 95, // alle druckbaren ASCII-Zeichen inkl. Sonderzeichen
};

export const tool: Tool = {
  slug: 'passwort-entropie-rechner',
  category: 'technik',
  title: 'Passwort-Entropie-Rechner',
  shortTitle: 'Passwort-Entropie',
  description:
    'Berechne die Entropie eines Passworts in Bit aus Länge und Zeichenraum und schätze die theoretische Anzahl möglicher Kombinationen.',
  keywords: [
    'passwort entropie berechnen',
    'passwort stärke bit',
    'entropie rechner passwort',
    'wie sicher ist mein passwort',
    'passwort bits berechnen',
    'kombinationen passwort',
  ],
  formula: 'Entropie (Bit) = Länge × log2(Zeichenraumgröße); Kombinationen = Zeichenraum^Länge',
  inputs: [
    {
      type: 'number',
      id: 'laenge',
      label: 'Passwortlänge',
      unit: 'Zeichen',
      default: 12,
      min: 1,
      max: 128,
      step: 1,
    },
    {
      type: 'select',
      id: 'zeichenraum',
      label: 'Verwendete Zeichen',
      default: 'voll',
      options: [
        { value: 'ziffern', label: 'Nur Ziffern (10)' },
        { value: 'klein', label: 'Kleinbuchstaben (26)' },
        { value: 'kleingross', label: 'Groß + klein (52)' },
        { value: 'alnum', label: 'Buchstaben + Ziffern (62)' },
        { value: 'voll', label: 'Alle inkl. Sonderzeichen (95)' },
      ],
      help: 'Je größer der Zeichenvorrat, desto mehr Entropie pro Stelle.',
    },
  ],
  compute: (v) => {
    const laenge = Math.max(0, Math.round(num(v.laenge)));
    const raum = ZEICHENRAUM[String(v.zeichenraum)] ?? 95;
    const entropie = raum > 1 ? laenge * (Math.log(raum) / Math.log(2)) : 0;
    // log10 der Kombinationszahl, um Überlauf bei großen Werten zu vermeiden.
    const log10Komb = laenge * (Math.log(raum) / Math.log(10));
    let bewertung = 'sehr schwach';
    if (entropie >= 128) bewertung = 'sehr stark';
    else if (entropie >= 80) bewertung = 'stark';
    else if (entropie >= 60) bewertung = 'mittel';
    else if (entropie >= 40) bewertung = 'schwach';
    return [
      { label: 'Entropie', value: entropie, unit: 'Bit', digits: 1, primary: true },
      { label: 'Zehnerpotenz der Kombinationen', value: log10Komb, digits: 1 },
      { label: 'Einschätzung', value: bewertung },
    ];
  },
  intro:
    'Die Entropie misst, wie schwer ein Passwort zu erraten ist – als Anzahl der Bit. Sie berechnet sich aus der Passwortlänge und der Größe des verwendeten Zeichenraums: Entropie = Länge × log2(Zeichenraum). Jedes zusätzliche Bit verdoppelt die Zahl der zu probierenden Möglichkeiten. Als grobe Orientierung gelten ab etwa 80 Bit als stark und ab 128 Bit als sehr stark. Voraussetzung ist, dass das Passwort wirklich zufällig gewählt ist – Wörter und Muster reduzieren die echte Entropie deutlich.',
  howto: [
    'Die Länge des Passworts in Zeichen eingeben.',
    'Den verwendeten Zeichenraum wählen (nur Ziffern bis alle Sonderzeichen).',
    'Die Entropie in Bit ablesen und an der Einschätzung orientieren.',
  ],
  faq: [
    {
      q: 'Was bedeutet die Entropie in Bit?',
      a: 'Sie gibt an, wie vielen zufälligen Münzwürfen das Passwort entspricht. 60 Bit Entropie heißt rund 2^60 mögliche Kombinationen. Jedes Bit mehr verdoppelt den Aufwand für einen Angreifer.',
    },
    {
      q: 'Gilt das auch für „Passwort123!“?',
      a: 'Nein. Die Formel setzt echte Zufälligkeit voraus. Wörterbuch-Begriffe, Namen und vorhersehbare Muster werden von Angreifern bevorzugt geprüft, sodass die tatsächliche Sicherheit weit unter dem rechnerischen Wert liegt.',
    },
    {
      q: 'Wie viel Entropie ist genug?',
      a: 'Für normale Konten gelten rund 70–80 Bit als solide, für besonders schützenswerte Zugänge eher 100 Bit oder mehr. Längere, zufällige Passwörter aus einem Manager erreichen das mühelos.',
    },
  ],
  related: ['bit-byte-umrechner', 'zahlensystem-umrechner', 'subnetz-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { laenge: 12, zeichenraum: 'voll' },
      expect: [{ label: 'Entropie', value: 78.8, tolerance: 0.2 }],
    },
    {
      values: { laenge: 8, zeichenraum: 'ziffern' },
      expect: [{ label: 'Entropie', value: 26.6, tolerance: 0.2 }],
    },
  ],
};
