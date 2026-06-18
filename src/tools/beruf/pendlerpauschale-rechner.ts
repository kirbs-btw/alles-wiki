import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pendlerpauschale-rechner',
  category: 'beruf',
  title: 'Pendlerpauschale-Rechner (Entfernungspauschale)',
  shortTitle: 'Pendlerpauschale',
  description:
    'Berechne deine Entfernungspauschale als Werbungskosten: 0,30 € je km bis 20 km, 0,38 € ab dem 21. km – pro Jahr und pro Arbeitstag.',
  keywords: [
    'pendlerpauschale rechner',
    'entfernungspauschale berechnen',
    'fahrtkosten steuer',
    'kilometerpauschale arbeitsweg',
    'pendlerpauschale 2026',
    'werbungskosten fahrtweg',
  ],
  formula:
    'Pauschale = Arbeitstage × [ min(km,20) × 0,30 + max(km−20,0) × 0,38 ]  (einfache Entfernung)',
  inputs: [
    { type: 'number', id: 'km', label: 'Entfernung (einfache Strecke)', unit: 'km', default: 25, min: 0, step: 1, help: 'Nur die einfache Strecke zur Arbeit, nicht Hin- und Rückweg.' },
    { type: 'number', id: 'tage', label: 'Arbeitstage pro Jahr', unit: 'Tage', default: 220, min: 0, max: 365, step: 1, help: 'Tage mit Fahrt zur ersten Tätigkeitsstätte. Üblich sind ca. 220–230.' },
  ],
  compute: (v) => {
    const km = num(v.km);
    const tage = num(v.tage);

    const bis20 = Math.min(km, 20) * 0.3;
    const ab21 = Math.max(km - 20, 0) * 0.38;
    const proTag = bis20 + ab21;
    const proJahr = proTag * tage;

    return [
      { label: 'Entfernungspauschale pro Jahr', value: proJahr, unit: '€', digits: 2, primary: true },
      { label: 'Pauschale pro Arbeitstag', value: proTag, unit: '€', digits: 2 },
      { label: 'Anteil bis 20 km (je Tag)', value: bis20, unit: '€', digits: 2 },
      { label: 'Anteil ab 21 km (je Tag)', value: ab21, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Die Entfernungspauschale (Pendlerpauschale) senkt als Werbungskosten deine Steuerlast. Für die ersten 20 Kilometer der einfachen Strecke gelten 0,30 € je Kilometer, ab dem 21. Kilometer 0,38 €. Maßgeblich ist nur die einfache Entfernung – der Rückweg ist bereits eingerechnet. Der Rechner liefert eine Orientierung; die tatsächliche Steuerersparnis hängt von deinem Steuersatz ab.',
  howto: [
    'Trage die einfache Entfernung zwischen Wohnung und Arbeit in Kilometern ein.',
    'Gib die Zahl deiner Arbeitstage pro Jahr an (häufig 220–230).',
    'Lies die jährliche Entfernungspauschale ab – diese trägst du als Werbungskosten ein.',
  ],
  faq: [
    { q: 'Zählt die einfache oder die doppelte Strecke?', a: 'Es zählt nur die einfache Entfernung von der Wohnung zur ersten Tätigkeitsstätte. Der Rückweg ist im Kilometersatz bereits berücksichtigt.' },
    { q: 'Wie hoch ist die Pauschale 2026?', a: '0,30 € je Kilometer für die ersten 20 km und 0,38 € ab dem 21. Kilometer der einfachen Strecke. Die erhöhte Fernpendlerpauschale ab dem 21. km wurde entfristet.' },
    { q: 'Spielt das Verkehrsmittel eine Rolle?', a: 'Für die Entfernungspauschale grundsätzlich nicht – sie gilt auch für Fußgänger, Radfahrer oder ÖPNV-Nutzer. Bei höheren tatsächlichen ÖPNV-Kosten können diese gesondert geltend gemacht werden.' },
    { q: 'Ist das schon meine Steuerersparnis?', a: 'Nein. Die Pauschale ist der Werbungskostenbetrag, der dein zu versteuerndes Einkommen mindert. Die echte Ersparnis ist dieser Betrag multipliziert mit deinem persönlichen Grenzsteuersatz.' },
  ],
  related: ['reisekosten-kilometergeld-rechner', 'homeoffice-pauschale-rechner', 'arbeitstage-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { km: 25, tage: 220 },
      expect: [
        { label: 'Pauschale pro Arbeitstag', value: 7.9, tolerance: 0.01 },
        { label: 'Entfernungspauschale pro Jahr', value: 1738, tolerance: 0.5 },
      ],
    },
    {
      values: { km: 10, tage: 200 },
      expect: [
        { label: 'Pauschale pro Arbeitstag', value: 3, tolerance: 0.01 },
        { label: 'Entfernungspauschale pro Jahr', value: 600, tolerance: 0.5 },
      ],
    },
  ],
};
