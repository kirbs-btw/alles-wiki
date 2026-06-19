import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'abstand-bussgeld-rechner',
  category: 'recht',
  title: 'Abstand-Bußgeld-Rechner (zu geringer Abstand)',
  shortTitle: 'Abstand-Verstoß',
  description:
    'Ermittle den vorgeschriebenen Mindestabstand (halber Tacho) und die grobe Folge bei Unterschreitung: Bußgeld, Punkte und mögliches Fahrverbot laut Bußgeldkatalog. Orientierung.',
  keywords: [
    'abstand bußgeld rechner',
    'mindestabstand auto rechner',
    'halber tacho abstand',
    'zu wenig abstand strafe',
    'abstandsverstoß bußgeld',
    'abstand fahrverbot',
  ],
  formula:
    'Soll-Abstand ≈ halber Tacho (m) = Geschwindigkeit / 2;  Bewertung der Unterschreitung in % des halben Tachos (gilt erst ab > 80 km/h)',
  inputs: [
    {
      type: 'number',
      id: 'tempo',
      label: 'Gefahrene Geschwindigkeit',
      unit: 'km/h',
      default: 130,
      min: 0,
      max: 250,
      step: 1,
      help: 'Sanktionen für Abstandsverstöße gelten erst ab mehr als 80 km/h.',
    },
    {
      type: 'number',
      id: 'abstand',
      label: 'Tatsächlicher Abstand',
      unit: 'm',
      default: 25,
      min: 0,
      max: 500,
      step: 1,
      help: 'Gemessener Abstand zum vorausfahrenden Fahrzeug.',
    },
  ],
  compute: (v) => {
    const tempo = Math.max(0, num(v.tempo));
    const abstand = Math.max(0, num(v.abstand));
    // Soll-Abstand: halber Tacho in Metern (Faustregel).
    const sollAbstand = tempo / 2;
    // Anteil des halben Tachos, der eingehalten wird.
    const anteil = sollAbstand > 0 ? (abstand / sollAbstand) * 100 : 100;

    let folge: string;
    let bussgeld = 0;
    let punkte = 0;
    let fahrverbot = 0; // Monate

    if (tempo <= 80) {
      folge = 'Sanktionen gelten erst ab mehr als 80 km/h';
    } else if (anteil >= 50) {
      folge = 'kein Regelverstoß (Abstand mindestens halber Tacho)';
    } else if (anteil >= 4 / 10 * 100) {
      // 4/10 des halben Tachos
      bussgeld = 75;
      punkte = 1;
      folge = 'Bußgeld 75 € + 1 Punkt';
    } else if (anteil >= 3 / 10 * 100) {
      bussgeld = 100;
      punkte = 1;
      folge = 'Bußgeld 100 € + 1 Punkt';
    } else if (anteil >= 2 / 10 * 100) {
      // ab hier zusätzlich Fahrverbot ab > 100 km/h
      bussgeld = tempo > 100 ? 160 : 160;
      punkte = tempo > 100 ? 2 : 1;
      fahrverbot = tempo > 100 ? 1 : 0;
      folge = tempo > 100 ? 'Bußgeld 160 € + 2 Punkte + 1 Monat Fahrverbot' : 'Bußgeld 160 € + 1 Punkt';
    } else if (anteil >= 1 / 10 * 100) {
      bussgeld = tempo > 100 ? 240 : 240;
      punkte = tempo > 100 ? 2 : 1;
      fahrverbot = tempo > 100 ? 2 : 0;
      folge = tempo > 100 ? 'Bußgeld 240 € + 2 Punkte + 2 Monate Fahrverbot' : 'Bußgeld 240 € + 1 Punkt';
    } else {
      bussgeld = tempo > 100 ? 320 : 320;
      punkte = tempo > 100 ? 2 : 1;
      fahrverbot = tempo > 100 ? 3 : 0;
      folge = tempo > 100 ? 'Bußgeld 320 € + 2 Punkte + 3 Monate Fahrverbot' : 'Bußgeld 320 € + 1 Punkt';
    }

    return [
      { label: 'Mögliche Folge', value: folge, primary: true },
      { label: 'Vorgeschriebener Abstand (halber Tacho)', value: sollAbstand, unit: 'm', digits: 1 },
      { label: 'Eingehaltener Anteil', value: anteil, unit: '%', digits: 0 },
      { label: 'Bußgeld (Orientierung)', value: bussgeld, unit: '€', digits: 0 },
      { label: 'Punkte', value: punkte, digits: 0 },
      { label: 'Fahrverbot (Orientierung)', value: fahrverbot, unit: 'Monate', digits: 0 },
    ];
  },
  intro:
    'Der Sicherheitsabstand zum vorausfahrenden Fahrzeug soll außerorts mindestens dem „halben Tacho“ in Metern entsprechen (Faustregel; bei 100 km/h also rund 50 m). Wird er unterschritten, drohen ab mehr als 80 km/h Bußgeld, Punkte und – bei mehr als 100 km/h und großer Unterschreitung – ein Fahrverbot. Die Sanktion bemisst sich danach, welcher Anteil des halben Tachos noch eingehalten wurde. Dieser Rechner liefert eine grobe Orientierung nach dem Bußgeldkatalog (Stand 2026) für Pkw – der konkrete Bescheid kann abweichen.',
  howto: [
    'Gefahrene Geschwindigkeit eingeben.',
    'Tatsächlich gemessenen Abstand in Metern eintragen.',
    'Soll-Abstand, eingehaltenen Anteil und mögliche Folge ablesen.',
  ],
  faq: [
    {
      q: 'Wie groß muss der Abstand sein?',
      a: 'Faustregel außerorts: mindestens halber Tacho in Metern, also bei 100 km/h rund 50 m. Innerorts genügt meist der „Reaktionsabstand“ von etwa einer Wagenlänge je 10 km/h.',
    },
    {
      q: 'Ab wann gibt es ein Bußgeld?',
      a: 'Sanktioniert wird erst ab mehr als 80 km/h. Maßgeblich ist, wie stark der halbe Tacho unterschritten wurde – je weniger Abstand, desto höher Bußgeld, Punkte und Fahrverbot.',
    },
    {
      q: 'Wann droht ein Fahrverbot?',
      a: 'In der Regel bei sehr geringem Abstand (weniger als 3/10 des halben Tachos) und Geschwindigkeiten über 100 km/h. Dann sind ein bis drei Monate Fahrverbot vorgesehen.',
    },
    {
      q: 'Sind die Beträge verbindlich?',
      a: 'Nein. Es handelt sich um Regelsätze des Bußgeldkatalogs für gewöhnliche Fälle. Voreintragungen oder Gefährdungen können die Sanktion erhöhen. Der Rechner ersetzt keine Rechtsberatung.',
    },
  ],
  related: ['fahrverbot-bussgeld-rechner', 'punkte-flensburg-rechner'],
  examples: [
    {
      // 130 km/h, Abstand 25 m. Halber Tacho = 65 m. Anteil = 25/65*100 = 38,46 % -> < 40 %, >= 30 % -> 100 €/1 Punkt
      values: { tempo: 130, abstand: 25 },
      expect: [
        { label: 'Vorgeschriebener Abstand (halber Tacho)', value: 65, tolerance: 0.01 },
        { label: 'Bußgeld (Orientierung)', value: 100, tolerance: 0.01 },
        { label: 'Punkte', value: 1, tolerance: 0 },
        { label: 'Fahrverbot (Orientierung)', value: 0, tolerance: 0 },
      ],
    },
    {
      // 120 km/h, Abstand 10 m. Halber Tacho = 60 m. Anteil = 10/60*100 = 16,67 % -> < 20 %, >= 10 % -> tempo>100 -> 240 €,2 Punkte,2 Monate
      values: { tempo: 120, abstand: 10 },
      expect: [
        { label: 'Vorgeschriebener Abstand (halber Tacho)', value: 60, tolerance: 0.01 },
        { label: 'Bußgeld (Orientierung)', value: 240, tolerance: 0.01 },
        { label: 'Punkte', value: 2, tolerance: 0 },
        { label: 'Fahrverbot (Orientierung)', value: 2, tolerance: 0 },
      ],
    },
  ],
  updated: '2026-06-19',
};
