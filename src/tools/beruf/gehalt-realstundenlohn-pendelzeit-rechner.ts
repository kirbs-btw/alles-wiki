import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'gehalt-realstundenlohn-pendelzeit-rechner',
  category: 'beruf',
  title: 'Gehalt-Realcheck: Stundenlohn inkl. Pendelzeit',
  shortTitle: 'Real-Stundenlohn',
  description:
    'Was verdienst du wirklich pro Stunde? Der Realcheck rechnet dein Monatsgehalt auf die echte Zeit um – inklusive Pendelzeit und Pendelkosten als zusätzlichem Aufwand.',
  keywords: [
    'realer stundenlohn rechner',
    'stundenlohn mit pendelzeit',
    'gehalt pro stunde echt',
    'pendelzeit stundenlohn',
    'effektiver stundenlohn',
    'lohnt sich der job',
  ],
  formula:
    'Real-Stunden/Woche = Arbeitsstunden + Pendelzeit ; Real-Stundenlohn = (Monatsnetto − Monats-Pendelkosten) ÷ (Real-Stunden/Woche × 52 ÷ 12)',
  inputs: [
    { type: 'number', id: 'monatsnetto', label: 'Monatsgehalt (netto)', unit: '€', default: 2500, min: 0, step: 50, help: 'Was monatlich auf dem Konto landet.' },
    { type: 'number', id: 'wochenstunden', label: 'Vertragliche Arbeitsstunden/Woche', unit: 'h', default: 40, min: 1, step: 1 },
    { type: 'number', id: 'pendelMin', label: 'Pendelzeit pro Tag (hin und zurück)', unit: 'min', default: 60, min: 0, step: 5, help: 'Gesamte tägliche Pendelzeit für Hin- und Rückweg.' },
    { type: 'number', id: 'pendeltage', label: 'Pendeltage pro Woche', unit: 'Tage', default: 5, min: 0, max: 7, step: 1 },
    { type: 'number', id: 'pendelkosten', label: 'Pendelkosten pro Monat', unit: '€', default: 150, min: 0, step: 10, help: 'Sprit, Ticket, Verschleiß – mindern den realen Verdienst.' },
  ],
  compute: (v) => {
    const monatsnetto = num(v.monatsnetto);
    const wochenstunden = num(v.wochenstunden);
    const pendelMin = num(v.pendelMin);
    const pendeltage = num(v.pendeltage);
    const pendelkosten = num(v.pendelkosten);

    const wochenProMonat = 52 / 12;
    const pendelStundenWoche = (pendelMin * pendeltage) / 60;
    const realStundenWoche = wochenstunden + pendelStundenWoche;

    const arbeitsStundenMonat = wochenstunden * wochenProMonat;
    const realStundenMonat = realStundenWoche * wochenProMonat;

    const nominalLohn = arbeitsStundenMonat > 0 ? monatsnetto / arbeitsStundenMonat : 0;
    const bereinigtNetto = monatsnetto - pendelkosten;
    const realLohn = realStundenMonat > 0 ? bereinigtNetto / realStundenMonat : 0;

    return [
      { label: 'Realer Netto-Stundenlohn', value: realLohn, unit: '€', digits: 2, primary: true, help: 'Netto minus Pendelkosten, geteilt durch Arbeits- plus Pendelstunden.' },
      { label: 'Nominaler Netto-Stundenlohn', value: nominalLohn, unit: '€', digits: 2, help: 'Nur auf die vertraglichen Arbeitsstunden bezogen.' },
      { label: 'Pendelzeit pro Woche', value: pendelStundenWoche, unit: 'h', digits: 2 },
      { label: 'Reale Zeit pro Monat', value: realStundenMonat, unit: 'h', digits: 1, help: 'Arbeits- plus Pendelstunden im Monatsschnitt.' },
    ];
  },
  intro:
    'Das nominale Gehalt sagt wenig über den wahren Stundenlohn aus. Wer täglich lange pendelt und dafür auch noch zahlt, verdient real deutlich weniger pro investierter Stunde. Der Realcheck zieht die Pendelkosten vom Nettogehalt ab und rechnet das Ergebnis auf die tatsächlich eingesetzte Zeit – Arbeit plus Pendeln – um. So lassen sich Jobangebote mit unterschiedlichen Arbeitswegen ehrlich vergleichen.',
  howto: [
    'Trage dein monatliches Nettogehalt ein.',
    'Gib deine vertraglichen Wochenstunden an.',
    'Erfasse die tägliche Pendelzeit (hin und zurück) und die Pendeltage pro Woche.',
    'Ergänze die monatlichen Pendelkosten und lies den realen Stundenlohn ab.',
  ],
  faq: [
    { q: 'Warum sollte ich die Pendelzeit einrechnen?', a: 'Pendelzeit ist gebundene Lebenszeit, auch wenn sie unbezahlt ist. Wer sie zur Arbeitszeit addiert, sieht den ehrlichen Stundenlohn und kann Angebote mit kurzem und langem Arbeitsweg fair vergleichen.' },
    { q: 'Warum mit 52 ÷ 12 rechnen?', a: 'Ein Monat hat im Schnitt rund 4,33 Wochen. Multipliziert man die Wochenstunden mit 52 ÷ 12, erhält man die durchschnittlichen Monatsstunden statt der schwankenden Tageszahl je Monat.' },
    { q: 'Sind die Pendelkosten steuerlich absetzbar?', a: 'Über die Pendlerpauschale kannst du Fahrten zur Arbeit als Werbungskosten geltend machen. Das mindert die Steuer, ersetzt aber nicht die vollen Kosten – im Realcheck werden hier die tatsächlichen Ausgaben angesetzt.' },
    { q: 'Sollte ich brutto oder netto eintragen?', a: 'Für den realen Stundenlohn ist das Netto sinnvoller, da nur das tatsächlich verfügbare Geld zählt. Du kannst aber auch brutto eintragen, wenn du Bruttowerte vergleichen willst.' },
  ],
  related: ['netto-stundenlohn-rechner', 'pendlerpauschale-rechner', 'stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { monatsnetto: 2500, wochenstunden: 40, pendelMin: 60, pendeltage: 5, pendelkosten: 150 },
      expect: [
        { label: 'Pendelzeit pro Woche', value: 5, tolerance: 0.01 },
        { label: 'Reale Zeit pro Monat', value: 195, tolerance: 0.1 },
        { label: 'Nominaler Netto-Stundenlohn', value: 14.42, tolerance: 0.05 },
        { label: 'Realer Netto-Stundenlohn', value: 12.05, tolerance: 0.05 },
      ],
    },
  ],
};
