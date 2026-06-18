import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'lohnfortzahlung-rechner',
  category: 'beruf',
  title: 'Lohnfortzahlung im Krankheitsfall Rechner',
  shortTitle: 'Lohnfortzahlung',
  description:
    'Berechne deine Entgeltfortzahlung bei Krankheit: 100 % des Gehalts für bis zu 42 Tage (6 Wochen) je Krankheitsfall – mit verbleibender Anspruchsdauer.',
  keywords: [
    'lohnfortzahlung rechner',
    'entgeltfortzahlung krankheit',
    '6 wochen lohnfortzahlung',
    'lohnfortzahlung 42 tage',
    'gehalt bei krankheit berechnen',
    'krankheit lohnfortzahlung dauer',
  ],
  formula:
    '100 % Entgeltfortzahlung für max. 42 Kalendertage; danach Krankengeld der Kasse',
  inputs: [
    { type: 'number', id: 'monatsgehalt', label: 'Brutto-Monatsgehalt', unit: '€', default: 3000, min: 0, step: 50 },
    { type: 'number', id: 'krankheitstage', label: 'Krankheitstage (Kalendertage)', unit: 'Tage', default: 14, min: 0, step: 1, help: 'Zusammenhängende Arbeitsunfähigkeit in Kalendertagen.' },
    { type: 'number', id: 'bereitsKrank', label: 'Bereits genutzte Tage (gleiche Krankheit)', unit: 'Tage', default: 0, min: 0, max: 42, step: 1, help: 'Tage der Entgeltfortzahlung, die bei derselben Erkrankung schon verbraucht wurden.' },
  ],
  compute: (v) => {
    const monatsgehalt = num(v.monatsgehalt);
    const krankheitstage = num(v.krankheitstage);
    const bereitsKrank = num(v.bereitsKrank);

    const maxTage = 42;
    const restanspruch = Math.max(maxTage - bereitsKrank, 0);
    const fortzahlungsTage = Math.min(krankheitstage, restanspruch);
    const ueberTage = Math.max(krankheitstage - fortzahlungsTage, 0);

    const tagessatz = monatsgehalt / 30;
    const fortzahlung = tagessatz * fortzahlungsTage;

    return [
      { label: 'Tage mit voller Lohnfortzahlung', value: fortzahlungsTage, unit: 'Tage', digits: 0, primary: true },
      { label: 'Entgelt für diese Tage', value: fortzahlung, unit: '€', digits: 2 },
      { label: 'Tage ohne Fortzahlung (dann Krankengeld)', value: ueberTage, unit: 'Tage', digits: 0 },
      { label: 'Verbleibender Anspruch (6-Wochen-Frist)', value: Math.max(restanspruch - fortzahlungsTage, 0), unit: 'Tage', digits: 0 },
    ];
  },
  intro:
    'Bei krankheitsbedingter Arbeitsunfähigkeit zahlt der Arbeitgeber das Entgelt für bis zu sechs Wochen (42 Kalendertage) je Krankheitsfall in voller Höhe weiter. Danach übernimmt in der Regel die Krankenkasse mit dem niedrigeren Krankengeld. Der Rechner zeigt, wie viele Tage Entgeltfortzahlung dir noch zustehen und welches Entgelt darauf entfällt. Die Werte sind eine Orientierung; Details regeln Gesetz, Vertrag und Tarif.',
  howto: [
    'Trage dein Brutto-Monatsgehalt ein.',
    'Gib die Dauer der Arbeitsunfähigkeit in Kalendertagen an.',
    'Erfasse bereits verbrauchte Fortzahlungstage derselben Erkrankung.',
    'Lies die Tage mit voller Lohnfortzahlung und das zugehörige Entgelt ab.',
  ],
  faq: [
    { q: 'Wie lange gilt die Lohnfortzahlung?', a: 'Bis zu sechs Wochen, also 42 Kalendertage, je Krankheitsfall in voller Höhe des Arbeitsentgelts.' },
    { q: 'Was passiert nach den sechs Wochen?', a: 'Dann endet die Entgeltfortzahlung des Arbeitgebers. Gesetzlich Versicherte erhalten anschließend Krankengeld der Krankenkasse, das niedriger ausfällt.' },
    { q: 'Gilt die Frist pro Krankheit oder pro Jahr?', a: 'Grundsätzlich je Krankheitsfall. Bei einer neuen, anderen Erkrankung beginnt der Anspruch neu. Bei derselben Erkrankung gelten besondere Anrechnungs- und Fristregeln.' },
    { q: 'Warum durch 30 geteilt?', a: 'Für den Tagessatz wird der Monat vereinfacht mit 30 Kalendertagen angesetzt. Das ist eine gängige Näherung; reale Abrechnungen können abweichen.' },
  ],
  related: ['kurzarbeitergeld-rechner', 'jahresgehalt-rechner', 'teilzeit-gehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { monatsgehalt: 3000, krankheitstage: 14, bereitsKrank: 0 },
      expect: [
        { label: 'Tage mit voller Lohnfortzahlung', value: 14, tolerance: 0.01 },
        { label: 'Entgelt für diese Tage', value: 1400, tolerance: 0.01 },
        { label: 'Verbleibender Anspruch (6-Wochen-Frist)', value: 28, tolerance: 0.01 },
      ],
    },
    {
      values: { monatsgehalt: 3000, krankheitstage: 50, bereitsKrank: 0 },
      expect: [
        { label: 'Tage mit voller Lohnfortzahlung', value: 42, tolerance: 0.01 },
        { label: 'Tage ohne Fortzahlung (dann Krankengeld)', value: 8, tolerance: 0.01 },
      ],
    },
  ],
};
