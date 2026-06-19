import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pv-speicher-dimensionierung-rechner',
  category: 'energie',
  title: 'PV-Speicher-Dimensionierung (kWh)',
  shortTitle: 'Speichergröße',
  description:
    'Berechne die sinnvolle Größe deines PV-Batteriespeichers in kWh aus Jahresstromverbrauch und Anlagenleistung - mit Faustformel und Plausibilitätscheck.',
  keywords: [
    'pv speicher dimensionierung',
    'wie groß stromspeicher',
    'batteriespeicher größe berechnen',
    'speichergröße photovoltaik',
    'kwh speicher rechner',
    'optimale speichergröße pv',
  ],
  intro:
    'Wie groß sollte ein PV-Batteriespeicher sein? Zu klein lässt Solarstrom ungenutzt, zu groß rechnet sich nicht. Eine bewährte Faustregel orientiert sich am Tagesstromverbrauch und an der Anlagenleistung: rund 1 kWh nutzbare Speicherkapazität je 1.000 kWh Jahresverbrauch bzw. je kWp PV-Leistung. Dieser Rechner ermittelt aus beiden Faustformeln eine sinnvolle Spanne. Die Werte sind Orientierung (Stand 2026); das Lastprofil entscheidet im Detail.',
  formula:
    'Empfehlung ≈ Mittel aus (Jahresverbrauch ÷ 1000) und (kWp); Spanne 0,8-1,2 × Tagesverbrauch',
  inputs: [
    { type: 'number', id: 'verbrauch', label: 'Jahresstromverbrauch', unit: 'kWh', default: 4500, min: 1, step: 100, help: 'Steht auf der Stromrechnung.' },
    { type: 'number', id: 'kwp', label: 'PV-Anlagenleistung', unit: 'kWp', default: 8, min: 0.1, step: 0.5 },
  ],
  compute: (v) => {
    const verbrauch = num(v.verbrauch);
    const kwp = num(v.kwp);
    const tagesverbrauch = verbrauch / 365;
    // Faustregel 1: 1 kWh je 1000 kWh Jahresverbrauch
    const ausVerbrauch = verbrauch / 1000;
    // Faustregel 2: 1 kWh je kWp installierter Leistung
    const ausKwp = kwp;
    const empfehlung = (ausVerbrauch + ausKwp) / 2;
    const untergrenze = empfehlung * 0.8;
    const obergrenze = empfehlung * 1.2;
    return [
      { label: 'Empfohlene Speichergröße', value: empfehlung, unit: 'kWh', digits: 1, primary: true },
      { label: 'Sinnvolle Spanne (untere Grenze)', value: untergrenze, unit: 'kWh', digits: 1 },
      { label: 'Sinnvolle Spanne (obere Grenze)', value: obergrenze, unit: 'kWh', digits: 1 },
      { label: 'Durchschnittlicher Tagesverbrauch', value: tagesverbrauch, unit: 'kWh', digits: 1 },
    ];
  },
  howto: [
    'Jährlichen Stromverbrauch des Haushalts in kWh eintragen.',
    'Leistung der PV-Anlage in kWp angeben.',
    'Empfohlene Speichergröße und die sinnvolle Spanne in kWh ablesen.',
    'Innerhalb der Spanne ein marktübliches Speichermodell wählen.',
  ],
  faq: [
    { q: 'Wie groß sollte mein Speicher sein?', a: 'Eine gängige Faustregel: rund 1 kWh nutzbare Kapazität je 1.000 kWh Jahresverbrauch und je kWp PV-Leistung. Für ein Einfamilienhaus mit ~4.500 kWh Verbrauch und 8 kWp liegt die Empfehlung grob bei 5-8 kWh.' },
    { q: 'Was passiert bei einem zu großen Speicher?', a: 'Sehr große Speicher werden vor allem im Winter nicht voll geladen und im Sommer schnell entladen - die zusätzlichen Kilowattstunden bringen kaum Autarkiegewinn, kosten aber Geld. Der Nutzen flacht oberhalb des Tagesverbrauchs deutlich ab.' },
    { q: 'Zählt nutzbare oder Brutto-Kapazität?', a: 'Die Faustregeln beziehen sich auf die nutzbare Kapazität. Hersteller geben oft eine etwas größere Brutto-Kapazität an, von der nur ein Teil (Entladetiefe) tatsächlich genutzt wird.' },
    { q: 'Ist die Empfehlung verbindlich?', a: 'Nein, es ist eine Orientierung (Stand 2026). Wärmepumpe, E-Auto und das individuelle Verbrauchsprofil verschieben den optimalen Wert. Eine Fachplanung berücksichtigt zusätzlich Wirtschaftlichkeit und Notstromwunsch.' },
  ],
  related: ['stromspeicher-rentabilitaet-rechner', 'pv-autarkiegrad-rechner', 'pv-ertrag-rechner', 'pv-dachflaeche-kwp-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { verbrauch: 4500, kwp: 8 },
      expect: [
        { label: 'Empfohlene Speichergröße', value: 6.25, tolerance: 0.01 },
        { label: 'Sinnvolle Spanne (obere Grenze)', value: 7.5, tolerance: 0.01 },
      ],
    },
  ],
};
