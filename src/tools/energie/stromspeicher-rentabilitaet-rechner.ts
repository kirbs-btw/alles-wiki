import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'stromspeicher-rentabilitaet-rechner',
  category: 'energie',
  title: 'Stromspeicher-Rentabilitäts-Rechner',
  shortTitle: 'Speicher-Rentabilität',
  description:
    'Prüfe, ob sich ein PV-Batteriespeicher lohnt: jährliche Ersparnis durch mehr Eigenverbrauch, Amortisationszeit und Kosten je gespeicherter kWh.',
  keywords: [
    'stromspeicher rentabilität',
    'batteriespeicher lohnt sich',
    'pv speicher amortisation',
    'speicher wirtschaftlichkeit',
    'kosten pro kwh speicher',
    'solarspeicher rechner',
  ],
  intro:
    'Ein Batteriespeicher erhöht den Eigenverbrauch deiner PV-Anlage: Strom, den du sonst günstig einspeist, nutzt du selbst und sparst dafür den teuren Netzbezug. Dieser Rechner schätzt die jährliche Ersparnis aus zusätzlich eigenverbrauchter Energie und vergleicht sie mit den Anschaffungskosten. Ergebnis sind Amortisationszeit und die Speicherkosten je durchgesetzter Kilowattstunde - die zentrale Wirtschaftlichkeitskennzahl.',
  formula: 'Ersparnis/Jahr = zusätzl. Eigenverbrauch × (Strompreis − Einspeisevergütung); Amortisation = Kosten ÷ Ersparnis',
  inputs: [
    { type: 'number', id: 'kosten', label: 'Anschaffungskosten Speicher', unit: '€', default: 8000, min: 0, step: 100, help: 'Inkl. Installation. Faustregel ~800-1200 € je kWh Kapazität.' },
    { type: 'number', id: 'kapazitaet', label: 'Nutzbare Kapazität', unit: 'kWh', default: 8, min: 0.1, step: 0.5 },
    { type: 'number', id: 'zyklen', label: 'Vollzyklen pro Jahr', unit: '', default: 250, min: 0, step: 10, help: 'Wie oft der Speicher pro Jahr ge- und entladen wird. Typisch 200-300.' },
    { type: 'number', id: 'wirkungsgrad', label: 'Speicher-Wirkungsgrad', unit: '%', default: 90, min: 1, max: 100, step: 1, help: 'Round-Trip-Wirkungsgrad, typisch 88-95 %.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis (Netzbezug)', unit: 'ct/kWh', default: 35, min: 0, step: 0.5 },
    { type: 'number', id: 'verguetung', label: 'Einspeisevergütung', unit: 'ct/kWh', default: 8, min: 0, step: 0.1, help: 'Entgangene Einnahme, da der Strom nicht eingespeist wird.' },
  ],
  compute: (v) => {
    const kosten = num(v.kosten);
    const kapazitaet = num(v.kapazitaet);
    const zyklen = num(v.zyklen);
    const wg = num(v.wirkungsgrad) / 100;
    const strompreis = num(v.strompreis) / 100;
    const verguetung = num(v.verguetung) / 100;
    // Nutzbar entladene Energie pro Jahr (nach Wirkungsgradverlust)
    const durchgesetzt = kapazitaet * zyklen * wg;
    // Vorteil je kWh: gespart wird Netzbezug, entgeht Einspeisevergütung
    const vorteilProKwh = strompreis - verguetung;
    const ersparnis = durchgesetzt * vorteilProKwh;
    const amortisation = ersparnis > 0 ? kosten / ersparnis : 0;
    const speicherkostenProKwh = durchgesetzt > 0 ? kosten / (durchgesetzt * 10) : 0; // bei ~10 Jahren Lebensdauer
    return [
      { label: 'Jährliche Ersparnis', value: ersparnis, unit: '€', digits: 2, primary: true },
      { label: 'Amortisationszeit', value: amortisation, unit: 'Jahre', digits: 1 },
      { label: 'Eigenverbrauchte Energie pro Jahr', value: durchgesetzt, unit: 'kWh', digits: 0 },
      { label: 'Speicherkosten je kWh (über 10 Jahre)', value: speicherkostenProKwh, unit: '€/kWh', digits: 3 },
    ];
  },
  howto: [
    'Anschaffungskosten des Speichers inklusive Installation eintragen.',
    'Nutzbare Speicherkapazität und die jährlichen Vollzyklen angeben.',
    'Round-Trip-Wirkungsgrad sowie Strompreis und Einspeisevergütung eintragen.',
    'Jährliche Ersparnis und Amortisationszeit ablesen.',
  ],
  faq: [
    { q: 'Wann lohnt sich ein Speicher?', a: 'Je größer der Abstand zwischen Strompreis und Einspeisevergütung und je mehr Zyklen der Speicher fährt, desto schneller amortisiert er sich. Liegt die Amortisationszeit deutlich über der Garantielaufzeit (oft 10 Jahre), ist die Rentabilität fraglich.' },
    { q: 'Was sind Vollzyklen?', a: 'Ein Vollzyklus entspricht einer kompletten Ladung und Entladung der nutzbaren Kapazität. Hausspeicher erreichen je nach PV-Anlage und Verbrauch typisch 200-300 Vollzyklen pro Jahr.' },
    { q: 'Warum zählt die Einspeisevergütung als Kosten?', a: 'Jede gespeicherte Kilowattstunde wird nicht eingespeist, daher entgeht dir die Vergütung. Der echte Vorteil ist die Differenz zwischen gespartem Netzbezug und entgangener Einspeisung.' },
    { q: 'Sind Förderungen berücksichtigt?', a: 'Nein. Mögliche Förderungen oder regionale Zuschüsse senken die Anschaffungskosten und verbessern die Rentabilität - trage sie gegebenenfalls bereits abgezogen ein. Stand 2026, ohne Gewähr.' },
  ],
  related: ['pv-autarkiegrad-rechner', 'pv-eigenverbrauch-ersparnis-rechner', 'pv-einspeiseverguetung-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { kosten: 8000, kapazitaet: 8, zyklen: 250, wirkungsgrad: 90, strompreis: 35, verguetung: 8 },
      expect: [
        { label: 'Eigenverbrauchte Energie pro Jahr', value: 1800, tolerance: 0 },
        { label: 'Jährliche Ersparnis', value: 486, tolerance: 0.01 },
        { label: 'Amortisationszeit', value: 16.46, tolerance: 0.05 },
      ],
    },
  ],
};
