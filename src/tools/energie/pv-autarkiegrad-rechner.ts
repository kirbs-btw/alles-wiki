import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-autarkiegrad-rechner',
  category: 'energie',
  title: 'PV-Autarkiegrad-Rechner',
  shortTitle: 'Autarkiegrad',
  description:
    'Schätze Autarkiegrad und Eigenverbrauchsanteil deiner Photovoltaik-Anlage aus Jahresertrag, Stromverbrauch und Batteriespeicher - so viel Strom deckst du selbst.',
  keywords: [
    'autarkiegrad berechnen',
    'pv autarkie rechner',
    'eigenverbrauchsanteil photovoltaik',
    'autarkie mit speicher',
    'unabhängigkeit stromnetz',
    'pv eigenversorgung',
  ],
  intro:
    'Der Autarkiegrad gibt an, welcher Anteil deines Stromverbrauchs aus der eigenen PV-Anlage gedeckt wird. Ohne Speicher liegt er typisch bei 25-35 %, mit Batteriespeicher steigt er auf 50-80 %. Dieser Rechner schätzt Autarkiegrad und Eigenverbrauchsanteil über bewährte Näherungsformeln aus Jahresertrag, Verbrauch und Speichergröße. Die Werte sind Orientierung, der reale Wert hängt vom Lastprofil ab.',
  formula: 'Autarkie ≈ selbst genutzter Solarstrom ÷ Jahresverbrauch (mit Speicher-Zuschlag)',
  inputs: [
    { type: 'number', id: 'ertrag', label: 'PV-Jahresertrag', unit: 'kWh', default: 8000, min: 0, step: 100, help: 'Faustregel: ~1000 kWh je kWp installierter Leistung.' },
    { type: 'number', id: 'verbrauch', label: 'Stromverbrauch pro Jahr', unit: 'kWh', default: 4500, min: 1, step: 100 },
    { type: 'number', id: 'speicher', label: 'Speicherkapazität (nutzbar)', unit: 'kWh', default: 0, min: 0, step: 0.5, help: '0 = kein Speicher. Typisch 5-10 kWh für ein Einfamilienhaus.' },
  ],
  compute: (v) => {
    const ertrag = num(v.ertrag);
    const verbrauch = num(v.verbrauch);
    const speicher = num(v.speicher);
    // Eigenverbrauchsquote ohne Speicher: empirische Näherung über Verhältnis Verbrauch/Ertrag
    const ratio = ertrag > 0 ? verbrauch / ertrag : 0;
    let evBasis = 0.32 + 0.18 * Math.min(ratio, 1); // ~32-50 % ohne Speicher
    if (evBasis > 0.6) evBasis = 0.6;
    // Speicher-Zuschlag: je kWh nutzbarer Kapazität bezogen auf Tagesverbrauch
    const tagesverbrauch = verbrauch / 365;
    const speicherFaktor = tagesverbrauch > 0 ? Math.min(speicher / (tagesverbrauch * 1.5), 1) : 0;
    let eigenverbrauchsanteil = evBasis + speicherFaktor * 0.35;
    if (eigenverbrauchsanteil > 0.95) eigenverbrauchsanteil = 0.95;
    const selbstgenutzt = Math.min(ertrag * eigenverbrauchsanteil, verbrauch);
    const autarkie = verbrauch > 0 ? selbstgenutzt / verbrauch : 0;
    const netzbezug = verbrauch - selbstgenutzt;
    return [
      { label: 'Autarkiegrad', value: autarkie * 100, unit: '%', digits: 1, primary: true },
      { label: 'Eigenverbrauchsanteil der PV', value: eigenverbrauchsanteil * 100, unit: '%', digits: 1 },
      { label: 'Selbst genutzter Solarstrom', value: selbstgenutzt, unit: 'kWh', digits: 0 },
      { label: 'Reststrombezug aus dem Netz', value: netzbezug, unit: 'kWh', digits: 0 },
    ];
  },
  howto: [
    'PV-Jahresertrag in kWh eintragen (rund 1000 kWh je kWp).',
    'Jährlichen Stromverbrauch des Haushalts angeben.',
    'Nutzbare Speicherkapazität eingeben - 0, wenn kein Batteriespeicher vorhanden ist.',
    'Autarkiegrad und Eigenverbrauchsanteil ablesen.',
  ],
  faq: [
    { q: 'Was ist der Unterschied zwischen Autarkiegrad und Eigenverbrauchsanteil?', a: 'Der Autarkiegrad bezieht den selbst genutzten Solarstrom auf den gesamten Stromverbrauch. Der Eigenverbrauchsanteil bezieht ihn auf den PV-Ertrag - er zeigt, wie viel des erzeugten Stroms direkt im Haus bleibt statt eingespeist zu werden.' },
    { q: 'Wie genau ist die Schätzung?', a: 'Der Rechner nutzt empirische Näherungsformeln. Der reale Autarkiegrad hängt stark vom Lastprofil ab - etwa ob viel Strom tagsüber verbraucht wird, ob Wärmepumpe oder E-Auto dazukommen. Die Werte sind als Orientierung zu verstehen.' },
    { q: 'Lohnt sich ein größerer Speicher?', a: 'Der Autarkiegewinn flacht ab: Die ersten Kilowattstunden Speicher bringen den größten Sprung, sehr große Speicher steigern die Autarkie kaum noch und rechnen sich oft nicht. Ein Speicher in der Größe des halben bis ganzen Tagesverbrauchs ist meist sinnvoll.' },
    { q: 'Kann ich 100 % Autarkie erreichen?', a: 'Vollständige Autarkie ist mit normalen Hausspeichern praktisch nicht erreichbar, weil im Winter zu wenig Solarstrom anfällt. Realistisch sind 60-80 % Jahresautarkie mit Speicher.' },
  ],
  related: ['stromspeicher-rentabilitaet-rechner', 'pv-eigenverbrauch-ersparnis-rechner', 'pv-ertrag-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { ertrag: 8000, verbrauch: 4500, speicher: 0 },
      expect: [
        { label: 'Eigenverbrauchsanteil der PV', value: 42.125, tolerance: 0.1 },
        { label: 'Autarkiegrad', value: 74.888, tolerance: 0.2 },
      ],
    },
  ],
};
