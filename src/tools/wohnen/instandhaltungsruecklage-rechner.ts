import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'instandhaltungsruecklage-rechner',
  category: 'wohnen',
  title: 'Instandhaltungsrücklage-Rechner',
  shortTitle: 'Instandhaltungsrücklage',
  description:
    'Ermittle eine empfohlene Instandhaltungsrücklage für deine Eigentumswohnung nach der Petersschen Formel – als Jahresbetrag und monatliche Rücklage je m².',
  keywords: [
    'instandhaltungsrücklage berechnen',
    'peterssche formel rechner',
    'instandhaltungsrücklage wohnung',
    'rücklage eigentumswohnung',
    'instandhaltungsrücklage höhe',
    'instandhaltungskosten rücklage',
  ],
  formula:
    'Jahresrücklage = (Herstellungskosten je m² × 1,5 / 80) × Wohnfläche (Peterssche Formel)',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Wohnfläche', unit: 'm²', default: 80, min: 1, step: 1 },
    { type: 'number', id: 'herstellung', label: 'Herstellungskosten je m²', unit: '€/m²', default: 2500, min: 0, step: 50, help: 'Reine Baukosten je m² (ohne Grundstück), Richtwert 2026 ca. 2.500–3.500 €.' },
    { type: 'number', id: 'faktor', label: 'Anteil Gemeinschaftseigentum', unit: '%', default: 100, min: 0, max: 100, step: 5, help: 'Üblich 70–80 %, da nur Gemeinschaftseigentum aus der Rücklage gepflegt wird.' },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const herstellung = num(v.herstellung);
    const faktor = num(v.faktor, 100) / 100;
    const jahrProQm = (herstellung * 1.5) / 80;
    const jahr = jahrProQm * flaeche * faktor;
    const monat = jahr / 12;
    const monatProQm = flaeche > 0 ? monat / flaeche : 0;
    return [
      { label: 'Empfohlene Jahresrücklage', value: jahr, unit: '€', digits: 2, primary: true },
      { label: 'Monatliche Rücklage', value: monat, unit: '€', digits: 2 },
      { label: 'Rücklage je m² und Monat', value: monatProQm, unit: '€/m²', digits: 2 },
    ];
  },
  intro:
    'Wer eine Eigentumswohnung besitzt, sollte regelmäßig Geld für künftige Reparaturen am Gemeinschaftseigentum zurücklegen. Die Peterssche Formel ist ein verbreiteter Richtwert: Über die angenommene Nutzungsdauer von 80 Jahren fallen Instandhaltungskosten in Höhe des etwa 1,5-fachen der Herstellungskosten an. Dieser Rechner liefert eine grobe Orientierung – die tatsächlich nötige Rücklage hängt von Alter, Zustand und anstehenden Sanierungen des Gebäudes ab.',
  howto: [
    'Wohnfläche der Eigentumswohnung eingeben.',
    'Herstellungskosten je m² schätzen (reine Baukosten ohne Grundstück).',
    'Anteil des Gemeinschaftseigentums wählen (oft 70–80 %).',
    'Empfohlene Jahres- und Monatsrücklage ablesen.',
  ],
  faq: [
    { q: 'Was ist die Peterssche Formel?', a: 'Eine Faustregel zur Höhe der Instandhaltungsrücklage: Über 80 Jahre Nutzungsdauer wird das 1,5-fache der Herstellungskosten für Instandhaltung angesetzt. Pro Jahr ergibt das (Herstellungskosten je m² × 1,5 / 80) × Wohnfläche.' },
    { q: 'Warum nur Gemeinschaftseigentum?', a: 'Aus der Rücklage werden nur Dach, Fassade, Treppenhaus, Heizung und andere gemeinschaftliche Bauteile bezahlt. Sondereigentum innerhalb der Wohnung trägt jeder Eigentümer selbst, deshalb wird oft nur 70–80 % angesetzt.' },
    { q: 'Ist die Rücklage gesetzlich vorgeschrieben?', a: 'Eine angemessene Erhaltungsrücklage ist nach dem WEG-Recht vorgesehen, die genaue Höhe legt die Eigentümergemeinschaft per Beschluss fest. Die Peterssche Formel ist nur eine Orientierung, kein gesetzlicher Pflichtbetrag.' },
    { q: 'Reicht die berechnete Rücklage immer aus?', a: 'Nicht zwingend. Ältere Gebäude oder anstehende Großsanierungen (Dach, Fenster, Energetik) können höhere Rücklagen erfordern. Der Wert ist ein Mindest-Richtwert, keine Garantie.' },
  ],
  related: ['modernisierungsumlage-rechner', 'nebenkosten-umlage-rechner', 'mietrendite-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 80, herstellung: 2500, faktor: 100 },
      expect: [
        { label: 'Empfohlene Jahresrücklage', value: 3750, tolerance: 0.01 },
        { label: 'Monatliche Rücklage', value: 312.5, tolerance: 0.01 },
        { label: 'Rücklage je m² und Monat', value: 3.91, tolerance: 0.02 },
      ],
    },
    {
      values: { flaeche: 100, herstellung: 3000, faktor: 80 },
      expect: [
        { label: 'Empfohlene Jahresrücklage', value: 4500, tolerance: 0.01 },
      ],
    },
  ],
};
