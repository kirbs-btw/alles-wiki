import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'bafoeg-hoechstsatz-rechner',
  category: 'bildung',
  title: 'BAfoeG-Bedarf zusammenstellen (Orientierung)',
  shortTitle: 'BAfoeG-Bedarf',
  description:
    'Stelle deinen monatlichen BAfoeG-Bedarf aus Grundbedarf und Zuschlaegen zusammen und ziehe anrechenbares Einkommen ab – als grobe Orientierung.',
  keywords: [
    'bafoeg hoechstsatz',
    'bafoeg bedarf berechnen',
    'bafoeg satz rechner',
    'bafoeg foerderung hoehe',
    'bafoeg wohnzuschlag',
    'bafoeg anrechnung einkommen',
  ],
  intro:
    'Achtung: grobe Orientierung, kein Bescheid. Der BAfoeG-Bedarf setzt sich aus einem Grundbedarf plus Zuschlaegen fuer Wohnen und Kranken-/Pflegeversicherung zusammen. Vom Bedarf wird anrechenbares Einkommen abgezogen. Die genauen Saetze und Freibetraege legt das Amt fest und aendern sich regelmaeszig. Trage die in deinem Fall geltenden Werte ein – das Tool summiert und verrechnet sie nur.',
  formula: 'Foerderung = (Grundbedarf + Wohnzuschlag + KV/PV-Zuschlag) − anrechenbares Einkommen',
  inputs: [
    { type: 'number', id: 'grundbedarf', label: 'Grundbedarf je Monat', unit: 'EUR', default: 475, min: 0, step: 5, help: 'Regelsatz laut aktuellem Bescheid/Tabelle.' },
    { type: 'number', id: 'wohnen', label: 'Wohnzuschlag je Monat', unit: 'EUR', default: 380, min: 0, step: 5, help: 'Zuschlag bei eigener Wohnung.' },
    { type: 'number', id: 'kvpv', label: 'KV-/PV-Zuschlag je Monat', unit: 'EUR', default: 0, min: 0, step: 5, help: 'Zuschlag zur Kranken- und Pflegeversicherung, falls zutreffend.' },
    { type: 'number', id: 'einkommen', label: 'Anrechenbares Einkommen je Monat', unit: 'EUR', default: 0, min: 0, step: 10, help: 'Bereits um Freibetraege bereinigtes Einkommen.' },
  ],
  compute: (v) => {
    const grund = num(v.grundbedarf);
    const wohnen = num(v.wohnen);
    const kvpv = num(v.kvpv);
    const einkommen = num(v.einkommen);
    const bedarf = grund + wohnen + kvpv;
    const foerderung = Math.max(0, bedarf - einkommen);
    return [
      { label: 'Monatliche Foerderung', value: foerderung, unit: 'EUR', digits: 2, primary: true },
      { label: 'Gesamtbedarf', value: bedarf, unit: 'EUR', digits: 2 },
      { label: 'Foerderung je Jahr', value: foerderung * 12, unit: 'EUR', digits: 2 },
    ];
  },
  howto: [
    'Grundbedarf laut aktuellem BAfoeG-Satz eintragen.',
    'Wohnzuschlag ergaenzen, wenn du nicht bei den Eltern wohnst.',
    'KV-/PV-Zuschlag eintragen, falls er dir zusteht.',
    'Anrechenbares Einkommen abziehen und Foerderbetrag ablesen.',
  ],
  faq: [
    { q: 'Ist dieses Ergebnis verbindlich?', a: 'Nein. Es ist eine grobe Orientierung. Hoehe, Saetze und Freibetraege legt das BAfoeG-Amt im Bescheid fest und sie aendern sich regelmaeszig. Stelle immer einen offiziellen Antrag.' },
    { q: 'Welche Werte soll ich eintragen?', a: 'Die in deinem Fall geltenden Saetze aus der aktuellen BAfoeG-Tabelle bzw. deinem Bescheid. Das Tool addiert nur die Bausteine und zieht dein bereinigtes Einkommen ab.' },
    { q: 'Wie wird BAfoeG zurueckgezahlt?', a: 'Die staatliche Foerderung ist je zur Haelfte Zuschuss und zinsloses Darlehen, dessen Rueckzahlung gedeckelt ist. Eine Schaetzung der Rate liefert der BAfoeG-Rueckzahlungs-Rechner.' },
  ],
  related: ['bafoeg-rueckzahlung-rechner', 'studienkosten-rechner', 'semesterticket-ersparnis-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { grundbedarf: 475, wohnen: 380, kvpv: 0, einkommen: 0 },
      expect: [
        { label: 'Gesamtbedarf', value: 855, tolerance: 0.01 },
        { label: 'Monatliche Foerderung', value: 855, tolerance: 0.01 },
      ],
    },
    {
      values: { grundbedarf: 475, wohnen: 380, kvpv: 0, einkommen: 200 },
      expect: [{ label: 'Monatliche Foerderung', value: 655, tolerance: 0.01 }],
    },
  ],
};
