import type { Tool } from '../../lib/types';
import { num, daysBetween } from '../../lib/types';

export const tool: Tool = {
  slug: 'bibliothek-mahngebuehr-rechner',
  category: 'bildung',
  title: 'Bibliotheks-Mahngebuehr-Rechner',
  shortTitle: 'Mahngebuehr',
  description:
    'Berechne die Mahngebuehr fuer ueberfaellige Bibliotheksbuecher aus Faelligkeitsdatum, Gebuehr pro Tag und Anzahl der Medien.',
  keywords: [
    'bibliothek mahngebuehr berechnen',
    'mahngebuehr rechner bibliothek',
    'ueberzogene buecher gebuehr',
    'saeumnisgebuehr bibliothek',
    'bibliothek strafe pro tag',
    'mahngebuehr buecher',
  ],
  intro:
    'Wer Bibliotheksmedien zu spaet zurueckgibt, zahlt eine Mahn- oder Saeumnisgebuehr. Diese wird meist pro ueberzogenem Tag und pro Medium berechnet, oft mit einer Obergrenze je Medium. Dieses Tool ermittelt die ueberfaelligen Tage aus Faelligkeits- und Rueckgabedatum und multipliziert sie mit der Gebuehr und der Anzahl der Medien – gedeckelt durch die Hoechstgebuehr. Die konkreten Saetze unterscheiden sich je Bibliothek; gib die Werte aus deiner Gebuehrenordnung ein. Stand 2026, ohne Gewaehr.',
  formula: 'Gebuehr je Medium = min(Hoechstgebuehr, ueberfaellige Tage × Satz/Tag); Gesamt = Gebuehr je Medium × Medien',
  inputs: [
    { type: 'date', id: 'faellig', label: 'Faelligkeitsdatum (Rueckgabefrist)', default: '2026-06-01' },
    { type: 'date', id: 'rueckgabe', label: 'Tatsaechliche Rueckgabe', default: '2026-06-19', today: true, help: 'Standard: heute.' },
    { type: 'number', id: 'satz', label: 'Gebuehr pro Tag und Medium', unit: '€', default: 0.2, min: 0, step: 0.05 },
    { type: 'number', id: 'medien', label: 'Anzahl Medien', default: 1, min: 1, step: 1 },
    { type: 'number', id: 'hoechst', label: 'Hoechstgebuehr je Medium', unit: '€', default: 10, min: 0, step: 1, help: '0 = keine Obergrenze.' },
  ],
  compute: (v) => {
    const satz = num(v.satz);
    const medien = num(v.medien) > 0 ? num(v.medien) : 1;
    const hoechst = num(v.hoechst);
    const diff = daysBetween(String(v.faellig), String(v.rueckgabe));
    const ueberfaellig = Math.max(0, diff);
    let proMedium = ueberfaellig * satz;
    if (hoechst > 0 && proMedium > hoechst) proMedium = hoechst;
    const gesamt = proMedium * medien;
    return [
      { label: 'Mahngebuehr gesamt', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Gebuehr je Medium', value: proMedium, unit: '€', digits: 2 },
      { label: 'Ueberfaellige Tage', value: ueberfaellig, digits: 0, unit: 'Tage' },
    ];
  },
  howto: [
    'Faelligkeitsdatum (Ende der Leihfrist) eintragen.',
    'Tatsaechliches oder geplantes Rueckgabedatum waehlen.',
    'Gebuehr pro Tag und Medium aus deiner Gebuehrenordnung eingeben.',
    'Anzahl der Medien und ggf. die Hoechstgebuehr eintragen und Summe ablesen.',
  ],
  faq: [
    { q: 'Wie hoch ist die Mahngebuehr ueblicherweise?', a: 'Das variiert stark je Bibliothek – haeufig liegen die Saetze zwischen etwa 0,10 und 0,50 Euro pro Tag und Medium, oft mit einer Obergrenze. Maszgeblich ist die Gebuehrenordnung deiner Bibliothek.' },
    { q: 'Ab wann wird gezaehlt?', a: 'In der Regel ab dem ersten Tag nach Ablauf der Leihfrist. Das Tool zaehlt die vollen Tage zwischen Faelligkeit und Rueckgabe.' },
    { q: 'Was bedeutet die Hoechstgebuehr?', a: 'Viele Bibliotheken deckeln die Gebuehr pro Medium, sodass sie nicht unbegrenzt steigt. Trage 0 ein, wenn deine Bibliothek keine Obergrenze hat.' },
    { q: 'Kann ich Mahngebuehren vermeiden?', a: 'Ja, durch rechtzeitige Verlaengerung der Leihfrist online oder vor Ort – sofern das Medium nicht vorgemerkt ist. Viele Bibliotheken bieten zudem Erinnerungs-Mails an.' },
  ],
  related: ['tage-zwischen-daten-rechner', 'tage-bis-rechner', 'studienkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { faellig: '2026-06-01', rueckgabe: '2026-06-19', satz: 0.2, medien: 1, hoechst: 10 },
      // 18 Tage * 0,20 = 3,60 €
      expect: [
        { label: 'Ueberfaellige Tage', value: 18, tolerance: 0 },
        { label: 'Mahngebuehr gesamt', value: 3.6, tolerance: 0.001 },
      ],
    },
    {
      values: { faellig: '2026-06-01', rueckgabe: '2026-07-31', satz: 0.5, medien: 2, hoechst: 10 },
      // 60 Tage * 0,50 = 30 -> gedeckelt 10 je Medium; 2 Medien = 20
      expect: [{ label: 'Mahngebuehr gesamt', value: 20, tolerance: 0.001 }],
    },
  ],
};
