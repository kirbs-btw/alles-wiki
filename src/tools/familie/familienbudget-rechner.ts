import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'familienbudget-rechner',
  category: 'familie',
  title: 'Familienbudget-Rechner',
  shortTitle: 'Familienbudget',
  description:
    'Stelle das monatliche Familienbudget auf: Einnahmen minus Fixkosten und Lebenshaltung. Zeigt Überschuss, Sparquote und Jahresüberschuss.',
  keywords: [
    'familienbudget rechner',
    'haushaltsbudget familie',
    'monatsbudget familie',
    'einnahmen ausgaben familie',
    'sparquote berechnen',
    'haushaltsplan familie',
    'budget rechner',
  ],
  intro:
    'Ein klarer Überblick über Einnahmen und Ausgaben hilft jeder Familie beim Planen. Dieser Rechner stellt die monatlichen Einnahmen den Fixkosten und der Lebenshaltung gegenüber und ermittelt Überschuss bzw. Defizit sowie die Sparquote. So sehen Sie sofort, wie viel am Monatsende übrig bleibt.',
  formula:
    'Überschuss = Einnahmen − Fixkosten − Lebenshaltung; Sparquote = Überschuss / Einnahmen',
  inputs: [
    { type: 'number', id: 'einkommen1', label: 'Nettoeinkommen 1', unit: '€/Monat', default: 2500, min: 0, step: 50 },
    { type: 'number', id: 'einkommen2', label: 'Nettoeinkommen 2', unit: '€/Monat', default: 1500, min: 0, step: 50 },
    { type: 'number', id: 'kindergeld', label: 'Kindergeld & Zuschüsse', unit: '€/Monat', default: 255, min: 0, step: 5 },
    { type: 'number', id: 'wohnen', label: 'Miete/Wohnen inkl. Nebenkosten', unit: '€/Monat', default: 1200, min: 0, step: 50 },
    { type: 'number', id: 'fixkosten', label: 'Weitere Fixkosten (Versich., Abos)', unit: '€/Monat', default: 500, min: 0, step: 25 },
    { type: 'number', id: 'lebenshaltung', label: 'Lebenshaltung (Essen, Mobilität)', unit: '€/Monat', default: 1300, min: 0, step: 25 },
  ],
  compute: (v) => {
    const einkommen1 = Math.max(0, num(v.einkommen1));
    const einkommen2 = Math.max(0, num(v.einkommen2));
    const kindergeld = Math.max(0, num(v.kindergeld));
    const wohnen = Math.max(0, num(v.wohnen));
    const fixkosten = Math.max(0, num(v.fixkosten));
    const lebenshaltung = Math.max(0, num(v.lebenshaltung));
    const einnahmen = einkommen1 + einkommen2 + kindergeld;
    const ausgaben = wohnen + fixkosten + lebenshaltung;
    const ueberschuss = einnahmen - ausgaben;
    const sparquote = einnahmen > 0 ? (ueberschuss / einnahmen) * 100 : 0;
    const ueberschussJahr = ueberschuss * 12;
    return [
      { label: 'Monatlicher Überschuss', value: ueberschuss, unit: '€', digits: 2, primary: true, help: 'negativ = Defizit' },
      { label: 'Einnahmen gesamt', value: einnahmen, unit: '€', digits: 2 },
      { label: 'Ausgaben gesamt', value: ausgaben, unit: '€', digits: 2 },
      { label: 'Sparquote', value: sparquote, unit: '%', digits: 1 },
      { label: 'Überschuss pro Jahr', value: ueberschussJahr, unit: '€', digits: 0 },
    ];
  },
  howto: [
    'Alle Nettoeinkommen sowie Kindergeld und Zuschüsse eintragen.',
    'Wohnkosten inklusive Nebenkosten erfassen.',
    'Weitere Fixkosten (Versicherungen, Abos, Kredite) und Lebenshaltung eingeben.',
    'Überschuss und Sparquote ablesen – ein negativer Wert bedeutet ein Defizit.',
  ],
  faq: [
    { q: 'Was ist eine gute Sparquote?', a: 'Als Faustregel gelten 10 bis 20 % des Nettoeinkommens als solide. Familien mit kleinen Kindern oder hoher Miete erreichen oft weniger – wichtig ist vor allem ein positiver Überschuss.' },
    { q: 'Was zählt zu den Fixkosten?', a: 'Regelmäßige, kaum veränderbare Ausgaben wie Miete, Versicherungen, Strom, Internet, Kredite und Abos. Sie fallen unabhängig vom Verbrauch an.' },
    { q: 'Wie senke ich ein Defizit?', a: 'Prüfen Sie zuerst die größten Posten: Wohnkosten, Versicherungen und Abos. Oft lassen sich Verträge wechseln oder kündigen. Auch ein Haushaltsbuch deckt unnötige Ausgaben auf.' },
    { q: 'Sollte ich einen Notgroschen einplanen?', a: 'Ja. Empfohlen werden drei bis sechs Nettomonatseinkommen als Reserve für unerwartete Ausgaben. Ein Teil des monatlichen Überschusses sollte dorthin fließen.' },
    { q: 'Sind unregelmäßige Ausgaben enthalten?', a: 'Jährliche Kosten wie Urlaub, Weihnachten oder Autoreparaturen sollten Sie auf Monate umlegen und in die Lebenshaltung oder Fixkosten einrechnen.' },
  ],
  related: ['kosten-kind-rechner', 'sparplan-kind-rechner', 'haushaltsbuch-rechner'],
  examples: [
    {
      values: { einkommen1: 2500, einkommen2: 1500, kindergeld: 255, wohnen: 1200, fixkosten: 500, lebenshaltung: 1300 },
      expect: [
        { label: 'Einnahmen gesamt', value: 4255, tolerance: 0.01 },
        { label: 'Monatlicher Überschuss', value: 1255, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
