import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'resturlaub-jobwechsel-rechner',
  category: 'beruf',
  title: 'Resturlaub-Rechner bei Jobwechsel (Zwölftelung)',
  shortTitle: 'Resturlaub Jobwechsel',
  description:
    'Berechne bei einem Jobwechsel im Jahr deinen anteiligen Urlaub beim alten und neuen Arbeitgeber per Zwölftelung – und ob beim Austritt nach dem 30.6. der volle Anspruch greift.',
  keywords: [
    'resturlaub jobwechsel rechner',
    'urlaub zwölftelung',
    'anteiliger urlaub bei kündigung',
    'urlaubsanspruch jobwechsel',
    'resturlaub bei austritt',
    'urlaub aufteilung arbeitgeber',
  ],
  formula:
    'Anteil je Arbeitgeber = Jahresurlaub × (volle Beschäftigungsmonate ÷ 12) ; Austritt 2. Jahreshälfte → ggf. voller Jahresanspruch beim alten Arbeitgeber',
  inputs: [
    { type: 'number', id: 'jahresurlaub', label: 'Jahresurlaub (voller Anspruch)', unit: 'Tage', default: 30, min: 0, step: 1, help: 'Vertraglicher Jahresurlaub bei ganzjähriger Beschäftigung.' },
    { type: 'number', id: 'monateAlt', label: 'Volle Monate beim alten Arbeitgeber', unit: 'Monate', default: 6, min: 0, max: 12, step: 1, help: 'Volle Beschäftigungsmonate im Austrittsjahr bis zum Ausscheiden.' },
    { type: 'number', id: 'urlaubGenommen', label: 'Bereits genommener Urlaub (alt)', unit: 'Tage', default: 10, min: 0, step: 1, help: 'Im laufenden Jahr beim alten Arbeitgeber bereits genommene Urlaubstage.' },
    { type: 'select', id: 'austrittHalbjahr', label: 'Austritt im Jahr', default: 'erste', options: [
      { value: 'erste', label: 'Erste Jahreshälfte (bis 30.6.)' },
      { value: 'zweite', label: 'Zweite Jahreshälfte (ab 1.7.)' },
    ], help: 'Bei Austritt in der zweiten Jahreshälfte besteht oft der volle Jahresanspruch (BUrlG).' },
  ],
  compute: (v) => {
    const jahresurlaub = num(v.jahresurlaub);
    const monateAlt = num(v.monateAlt);
    const genommen = num(v.urlaubGenommen);
    const zweite = String(v.austrittHalbjahr) === 'zweite';

    const anteilZwoelftel = jahresurlaub * (monateAlt / 12);
    // Bei Austritt in der 2. Jahreshälfte greift häufig der volle Jahresanspruch.
    const anspruchAlt = zweite ? Math.max(jahresurlaub, anteilZwoelftel) : anteilZwoelftel;
    const restAlt = anspruchAlt - genommen;

    const monateNeu = Math.max(0, 12 - monateAlt);
    const anspruchNeu = jahresurlaub * (monateNeu / 12);

    return [
      { label: 'Resturlaub beim alten Arbeitgeber', value: restAlt, unit: 'Tage', digits: 2, primary: true, help: 'Anteiliger (bzw. voller) Anspruch minus bereits genommener Urlaub. Negativ = zu viel genommen.' },
      { label: 'Anspruch beim alten Arbeitgeber', value: anspruchAlt, unit: 'Tage', digits: 2 },
      { label: 'Anspruch beim neuen Arbeitgeber (Rest des Jahres)', value: anspruchNeu, unit: 'Tage', digits: 2, help: 'Zwölftelung für die verbleibenden Monate.' },
      { label: 'Gesamt im Wechseljahr', value: restAlt + anspruchNeu, unit: 'Tage', digits: 2 },
    ];
  },
  intro:
    'Wer im laufenden Jahr den Job wechselt, hat bei beiden Arbeitgebern einen anteiligen Urlaubsanspruch – berechnet per Zwölftelung nach vollen Beschäftigungsmonaten. Eine Besonderheit: Scheidest du in der zweiten Jahreshälfte aus (Austritt ab 1. Juli) und ist die Wartezeit erfüllt, steht dir beim alten Arbeitgeber häufig der volle Jahresurlaub zu. Eine Doppelgewährung über zwei Arbeitgeber ist gesetzlich ausgeschlossen; eine Urlaubsbescheinigung dokumentiert den bereits genommenen Urlaub.',
  howto: [
    'Trage deinen vollen Jahresurlaub ein.',
    'Gib die vollen Beschäftigungsmonate beim alten Arbeitgeber bis zum Austritt an.',
    'Erfasse den dort bereits genommenen Urlaub.',
    'Wähle, ob der Austritt in der ersten oder zweiten Jahreshälfte liegt, und lies die Aufteilung ab.',
  ],
  faq: [
    { q: 'Wie funktioniert die Zwölftelung?', a: 'Für jeden vollen Monat der Beschäftigung entsteht ein Zwölftel des Jahresurlaubs. Bei 6 vollen Monaten und 30 Tagen Jahresurlaub sind das 6/12 × 30 = 15 Tage.' },
    { q: 'Warum kann beim Austritt ab Juli mehr zustehen?', a: 'Das Bundesurlaubsgesetz sieht die Zwölftelung nur für das Ausscheiden in der ersten Jahreshälfte ausdrücklich vor. Bei Austritt in der zweiten Jahreshälfte – nach erfüllter sechsmonatiger Wartezeit – entsteht der volle Jahresanspruch.' },
    { q: 'Kann ich Urlaub doppelt bekommen?', a: 'Nein. Der neue Arbeitgeber darf bereits gewährten Urlaub anrechnen. Deshalb stellt der alte Arbeitgeber eine Urlaubsbescheinigung über den im Jahr genommenen Urlaub aus.' },
    { q: 'Was passiert mit zu viel genommenem Urlaub?', a: 'Hast du beim alten Arbeitgeber mehr Urlaub genommen, als dir anteilig zusteht, muss dieser in der Regel nicht zurückgezahlt werden (§ 5 Abs. 3 BUrlG). Der Resturlaub kann dann aber negativ ausfallen.' },
  ],
  related: ['urlaubsanspruch-rechner', 'arbeitstage-rechner', 'teilzeit-gehalt-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { jahresurlaub: 30, monateAlt: 6, urlaubGenommen: 10, austrittHalbjahr: 'erste' },
      expect: [
        { label: 'Anspruch beim alten Arbeitgeber', value: 15, tolerance: 0.01 },
        { label: 'Resturlaub beim alten Arbeitgeber', value: 5, tolerance: 0.01 },
        { label: 'Anspruch beim neuen Arbeitgeber (Rest des Jahres)', value: 15, tolerance: 0.01 },
        { label: 'Gesamt im Wechseljahr', value: 20, tolerance: 0.01 },
      ],
    },
    {
      values: { jahresurlaub: 24, monateAlt: 8, urlaubGenommen: 12, austrittHalbjahr: 'zweite' },
      expect: [
        { label: 'Anspruch beim alten Arbeitgeber', value: 24, tolerance: 0.01 },
        { label: 'Resturlaub beim alten Arbeitgeber', value: 12, tolerance: 0.01 },
      ],
    },
  ],
};
