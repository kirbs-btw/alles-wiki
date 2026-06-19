import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'schuldenfrei-rechner',
  category: 'finanzen',
  title: 'Schuldenfrei-Rechner',
  shortTitle: 'Schuldenfrei',
  description:
    'Berechne, wie lange du bei fester monatlicher Rate brauchst, um deine Schulden vollständig abzuzahlen – inklusive der gesamten Zinskosten.',
  keywords: [
    'schuldenfrei rechner',
    'schulden abzahlen rechner',
    'wie lange schulden abbezahlen',
    'tilgungsdauer rechner',
    'kredit abbezahlen dauer',
  ],
  formula: 'n = −ln(1 − Schuld × i / Rate) / ln(1 + i); i = Zins/100/12',
  inputs: [
    { type: 'number', id: 'schuld', label: 'Aktuelle Schuld', unit: '€', default: 15000, min: 0, step: 100 },
    { type: 'number', id: 'zins', label: 'Sollzins p.a.', unit: '%', default: 9, min: 0, step: 0.1, help: 'Effektiver Jahreszins des Kredits.' },
    { type: 'number', id: 'rate', label: 'Monatliche Rate', unit: '€', default: 300, min: 0, step: 10 },
  ],
  compute: (v) => {
    const schuld = num(v.schuld);
    const zins = num(v.zins);
    const rate = num(v.rate);
    const i = zins / 100 / 12;
    const monatszins = schuld * i;
    let monate: number;
    let erreichbar = true;
    if (schuld <= 0) {
      monate = 0;
    } else if (rate <= 0) {
      monate = 0;
      erreichbar = false;
    } else if (i === 0) {
      monate = Math.ceil(schuld / rate);
    } else if (rate <= monatszins) {
      monate = 0;
      erreichbar = false;
    } else {
      monate = Math.ceil(-Math.log(1 - (schuld * i) / rate) / Math.log(1 + i));
    }
    const gezahlt = erreichbar ? rate * monate : 0;
    const zinskosten = erreichbar ? Math.max(0, gezahlt - schuld) : 0;
    return [
      { label: 'Dauer bis schuldenfrei', value: monate, unit: 'Monate', digits: 0, primary: true, help: !erreichbar ? 'Rate deckt nicht einmal die Zinsen – Schuld wächst.' : undefined },
      { label: 'Entspricht', value: monate / 12, unit: 'Jahre', digits: 1 },
      { label: 'Gezahlt gesamt', value: gezahlt, unit: '€', digits: 2 },
      { label: 'Davon Zinskosten', value: zinskosten, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Wie lange dauert es, einen Kredit, Dispo oder offene Rechnungen abzuzahlen? Dieser Rechner ermittelt aus Schuldenhöhe, Zinssatz und deiner monatlichen Rate die Tilgungsdauer und zeigt, wie viel davon reine Zinskosten sind. Wichtig: Liegt deine Rate unter den monatlichen Zinsen, wächst die Schuld – der Rechner warnt dann.',
  howto: [
    'Trage deine aktuelle Schuldensumme ein.',
    'Gib den effektiven Jahreszins des Kredits an.',
    'Wähle die monatliche Rate, die du zur Tilgung aufbringen kannst.',
    'Lies Dauer und Zinskosten ab. Eine höhere Rate verkürzt die Laufzeit deutlich.',
  ],
  faq: [
    { q: 'Was passiert bei einer zu niedrigen Rate?', a: 'Wenn die monatliche Rate die anfallenden Zinsen nicht deckt, steigt die Schuld trotz Zahlungen weiter. Der Rechner zeigt dann, dass das Ziel nicht erreichbar ist – du musst die Rate erhöhen.' },
    { q: 'Warum sind die Zinskosten so hoch?', a: 'Je länger die Laufzeit und je höher der Zins, desto mehr zahlst du an Zinsen. Schon eine moderat höhere Monatsrate kann die Laufzeit und damit die Zinskosten stark senken.' },
    { q: 'Gilt das auch für den Dispokredit?', a: 'Ja. Dispozinsen sind oft zweistellig. Gerade hier lohnt es, eine feste Tilgungsrate zu setzen oder in einen günstigeren Ratenkredit umzuschulden.' },
  ],
  related: ['kreditrechner', 'ratenkredit', 'dispozinsen-rechner', 'umschuldung-rechner'],
  examples: [
    {
      values: { schuld: 10000, zins: 0, rate: 250 },
      expect: [
        { label: 'Dauer bis schuldenfrei', value: 40, tolerance: 0 },
        { label: 'Gezahlt gesamt', value: 10000, tolerance: 0 },
        { label: 'Davon Zinskosten', value: 0, tolerance: 0 },
      ],
    },
    {
      values: { schuld: 15000, zins: 9, rate: 300 },
      expect: [
        { label: 'Dauer bis schuldenfrei', value: 63, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
