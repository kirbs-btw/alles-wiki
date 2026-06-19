import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fuenftelregelung-abfindung-rechner',
  category: 'beruf',
  title: 'Fünftelregelung-Rechner für Abfindungen (Näherung)',
  shortTitle: 'Fünftelregelung',
  description:
    'Schätze die Steuer auf eine Abfindung mit der Fünftelregelung: Vergleich von Steuer mit und ohne Fünftelung anhand deiner Einkommensteuer-Beträge (Näherung).',
  keywords: [
    'fünftelregelung rechner',
    'abfindung steuer rechner',
    'fünftelregelung abfindung',
    'abfindung versteuern',
    'steuer auf abfindung berechnen',
    'fünftelregelung beispiel',
  ],
  formula:
    'Steuer Abfindung = 5 × (ESt(zvE + Abfindung/5) − ESt(zvE)) ; Vorteil = Steuer ohne Fünftelung − Steuer mit Fünftelung',
  inputs: [
    { type: 'number', id: 'abfindung', label: 'Abfindung (brutto)', unit: '€', default: 40000, min: 0, step: 1000, help: 'Die einmalige Entschädigungszahlung.' },
    { type: 'number', id: 'estGrund', label: 'Einkommensteuer auf zvE (ohne Abfindung)', unit: '€', default: 8000, min: 0, step: 100, help: 'Tarifliche ESt auf dein zu versteuerndes Einkommen ohne Abfindung (z. B. aus Tarifrechner).' },
    { type: 'number', id: 'estFuenftel', label: 'Einkommensteuer auf zvE + ein Fünftel', unit: '€', default: 10000, min: 0, step: 100, help: 'Tarifliche ESt auf zvE + (Abfindung ÷ 5).' },
    { type: 'number', id: 'estVoll', label: 'Einkommensteuer auf zvE + ganze Abfindung', unit: '€', default: 20000, min: 0, step: 100, help: 'Zum Vergleich: tarifliche ESt, wenn die Abfindung voll oben drauf käme.' },
  ],
  compute: (v) => {
    const abfindung = num(v.abfindung);
    const estGrund = num(v.estGrund);
    const estFuenftel = num(v.estFuenftel);
    const estVoll = num(v.estVoll);

    const steuerMitFuenftel = 5 * (estFuenftel - estGrund);
    const steuerOhneFuenftel = estVoll - estGrund;
    const vorteil = steuerOhneFuenftel - steuerMitFuenftel;
    const netto = abfindung - steuerMitFuenftel;

    return [
      { label: 'Steuer auf Abfindung (Fünftelregelung)', value: steuerMitFuenftel, unit: '€', digits: 2, primary: true, help: 'Näherung ohne Soli/Kirchensteuer.' },
      { label: 'Steuer ohne Fünftelregelung', value: steuerOhneFuenftel, unit: '€', digits: 2 },
      { label: 'Steuervorteil durch Fünftelung', value: vorteil, unit: '€', digits: 2 },
      { label: 'Abfindung netto (Näherung)', value: netto, unit: '€', digits: 2, help: 'Abfindung minus geschätzter Steuer, ohne Soli/Kirchensteuer.' },
    ];
  },
  intro:
    'Abfindungen sind als außerordentliche Einkünfte voll steuerpflichtig, können aber über die Fünftelregelung (§ 34 EStG) ermäßigt besteuert werden: Rechnerisch wird nur ein Fünftel der Abfindung dem Einkommen zugeschlagen, die darauf entfallende Mehrsteuer mal fünf ergibt die Steuer auf die gesamte Abfindung. Da hierfür die individuellen Einkommensteuer-Beträge nötig sind, trägst du diese aus einem Einkommensteuer-Tarifrechner ein. Das Ergebnis ist eine Näherung ohne Solidaritätszuschlag und Kirchensteuer (Stand 2026).',
  howto: [
    'Trage die Bruttohöhe deiner Abfindung ein.',
    'Ermittle die tarifliche Einkommensteuer auf dein zu versteuerndes Einkommen ohne Abfindung.',
    'Ermittle die Steuer auf zvE + ein Fünftel und auf zvE + die ganze Abfindung.',
    'Lies die Steuer mit und ohne Fünftelung sowie deinen Vorteil ab.',
  ],
  faq: [
    { q: 'Wie funktioniert die Fünftelregelung?', a: 'Es wird die Mehrsteuer berechnet, die durch ein Fünftel der Abfindung entsteht. Diese Mehrsteuer wird mit fünf multipliziert und ergibt die Steuer auf die gesamte Abfindung. Bei progressivem Tarif ist das oft günstiger als die volle Versteuerung.' },
    { q: 'Wird die Fünftelregelung automatisch angewendet?', a: 'Die Anwendung im Lohnsteuerabzug durch den Arbeitgeber ist seit 2025 entfallen. Der Vorteil wird in der Regel über die Einkommensteuererklärung geltend gemacht. Dieser Rechner zeigt den möglichen Effekt als Orientierung.' },
    { q: 'Ist das Ergebnis verbindlich?', a: 'Nein. Es ist eine vereinfachte Näherung ohne Solidaritätszuschlag, Kirchensteuer und Besonderheiten wie Progressionsvorbehalt. Für eine verbindliche Berechnung sind das Finanzamt oder eine Steuerberatung zuständig.' },
    { q: 'Wann bringt die Fünftelregelung wenig?', a: 'Bei sehr hohem laufendem Einkommen, das ohnehin im Spitzensteuersatz liegt, fällt der Glättungseffekt klein aus. Den größten Vorteil bringt sie bei moderatem zvE und hoher Abfindung.' },
  ],
  related: ['jahresgehalt-rechner', 'gehaltserhoehung-rechner', 'netto-stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { abfindung: 40000, estGrund: 8000, estFuenftel: 10000, estVoll: 20000 },
      expect: [
        { label: 'Steuer auf Abfindung (Fünftelregelung)', value: 10000, tolerance: 0.01 },
        { label: 'Steuer ohne Fünftelregelung', value: 12000, tolerance: 0.01 },
        { label: 'Steuervorteil durch Fünftelung', value: 2000, tolerance: 0.01 },
        { label: 'Abfindung netto (Näherung)', value: 30000, tolerance: 0.01 },
      ],
    },
  ],
};
