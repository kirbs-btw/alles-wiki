import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'abfindung-rechner',
  category: 'recht',
  title: 'Abfindung-Rechner (Faustformel)',
  shortTitle: 'Abfindung',
  description:
    'Berechne deine voraussichtliche Abfindung nach der gängigen Faustformel: 0,5 Bruttomonatsgehälter pro Beschäftigungsjahr. Mit frei wählbarem Faktor.',
  keywords: [
    'abfindung rechner',
    'abfindung berechnen',
    'abfindung faustformel',
    'abfindung kündigung',
    'wie hoch abfindung',
    'abfindung höhe',
    'aufhebungsvertrag abfindung',
  ],
  formula: 'Abfindung = Faktor × Bruttomonatsgehalt × Beschäftigungsjahre',
  inputs: [
    { type: 'number', id: 'brutto', label: 'Bruttomonatsgehalt', unit: '€', default: 3500, min: 0, step: 50 },
    { type: 'number', id: 'jahre', label: 'Beschäftigungsjahre', unit: 'Jahre', default: 8, min: 0, step: 0.5, help: 'Vollendete Jahre der Betriebszugehörigkeit.' },
    {
      type: 'select', id: 'faktor', label: 'Faktor pro Jahr', default: '0.5',
      options: [
        { value: '0.25', label: '0,25 (niedrig)' },
        { value: '0.5', label: '0,5 (Regelfaktor / Faustformel)' },
        { value: '0.75', label: '0,75 (erhöht)' },
        { value: '1', label: '1,0 (hoch)' },
      ],
      help: 'Der Regelfaktor der Faustformel ist 0,5.',
    },
  ],
  compute: (v) => {
    const brutto = num(v.brutto);
    const jahre = num(v.jahre);
    const faktor = num(v.faktor, 0.5);
    const abfindung = faktor * brutto * jahre;
    const inMonatsgehaeltern = brutto > 0 ? abfindung / brutto : 0;
    return [
      { label: 'Voraussichtliche Abfindung', value: abfindung, unit: '€', digits: 0, primary: true },
      { label: 'Entspricht Monatsgehältern', value: inMonatsgehaeltern, unit: 'Gehälter', digits: 1 },
      { label: 'Faktor pro Jahr', value: faktor, digits: 2 },
    ];
  },
  intro:
    'Die Faustformel für eine Abfindung lautet: ein halbes Bruttomonatsgehalt pro Jahr der Betriebszugehörigkeit. Sie dient als grobe Orientierung, etwa bei einer Kündigungsschutzklage oder einem Aufhebungsvertrag. Es besteht jedoch kein allgemeiner gesetzlicher Anspruch auf eine Abfindung – die tatsächliche Höhe wird verhandelt.',
  howto: [
    'Dein aktuelles Bruttomonatsgehalt eingeben.',
    'Anzahl der vollendeten Beschäftigungsjahre angeben.',
    'Faktor wählen (Regelfaktor der Faustformel ist 0,5).',
    'Das Ergebnis als Verhandlungsbasis verstehen – nicht als garantierten Anspruch.',
  ],
  faq: [
    { q: 'Habe ich einen Anspruch auf eine Abfindung?', a: 'Nein, einen allgemeinen gesetzlichen Anspruch gibt es nicht. Abfindungen ergeben sich meist aus Sozialplänen, Aufhebungsverträgen, einem Vergleich vor dem Arbeitsgericht oder § 1a Kündigungsschutzgesetz.' },
    { q: 'Was bedeutet die Faustformel 0,5?', a: 'Pro Jahr der Betriebszugehörigkeit wird ein halbes Bruttomonatsgehalt angesetzt. Bei 10 Jahren wären das also 5 Bruttomonatsgehälter.' },
    { q: 'Muss ich die Abfindung versteuern?', a: 'Ja, eine Abfindung ist grundsätzlich lohnsteuerpflichtig. Sozialversicherungsbeiträge fallen darauf in der Regel nicht an. Die sogenannte Fünftelregelung kann die Steuerlast mindern.' },
    { q: 'Werden angefangene Jahre mitgezählt?', a: 'In der Praxis werden Zeiten über sechs Monate oft auf ein volles Jahr aufgerundet. Du kannst hier auch halbe Jahre eingeben, um das abzubilden.' },
    { q: 'Ist die Faustformel rechtlich verbindlich?', a: 'Nein. Sie ist eine reine Orientierungsgröße. Der tatsächliche Betrag hängt von Verhandlungsgeschick, Prozessrisiko und Einzelfall ab. Dies ersetzt keine Rechtsberatung.' },
  ],
  related: ['kuendigungsfrist-rechner', 'verzugszinsen-rechner', 'mahngebuehren-rechner'],
  examples: [
    {
      values: { brutto: 3500, jahre: 8, faktor: '0.5' },
      expect: [
        { label: 'Voraussichtliche Abfindung', value: 14000, tolerance: 0.5 },
        { label: 'Entspricht Monatsgehältern', value: 4, tolerance: 0.05 },
      ],
    },
    {
      values: { brutto: 4000, jahre: 10, faktor: '1' },
      expect: [
        { label: 'Voraussichtliche Abfindung', value: 40000, tolerance: 0.5 },
      ],
    },
  ],
  updated: '2026-06-18',
};
