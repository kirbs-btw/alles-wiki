import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fahrverbot-bussgeld-rechner',
  category: 'recht',
  title: 'Geschwindigkeit & Fahrverbot-Rechner (Orientierung)',
  shortTitle: 'Tempo-Verstoß',
  description:
    'Ermittle die Überschreitung nach Toleranzabzug und sieh die grobe Folge laut Bußgeldkatalog: Verwarnung, Bußgeld, Punkte und mögliches Fahrverbot (Orientierung).',
  keywords: [
    'fahrverbot rechner',
    'geschwindigkeitsüberschreitung rechner',
    'bußgeld tempo rechner',
    'toleranzabzug tempo',
    'wie viel zu schnell fahrverbot',
    'bußgeldkatalog geschwindigkeit',
  ],
  formula: 'Überschreitung = (gefahren − Toleranz) − erlaubt; Toleranz = max(3 km/h, 3 % bei > 100 km/h)',
  inputs: [
    { type: 'number', id: 'gefahren', label: 'Gefahrene Geschwindigkeit', unit: 'km/h', default: 80, min: 0, step: 1, help: 'Vom Messgerät angezeigter Wert.' },
    { type: 'number', id: 'erlaubt', label: 'Erlaubte Geschwindigkeit', unit: 'km/h', default: 50, min: 0, step: 1, help: 'Zulässige Höchstgeschwindigkeit an der Messstelle.' },
    {
      type: 'select', id: 'bereich', label: 'Bereich', default: 'innerorts',
      options: [
        { value: 'innerorts', label: 'innerorts' },
        { value: 'ausserorts', label: 'außerorts' },
      ],
    },
  ],
  compute: (v) => {
    const gefahren = num(v.gefahren);
    const erlaubt = num(v.erlaubt);
    const innerorts = String(v.bereich) !== 'ausserorts';
    // Messtoleranz: 3 km/h bis 100 km/h, sonst 3 %
    const toleranz = gefahren <= 100 ? 3 : gefahren * 0.03;
    const korrigiert = Math.max(0, gefahren - toleranz);
    const ueberschreitung = Math.max(0, korrigiert - erlaubt);

    // grobe Einordnung nach Bußgeldkatalog (Stand 2026)
    let folge: string;
    let fahrverbot = 0; // Monate
    const u = ueberschreitung;
    if (u <= 0) folge = 'keine Überschreitung';
    else if (u <= 10) folge = innerorts ? 'Verwarnungsgeld ca. 30 €' : 'Verwarnungsgeld ca. 20 €';
    else if (u <= 15) folge = innerorts ? 'Bußgeld ca. 50 €' : 'Bußgeld ca. 40 €';
    else if (u <= 20) folge = innerorts ? 'Bußgeld ca. 70 €' : 'Bußgeld ca. 60 €';
    else if (u <= 25) folge = innerorts ? 'Bußgeld ca. 115 € + 1 Punkt' : 'Bußgeld ca. 100 € + 1 Punkt';
    else if (u <= 30) folge = innerorts ? 'Bußgeld ca. 180 € + 1 Punkt' : 'Bußgeld ca. 150 € + 1 Punkt';
    else if (u <= 40) {
      folge = innerorts ? 'Bußgeld ca. 260 € + 2 Punkte + 1 Monat Fahrverbot' : 'Bußgeld ca. 200 € + 1 Punkt';
      fahrverbot = innerorts ? 1 : 0;
    } else if (u <= 50) {
      folge = innerorts ? 'Bußgeld ca. 400 € + 2 Punkte + 1 Monat Fahrverbot' : 'Bußgeld ca. 320 € + 2 Punkte + 1 Monat Fahrverbot';
      fahrverbot = 1;
    } else if (u <= 60) {
      folge = innerorts ? 'Bußgeld ca. 560 € + 2 Punkte + 2 Monate Fahrverbot' : 'Bußgeld ca. 480 € + 2 Punkte + 1 Monat Fahrverbot';
      fahrverbot = innerorts ? 2 : 1;
    } else if (u <= 70) {
      folge = innerorts ? 'Bußgeld ca. 700 € + 2 Punkte + 3 Monate Fahrverbot' : 'Bußgeld ca. 600 € + 2 Punkte + 2 Monate Fahrverbot';
      fahrverbot = innerorts ? 3 : 2;
    } else {
      folge = innerorts ? 'Bußgeld ca. 800 € + 2 Punkte + 3 Monate Fahrverbot' : 'Bußgeld ca. 700 € + 2 Punkte + 3 Monate Fahrverbot';
      fahrverbot = 3;
    }

    return [
      { label: 'Überschreitung (nach Toleranz)', value: ueberschreitung, unit: 'km/h', digits: 0, primary: true },
      { label: 'Mögliche Folge', value: folge },
      { label: 'Fahrverbot (Orientierung)', value: fahrverbot, unit: 'Monate', digits: 0 },
      { label: 'Abgezogene Toleranz', value: toleranz, unit: 'km/h', digits: 1 },
    ];
  },
  intro:
    'Vor der Bewertung einer Geschwindigkeitsmessung wird ein Toleranzabzug vorgenommen: bis 100 km/h pauschal 3 km/h, darüber 3 % des Messwertes. Die verbleibende Überschreitung entscheidet über Verwarnung, Bußgeld, Punkte und ein mögliches Fahrverbot. Dieser Rechner liefert eine grobe Orientierung nach dem bundeseinheitlichen Bußgeldkatalog (Stand 2026) für Pkw ohne erschwerende Umstände – der konkrete Bescheid kann abweichen.',
  howto: [
    'Gefahrene und erlaubte Geschwindigkeit eingeben.',
    'Bereich (innerorts/außerorts) wählen.',
    'Überschreitung nach Toleranzabzug und mögliche Folge ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist der Toleranzabzug?', a: 'Bei Messwerten bis 100 km/h werden 3 km/h abgezogen, darüber 3 % des angezeigten Wertes. Dieser Abzug berücksichtigt die Messungenauigkeit der Geräte.' },
    { q: 'Ab wann droht ein Fahrverbot?', a: 'Innerorts droht ein Fahrverbot in der Regel ab 31 km/h Überschreitung, außerorts ab 41 km/h. Auch zwei Verstöße über 26 km/h innerhalb eines Jahres können ein Fahrverbot auslösen.' },
    { q: 'Sind die Beträge verbindlich?', a: 'Nein. Es handelt sich um Regelsätze des Bußgeldkatalogs für gewöhnliche Fälle. Voreintragungen, Gefährdungen oder Sachschäden können die Sanktion erhöhen.' },
    { q: 'Gilt der Rechner auch für Lkw?', a: 'Nein, hier sind die strengeren Sätze für Lkw und Gefahrguttransporte nicht abgebildet. Der Rechner gilt für Pkw und Motorräder als Orientierung.' },
  ],
  related: ['punkte-flensburg-rechner', 'bremsweg-anhalteweg-rechner'],
  examples: [
    {
      values: { gefahren: 80, erlaubt: 50, bereich: 'innerorts' },
      expect: [
        { label: 'Überschreitung (nach Toleranz)', value: 27, tolerance: 0.5 },
        { label: 'Abgezogene Toleranz', value: 3, tolerance: 0.01 },
        { label: 'Fahrverbot (Orientierung)', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { gefahren: 95, erlaubt: 50, bereich: 'innerorts' },
      expect: [
        { label: 'Überschreitung (nach Toleranz)', value: 42, tolerance: 0.5 },
        { label: 'Fahrverbot (Orientierung)', value: 1, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
