import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'kuendigungsfrist-rechner',
  category: 'recht',
  title: 'Kündigungsfrist-Rechner (Arbeitgeber, § 622 BGB)',
  shortTitle: 'Kündigungsfrist',
  description:
    'Ermittle die gesetzliche Kündigungsfrist des Arbeitgebers nach § 622 BGB aus der Beschäftigungsdauer – gestaffelt nach Jahren der Betriebszugehörigkeit.',
  keywords: [
    'kündigungsfrist rechner',
    'gesetzliche kündigungsfrist',
    'kündigungsfrist arbeitgeber',
    '622 bgb kündigungsfrist',
    'kündigungsfrist nach jahren',
    'wie lange kündigungsfrist',
    'betriebszugehörigkeit kündigung',
  ],
  formula: 'Frist nach § 622 BGB: Stufen von 4 Wochen bis 7 Monaten je nach Betriebszugehörigkeit',
  inputs: [
    { type: 'number', id: 'jahre', label: 'Betriebszugehörigkeit', unit: 'Jahre', default: 6, min: 0, step: 1, help: 'Vollendete Jahre im Betrieb.' },
    {
      type: 'select', id: 'phase', label: 'Beschäftigungsphase', default: 'normal',
      options: [
        { value: 'probe', label: 'In der Probezeit (max. 6 Monate)' },
        { value: 'normal', label: 'Nach der Probezeit' },
      ],
    },
  ],
  compute: (v) => {
    const jahre = num(v.jahre);
    const istProbe = String(v.phase) === 'probe';
    let wochen: number;
    let zumLabel: string;
    if (istProbe) {
      wochen = 2;
      zumLabel = 'jederzeit (kein fester Termin)';
    } else if (jahre >= 20) { wochen = 7 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 15) { wochen = 6 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 12) { wochen = 5 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 10) { wochen = 4 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 8) { wochen = 3 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 5) { wochen = 2 * 4; zumLabel = 'zum Monatsende'; }
    else if (jahre >= 2) { wochen = 1 * 4; zumLabel = 'zum Monatsende'; }
    else { wochen = 4; zumLabel = 'zum 15. oder Monatsende'; }
    const monateCa = wochen / 4.345;
    return [
      { label: 'Kündigungsfrist', value: wochen, unit: 'Wochen', digits: 0, primary: true },
      { label: 'Kündigung möglich', value: zumLabel },
      { label: 'Entspricht ungefähr', value: monateCa, unit: 'Monate', digits: 1 },
    ];
  },
  intro:
    'Die gesetzliche Kündigungsfrist des Arbeitgebers verlängert sich mit zunehmender Betriebszugehörigkeit (§ 622 BGB). Sie reicht von vier Wochen für Neueingestellte bis zu sieben Monaten ab 20 Jahren. In der Probezeit gilt eine verkürzte Frist von zwei Wochen. Ein Arbeits- oder Tarifvertrag kann längere Fristen vorsehen – maßgeblich ist dann die günstigere Regelung.',
  howto: [
    'Vollendete Jahre der Betriebszugehörigkeit eingeben.',
    'Wählen, ob die Probezeit noch läuft.',
    'Frist und möglichen Kündigungstermin ablesen.',
    'Arbeits- oder Tarifvertrag auf längere Fristen prüfen.',
  ],
  faq: [
    { q: 'Wie lang ist die gesetzliche Grundkündigungsfrist?', a: 'In den ersten beiden Jahren beträgt sie vier Wochen zum 15. oder zum Ende eines Kalendermonats. Danach steigt sie stufenweise an.' },
    { q: 'Wie verlängert sich die Frist?', a: 'Nach § 622 BGB: 1 Monat ab 2 Jahren, 2 Monate ab 5, 3 ab 8, 4 ab 10, 5 ab 12, 6 ab 15 und 7 Monate ab 20 Jahren – jeweils zum Monatsende.' },
    { q: 'Gilt das auch für die Kündigung durch den Arbeitnehmer?', a: 'Die verlängerten Stufen gelten gesetzlich nur für die Arbeitgeberkündigung. Für Arbeitnehmer bleibt es bei vier Wochen, sofern der Vertrag nichts anderes regelt.' },
    { q: 'Was gilt in der Probezeit?', a: 'Während einer vereinbarten Probezeit von bis zu sechs Monaten kann mit einer Frist von zwei Wochen gekündigt werden, ohne festen Termin.' },
    { q: 'Können Verträge abweichen?', a: 'Ja. Arbeits- und Tarifverträge dürfen längere Fristen festlegen. Kürzere Fristen sind nur in engen Ausnahmen zulässig. Im Zweifel gilt die für den Arbeitnehmer günstigere Regelung.' },
  ],
  related: ['abfindung-rechner', 'verzugszinsen-rechner', 'anwaltskosten-rechner'],
  examples: [
    {
      values: { jahre: 6, phase: 'normal' },
      expect: [
        { label: 'Kündigungsfrist', value: 8, tolerance: 0.01 },
      ],
    },
    {
      values: { jahre: 20, phase: 'normal' },
      expect: [
        { label: 'Kündigungsfrist', value: 28, tolerance: 0.01 },
      ],
    },
  ],
  updated: '2026-06-18',
};
