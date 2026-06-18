import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kaution-rechner',
  category: 'wohnen',
  title: 'Mietkaution-Rechner',
  shortTitle: 'Mietkaution',
  description:
    'Berechne die maximal zulässige Mietkaution (höchstens drei Nettokaltmieten), die mögliche Ratenzahlung und die ungefähren Zinsen auf dem Kautionskonto.',
  keywords: [
    'mietkaution berechnen',
    'kaution maximal höhe',
    'kaution drei monatsmieten',
    'kaution ratenzahlung',
    'kautionskonto zinsen',
    'mietsicherheit rechner',
    'kaution wohnung',
  ],
  formula:
    'Maximalkaution = Nettokaltmiete × 3; Rate = Kaution / 3; Zinsen ≈ Kaution × Zinssatz/100 × Jahre',
  inputs: [
    { type: 'number', id: 'kaltmiete', label: 'Monatliche Nettokaltmiete', unit: '€', default: 800, min: 0, step: 10, help: 'Maßgeblich ist die Kaltmiete ohne Betriebs- und Heizkosten.' },
    { type: 'number', id: 'monate', label: 'Vereinbarte Kaution', unit: 'Monatsmieten', default: 3, min: 0, max: 3, step: 0.5, help: 'Gesetzlich höchstens 3 Nettokaltmieten zulässig.' },
    { type: 'number', id: 'zinssatz', label: 'Zinssatz Kautionskonto', unit: '% p.a.', default: 1, min: 0, max: 10, step: 0.1 },
    { type: 'number', id: 'jahre', label: 'Mietdauer', unit: 'Jahre', default: 4, min: 0, step: 1 },
  ],
  compute: (v) => {
    const kaltmiete = num(v.kaltmiete);
    const monate = Math.min(num(v.monate), 3);
    const zinssatz = num(v.zinssatz);
    const jahre = num(v.jahre);
    const maxKaution = kaltmiete * 3;
    const kaution = kaltmiete * monate;
    const rate = kaution / 3;
    const zinsen = kaution * (zinssatz / 100) * jahre;
    return [
      { label: 'Kautionshöhe', value: kaution, unit: '€', digits: 2, primary: true },
      { label: 'Gesetzliches Maximum (3 Mieten)', value: maxKaution, unit: '€', digits: 2 },
      { label: 'Mögliche Monatsrate', value: rate, unit: '€', digits: 2, help: 'Die Kaution darf in 3 gleichen Monatsraten gezahlt werden.' },
      { label: 'Voraussichtliche Zinsen', value: zinsen, unit: '€', digits: 2 },
      { label: 'Rückzahlung inkl. Zinsen', value: kaution + zinsen, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Mietkaution sichert den Vermieter gegen Mietausfälle und Schäden ab. Nach § 551 BGB darf sie höchstens drei Nettokaltmieten betragen und der Mieter kann sie in drei gleichen Monatsraten zahlen. Die Kaution muss getrennt vom Vermietervermögen verzinslich angelegt werden – die Zinsen stehen dem Mieter zu.',
  howto: [
    'Monatliche Nettokaltmiete (ohne Nebenkosten) eintragen.',
    'Vereinbarte Kautionshöhe in Monatsmieten wählen (maximal 3).',
    'Zinssatz des Kautionskontos und geplante Mietdauer angeben.',
    'Kautionshöhe, Ratenzahlung und Zinsen ablesen.',
  ],
  faq: [
    { q: 'Wie hoch darf die Kaution maximal sein?', a: 'Die Barkaution darf höchstens das Dreifache der monatlichen Nettokaltmiete betragen (§ 551 BGB). Betriebs- und Heizkosten bleiben bei der Berechnung außen vor.' },
    { q: 'Kann ich die Kaution in Raten zahlen?', a: 'Ja. Der Mieter hat das Recht, die Kaution in drei gleichen Monatsraten zu zahlen. Die erste Rate ist zu Beginn des Mietverhältnisses fällig, die weiteren mit den folgenden Mietzahlungen.' },
    { q: 'Bekomme ich Zinsen auf die Kaution?', a: 'Ja. Der Vermieter muss die Kaution getrennt von seinem Vermögen verzinslich anlegen. Die Zinsen stehen dem Mieter zu und erhöhen die Kaution. Der hier angesetzte Zinssatz ist eine Schätzung.' },
    { q: 'Wann bekomme ich die Kaution zurück?', a: 'Nach Ende des Mietverhältnisses hat der Vermieter eine angemessene Prüffrist – meist drei bis sechs Monate – um etwaige Ansprüche zu klären, etwa offene Nebenkostenabrechnungen. Danach ist die Kaution samt Zinsen zurückzuzahlen.' },
  ],
  related: ['maklerprovision-rechner', 'umzugskosten-rechner', 'quadratmeterpreis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { kaltmiete: 800, monate: 3, zinssatz: 1, jahre: 4 },
      expect: [
        { label: 'Kautionshöhe', value: 2400, tolerance: 0.01 },
        { label: 'Mögliche Monatsrate', value: 800, tolerance: 0.01 },
        { label: 'Voraussichtliche Zinsen', value: 96, tolerance: 0.01 },
      ],
    },
  ],
};
