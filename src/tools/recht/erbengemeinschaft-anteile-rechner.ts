import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'erbengemeinschaft-anteile-rechner',
  category: 'recht',
  title: 'Erbengemeinschaft-Anteile-Rechner (Auseinandersetzung)',
  shortTitle: 'Erbengemeinschaft',
  description:
    'Berechne die Auszahlung je Miterbe bei der Auseinandersetzung einer Erbengemeinschaft: Anteil am Nachlass nach Erbquote und Anzahl der Miterben.',
  keywords: [
    'erbengemeinschaft rechner',
    'erbengemeinschaft anteile berechnen',
    'miterben auszahlung',
    'erbteil berechnen',
    'erbauseinandersetzung rechner',
    'nachlass aufteilen miterben',
  ],
  formula:
    'Anteil je Miterbe = Nettonachlass × Erbquote des Miterben; bei gleichen Teilen: Nettonachlass / Anzahl Miterben',
  inputs: [
    { type: 'number', id: 'nachlass', label: 'Nettonachlasswert', unit: '€', default: 300000, min: 0, step: 1000, help: 'Wert des Nachlasses nach Abzug von Schulden und Verbindlichkeiten.' },
    { type: 'number', id: 'miterben', label: 'Anzahl Miterben', unit: '', default: 3, min: 1, max: 50, step: 1 },
    { type: 'number', id: 'quote', label: 'Erbquote eines Miterben', unit: '%', default: 0, min: 0, max: 100, step: 1, help: '0 = alle erben zu gleichen Teilen. Sonst die Quote eines bestimmten Miterben in %.' },
  ],
  compute: (v) => {
    const nachlass = num(v.nachlass);
    const miterben = Math.max(1, Math.round(num(v.miterben)));
    const quote = num(v.quote);
    const gleichQuote = 100 / miterben;
    const verwendeteQuote = quote > 0 ? quote : gleichQuote;
    const anteilGewaehlt = nachlass * (verwendeteQuote / 100);
    const anteilGleich = nachlass / miterben;
    return [
      { label: 'Anteil dieses Miterben', value: anteilGewaehlt, unit: '€', digits: 2, primary: true },
      { label: 'Erbquote dieses Miterben', value: verwendeteQuote, unit: '%', digits: 2 },
      { label: 'Anteil bei gleichen Teilen', value: anteilGleich, unit: '€', digits: 2 },
      { label: 'Quote bei gleichen Teilen', value: gleichQuote, unit: '%', digits: 2 },
    ];
  },
  intro:
    'Hinterlässt ein Erblasser mehrere Erben, bilden diese eine Erbengemeinschaft. Bis zur Auseinandersetzung gehört der Nachlass allen gemeinsam; bei der Teilung erhält jeder Miterbe seinen Anteil entsprechend seiner Erbquote (§§ 2032 ff. BGB). Mehrere gleichberechtigte Erben (z. B. Geschwister) teilen den Nachlass zu gleichen Teilen. Dieser Rechner ermittelt die Auszahlung je Miterbe als Orientierung – etwa für die Auszahlung eines Miterben oder den Verkauf einer geerbten Immobilie. Schulden und Vermächtnisse müssen vorab vom Nachlasswert abgezogen werden.',
  howto: [
    'Nettonachlasswert eingeben (Vermögen minus Schulden und Vermächtnisse).',
    'Anzahl der Miterben angeben.',
    'Für gleiche Teile die Erbquote bei 0 % belassen, sonst die individuelle Quote eintragen.',
    'Anteil je Miterbe in Euro ablesen.',
  ],
  faq: [
    { q: 'Wie wird der Nachlass unter Miterben aufgeteilt?', a: 'Jeder Miterbe erhält seinen Anteil entsprechend seiner Erbquote. Erben mehrere zu gleichen Teilen, wird der Nettonachlass durch die Zahl der Miterben geteilt.' },
    { q: 'Was ist der Nettonachlass?', a: 'Der Nettonachlass ist das Aktivvermögen abzüglich aller Nachlassverbindlichkeiten wie Schulden, Beerdigungskosten und auszuzahlender Vermächtnisse.' },
    { q: 'Wie wird ein Miterbe ausgezahlt?', a: 'Möchte ein Miterbe ausscheiden, kann er seinen Erbteil an die übrigen oder einen Dritten verkaufen. Die Auszahlung entspricht seinem wertmäßigen Anteil am Nachlass – die Mitberechtigten haben ein Vorkaufsrecht.' },
    { q: 'Gilt das auch für geerbte Immobilien?', a: 'Ja. Eine geerbte Immobilie gehört der Erbengemeinschaft gemeinsam. Beim Verkauf wird der Erlös nach den Erbquoten verteilt; eine Auszahlung ist auch durch Übernahme gegen Ausgleichszahlung möglich.' },
  ],
  related: ['gesetzliche-erbfolge-rechner', 'pflichtteil-rechner', 'erbschaftssteuer-rechner'],
  examples: [
    {
      values: { nachlass: 300000, miterben: 3, quote: 0 },
      expect: [
        { label: 'Quote bei gleichen Teilen', value: 33.333, tolerance: 0.1 },
        { label: 'Anteil dieses Miterben', value: 100000, tolerance: 0.5 },
      ],
    },
    {
      values: { nachlass: 200000, miterben: 4, quote: 50 },
      expect: [
        { label: 'Anteil dieses Miterben', value: 100000, tolerance: 0.5 },
        { label: 'Anteil bei gleichen Teilen', value: 50000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-19',
};
