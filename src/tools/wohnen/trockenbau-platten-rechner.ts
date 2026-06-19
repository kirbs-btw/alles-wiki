import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'trockenbau-platten-rechner',
  category: 'wohnen',
  title: 'Trockenbau-Platten-Rechner',
  shortTitle: 'Gipskartonplatten',
  description:
    'Berechne für eine Trockenbauwand oder -decke die Anzahl der Gipskartonplatten, der CW/UW-Profile und der Schnellbauschrauben – inklusive Verschnitt.',
  keywords: [
    'gipskartonplatten berechnen',
    'trockenbau platten rechner',
    'rigips bedarf rechner',
    'cw profile berechnen',
    'trockenbauwand material',
    'gipskarton menge',
  ],
  formula:
    'Platten = ceil(Fläche × Seiten × (1+Verschnitt%) / Plattenfläche); CW-Profile = ceil(Wandlänge / Achsabstand) + 1; Schrauben ≈ Platten × 30',
  inputs: [
    { type: 'number', id: 'laenge', label: 'Wand-/Deckenlänge', unit: 'm', default: 4, min: 0, step: 0.1 },
    { type: 'number', id: 'hoehe', label: 'Höhe bzw. Tiefe', unit: 'm', default: 2.6, min: 0, step: 0.1 },
    {
      type: 'select', id: 'seiten', label: 'Beplankung', default: '2',
      options: [
        { value: '1', label: 'Einseitig (z. B. Decke / Vorsatzschale)' },
        { value: '2', label: 'Beidseitig (Ständerwand)' },
        { value: '4', label: 'Doppelt beidseitig (2 Lagen je Seite)' },
      ],
    },
    { type: 'number', id: 'plattenflaeche', label: 'Fläche je Platte', unit: 'm²', default: 3, min: 0.5, step: 0.1, help: 'Standardplatte 1,25 × 2,00 m = 2,5 m²; 1,25 × 2,60 m = 3,25 m². Default 3 m².' },
    { type: 'number', id: 'achsabstand', label: 'Achsabstand der CW-Profile', unit: 'm', default: 0.625, min: 0.3, max: 1, step: 0.025, help: 'Üblich 62,5 cm, bei höherer Last 41,7 cm.' },
    { type: 'number', id: 'verschnitt', label: 'Verschnitt-Zuschlag', unit: '%', default: 10, min: 0, max: 30, step: 1 },
  ],
  compute: (v) => {
    const laenge = num(v.laenge);
    const hoehe = num(v.hoehe);
    const seiten = num(v.seiten, 2);
    const plattenflaeche = num(v.plattenflaeche);
    const achsabstand = num(v.achsabstand);
    const verschnitt = num(v.verschnitt);
    const flaeche = laenge * hoehe;
    const beplankungsflaeche = flaeche * seiten * (1 + verschnitt / 100);
    const platten = plattenflaeche > 0 ? Math.ceil(beplankungsflaeche / plattenflaeche) : 0;
    const cwProfile = achsabstand > 0 ? Math.ceil(laenge / achsabstand) + 1 : 0;
    const uwMeter = laenge * 2;
    const schrauben = Math.ceil(platten * 30);
    return [
      { label: 'Benötigte Platten', value: platten, unit: 'Stück', digits: 0, primary: true },
      { label: 'CW-Profile (Ständer)', value: cwProfile, unit: 'Stück', digits: 0 },
      { label: 'UW-Profil (Boden + Decke)', value: uwMeter, unit: 'm', digits: 1 },
      { label: 'Schnellbauschrauben (ca.)', value: schrauben, unit: 'Stück', digits: 0 },
    ];
  },
  intro:
    'Eine Trockenbauwand besteht aus einem Ständerwerk aus CW-Profilen, das oben und unten in UW-Profile gesteckt wird, und der beidseitigen Beplankung mit Gipskartonplatten. Der Rechner ermittelt die Plattenzahl je nach Beplankung, die Anzahl der senkrechten CW-Profile aus dem Achsabstand sowie die Laufmeter UW-Profil und eine grobe Schraubenmenge. Die Schraubenschätzung basiert auf rund 30 Schrauben je Standardplatte – je nach Schraubabstand kann der Bedarf abweichen.',
  howto: [
    'Länge und Höhe der Wand (bzw. Länge und Tiefe der Decke) eingeben.',
    'Beplankung wählen: einseitig, beidseitig oder doppelt.',
    'Fläche je Platte und Achsabstand der Profile eintragen.',
    'Verschnitt festlegen und Platten-, Profil- und Schraubenbedarf ablesen.',
  ],
  faq: [
    { q: 'Welcher Achsabstand ist üblich?', a: 'Standard sind 62,5 cm Achsabstand der CW-Profile, sodass die Plattenstöße auf einem Profil liegen. Bei höheren Wänden oder schwereren Lasten reduziert man auf 41,7 cm.' },
    { q: 'Wie viele Schrauben pro Platte?', a: 'Als Richtwert dienen rund 30 Schnellbauschrauben je Standardplatte (Schraubabstand etwa 25 cm an den Profilen). Der genaue Bedarf hängt vom gewählten Abstand ab.' },
    { q: 'Wie viel UW-Profil brauche ich?', a: 'Das UW-Profil läuft oben und unten an der Wand entlang, also je Wandlänge zweimal. Der Rechner gibt diese Laufmeter aus; runden Sie auf volle Profillängen (meist 3 oder 4 m) auf.' },
  ],
  related: ['putz-rechner', 'wandfarbe-rechner', 'tapeten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { laenge: 4, hoehe: 2.6, seiten: '2', plattenflaeche: 3, achsabstand: 0.625, verschnitt: 10 },
      expect: [
        { label: 'Benötigte Platten', value: 8, tolerance: 0.01 },
        { label: 'CW-Profile (Ständer)', value: 8, tolerance: 0.01 },
        { label: 'UW-Profil (Boden + Decke)', value: 8, tolerance: 0.01 },
        { label: 'Schnellbauschrauben (ca.)', value: 240, tolerance: 0.01 },
      ],
    },
  ],
};
