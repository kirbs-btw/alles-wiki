import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'verjaehrungsfrist-rechner',
  category: 'recht',
  title: 'Verjährungsfrist-Rechner (regelmäßige Verjährung)',
  shortTitle: 'Verjährung',
  description:
    'Berechne, wann ein Anspruch verjährt: Die regelmäßige Verjährung beträgt 3 Jahre und beginnt zum Jahresende der Entstehung (§§ 195, 199 BGB).',
  keywords: [
    'verjährungsfrist rechner',
    'verjährung berechnen',
    'regelmäßige verjährung 3 jahre',
    'wann verjährt forderung',
    'verjährung jahresende',
    'verjährungsfrist 195 bgb',
  ],
  formula: 'Ende der Verjährung = 31.12. (Jahr der Entstehung + Verjährungsfrist in Jahren)',
  inputs: [
    { type: 'number', id: 'jahrEntstehung', label: 'Jahr der Anspruchsentstehung', unit: '', default: 2025, min: 1900, max: 2100, step: 1, help: 'Jahr, in dem der Anspruch entstand und du Kenntnis erlangtest.' },
    {
      type: 'select', id: 'frist', label: 'Verjährungsfrist', default: '3',
      options: [
        { value: '3', label: '3 Jahre (regelmäßige Verjährung, § 195 BGB)' },
        { value: '5', label: '5 Jahre (z. B. Mängel bei Bauwerken)' },
        { value: '10', label: '10 Jahre (z. B. Rechte an Grundstücken)' },
        { value: '30', label: '30 Jahre (z. B. rechtskräftig festgestellte Ansprüche)' },
      ],
    },
    { type: 'number', id: 'aktuellesJahr', label: 'Vergleichsjahr', unit: '', default: 2026, min: 1900, max: 2100, step: 1, help: 'Jahr, für das geprüft wird, ob der Anspruch noch durchsetzbar ist.' },
  ],
  compute: (v) => {
    const jahrEntstehung = Math.round(num(v.jahrEntstehung));
    const frist = Math.round(num(v.frist, 3));
    const aktuellesJahr = Math.round(num(v.aktuellesJahr));
    const istRegel = frist === 3;
    // Regelmäßige Verjährung beginnt zum Schluss des Entstehungsjahres -> Ende nach 'frist' Jahren am 31.12.
    // Sonderfristen beginnen häufig taggenau; vereinfacht hier ebenfalls zum Jahresende.
    const verjaehrungsjahr = jahrEntstehung + frist;
    const restjahre = verjaehrungsjahr - aktuellesJahr;
    const verjaehrt = aktuellesJahr > verjaehrungsjahr ? 1 : 0;
    return [
      { label: 'Jahr des Verjährungseintritts', value: verjaehrungsjahr, digits: 0, primary: true, help: istRegel ? 'am 31.12. dieses Jahres' : 'orientierend am Jahresende' },
      { label: 'Verbleibende Jahre', value: restjahre, unit: 'Jahre', digits: 0 },
      { label: 'Bereits verjährt (1=ja, 0=nein)', value: verjaehrt, digits: 0 },
    ];
  },
  intro:
    'Die meisten Alltagsforderungen unterliegen der regelmäßigen Verjährung von drei Jahren. Sie beginnt mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Gläubiger davon Kenntnis erlangt hat (§ 199 BGB). Eine Forderung aus dem Jahr 2025 verjährt damit zum Ablauf des 31.12.2028. Dieser Rechner liefert das Jahr des Verjährungseintritts als Orientierung; Hemmung und Neubeginn (etwa durch Mahnbescheid) sind nicht berücksichtigt.',
  howto: [
    'Jahr der Anspruchsentstehung eingeben.',
    'Verjährungsfrist wählen (Regelfall: 3 Jahre).',
    'Vergleichsjahr angeben.',
    'Jahr des Verjährungseintritts und verbleibende Jahre ablesen.',
  ],
  faq: [
    { q: 'Wann beginnt die regelmäßige Verjährung?', a: 'Sie beginnt nicht sofort, sondern erst mit dem Schluss des Jahres, in dem der Anspruch entstanden ist und der Gläubiger von den Umständen Kenntnis hat oder grob fahrlässig nicht hat (§ 199 BGB).' },
    { q: 'Wie lange ist die regelmäßige Frist?', a: 'Die regelmäßige Verjährungsfrist beträgt drei Jahre (§ 195 BGB). Für besondere Ansprüche gelten längere Fristen von fünf, zehn oder dreißig Jahren.' },
    { q: 'Was passiert bei Verjährung?', a: 'Der Anspruch erlischt nicht, aber der Schuldner kann die Leistung dauerhaft verweigern (Einrede der Verjährung). Eine verjährte Forderung lässt sich gerichtlich nicht mehr durchsetzen.' },
    { q: 'Kann die Verjährung gestoppt werden?', a: 'Ja. Verhandlungen, Klage oder ein Mahnbescheid hemmen die Verjährung; ein Anerkenntnis oder eine Zwangsvollstreckung lassen sie neu beginnen. Diese Effekte bildet der Rechner nicht ab.' },
  ],
  related: ['verzugszinsen-rechner', 'mahnverfahren-kosten-rechner', 'mahngebuehren-rechner'],
  examples: [
    {
      values: { jahrEntstehung: 2025, frist: '3', aktuellesJahr: 2026 },
      expect: [
        { label: 'Jahr des Verjährungseintritts', value: 2028, tolerance: 0.01 },
        { label: 'Verbleibende Jahre', value: 2, tolerance: 0.01 },
        { label: 'Bereits verjährt (1=ja, 0=nein)', value: 0, tolerance: 0.01 },
      ],
    },
    {
      values: { jahrEntstehung: 2020, frist: '3', aktuellesJahr: 2026 },
      expect: [
        { label: 'Jahr des Verjährungseintritts', value: 2023, tolerance: 0.01 },
        { label: 'Bereits verjährt (1=ja, 0=nein)', value: 1, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
