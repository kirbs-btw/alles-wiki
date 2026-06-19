import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Typischer Verbrauch in GB pro Stunde je Aktivität (Näherung, Stand 2026).
const GB_PRO_STUNDE: Record<string, number> = {
  musik: 0.072, // Musik-Streaming ~160 kbit/s
  sd: 0.7, // Video SD
  hd: 3, // Video HD (1080p)
  uhd: 7, // Video 4K/UHD
  videocall: 1.35, // HD-Videokonferenz
  social: 0.5, // Social Media / Scrollen mit Videos
};

export const tool: Tool = {
  slug: 'datenvolumen-monat-rechner',
  category: 'technik',
  title: 'Datenvolumen pro Monat berechnen',
  shortTitle: 'Datenvolumen/Monat',
  description:
    'Schätze deinen monatlichen Datenverbrauch in GB aus deinen Aktivitäten – Streaming, Videocalls, Social Media – und prüfe, ob dein Datentarif reicht.',
  keywords: [
    'datenvolumen berechnen',
    'wie viel gb pro monat',
    'datenverbrauch rechner',
    'mobiles datenvolumen reicht',
    'gb verbrauch streaming',
    'datentarif ausreichend',
  ],
  formula: 'Monatsvolumen = Σ (Stunden/Tag × GB/Stunde) × 30 + sonstiges',
  inputs: [
    { type: 'number', id: 'tarif', label: 'Dein Datenvolumen pro Monat', unit: 'GB', default: 20, min: 0, step: 1, help: 'Zum Vergleich. 0 = Vergleich ausblenden.' },
    { type: 'number', id: 'hdStd', label: 'HD-Video pro Tag', unit: 'h', default: 1, min: 0, step: 0.5, help: 'z. B. Streaming in 1080p, ca. 3 GB/h' },
    { type: 'number', id: 'uhdStd', label: '4K-Video pro Tag', unit: 'h', default: 0, min: 0, step: 0.5, help: 'ca. 7 GB/h' },
    { type: 'number', id: 'musikStd', label: 'Musik-Streaming pro Tag', unit: 'h', default: 1, min: 0, step: 0.5, help: 'ca. 0,07 GB/h' },
    { type: 'number', id: 'callStd', label: 'Videocalls pro Tag', unit: 'h', default: 0, min: 0, step: 0.5, help: 'ca. 1,35 GB/h' },
    { type: 'number', id: 'socialStd', label: 'Social Media / Surfen pro Tag', unit: 'h', default: 1, min: 0, step: 0.5, help: 'ca. 0,5 GB/h' },
    { type: 'number', id: 'sonstiges', label: 'Sonstiges pro Monat', unit: 'GB', default: 2, min: 0, step: 1, help: 'Updates, Downloads, Backups.' },
  ],
  compute: (v) => {
    const proTag =
      num(v.hdStd) * GB_PRO_STUNDE.hd +
      num(v.uhdStd) * GB_PRO_STUNDE.uhd +
      num(v.musikStd) * GB_PRO_STUNDE.musik +
      num(v.callStd) * GB_PRO_STUNDE.videocall +
      num(v.socialStd) * GB_PRO_STUNDE.social;
    const proMonat = proTag * 30 + num(v.sonstiges);
    const tarif = num(v.tarif);
    const reserve = tarif - proMonat;
    const bewertung =
      tarif <= 0
        ? 'Kein Vergleich (Tarif = 0)'
        : reserve >= 0
          ? 'Datenvolumen reicht aus'
          : 'Datenvolumen zu klein';
    return [
      { label: 'Verbrauch pro Monat', value: proMonat, unit: 'GB', digits: 1, primary: true },
      { label: 'Verbrauch pro Tag', value: proTag, unit: 'GB', digits: 2 },
      { label: 'Bewertung', value: bewertung },
      { label: 'Reserve zum Tarif', value: reserve, unit: 'GB', digits: 1, help: 'Negativ = Tarif wird überschritten.' },
    ];
  },
  intro:
    'Der mobile Datenverbrauch entscheidet sich an wenigen Aktivitäten: Video-Streaming dominiert klar, Musik und Surfen fallen kaum ins Gewicht. HD-Video zieht rund 3 GB pro Stunde, 4K sogar etwa 7 GB, während eine Stunde Musik nur etwa 0,07 GB kostet. Dieser Rechner hochrechnet deine täglichen Gewohnheiten auf 30 Tage und vergleicht das Ergebnis mit deinem Tarif. Die GB-Werte sind Näherungen (Stand 2026) und hängen von Qualitätsstufe und Codec ab.',
  howto: [
    'Optional dein Datenvolumen laut Tarif in GB eintragen.',
    'Für jede Aktivität die typischen Stunden pro Tag angeben.',
    'Sonstigen Verbrauch (Updates, Downloads) pro Monat ergänzen.',
    'Monatsverbrauch ablesen und mit dem Tarif vergleichen.',
  ],
  faq: [
    { q: 'Wie viel Datenvolumen verbraucht eine Stunde Streaming?', a: 'In SD rund 0,7 GB, in HD (1080p) etwa 3 GB und in 4K bis zu 7 GB pro Stunde. Video ist mit Abstand der größte Verbraucher.' },
    { q: 'Frisst Musik-Streaming viel Datenvolumen?', a: 'Nein. Eine Stunde Musik bei normaler Qualität verbraucht nur etwa 0,07 GB. Selbst tägliches Hören kostet im Monat meist unter 3 GB.' },
    { q: 'Wie kann ich Datenvolumen sparen?', a: 'Streaming-Qualität reduzieren (SD statt HD), Videos und Updates per WLAN herunterladen und Autoplay deaktivieren. Schon das Umstellen von 4K auf HD halbiert mehr als den Verbrauch.' },
    { q: 'Sind die Werte genau?', a: 'Es sind Durchschnittswerte (Stand 2026). Anbieter, Codec und gewählte Qualität verändern den realen Verbrauch deutlich – der Rechner gibt eine gute Orientierung.' },
  ],
  related: ['bandbreite-durchsatz', 'internetgeschwindigkeit-ausreichend-rechner', 'datenmengen-umrechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { tarif: 20, hdStd: 1, uhdStd: 0, musikStd: 1, callStd: 0, socialStd: 1, sonstiges: 2 },
      // proTag = 1×3 + 1×0,072 + 1×0,5 = 3,572 GB; ×30 = 107,16; +2 = 109,16
      expect: [
        { label: 'Verbrauch pro Monat', value: 109.16, tolerance: 0.1 },
        { label: 'Reserve zum Tarif', value: -89.16, tolerance: 0.1 },
      ],
    },
    {
      values: { tarif: 0, hdStd: 0, uhdStd: 0, musikStd: 2, callStd: 0, socialStd: 0, sonstiges: 0 },
      // proTag = 2 × 0,072 = 0,144; ×30 = 4,32 GB
      expect: [{ label: 'Verbrauch pro Monat', value: 4.32, tolerance: 0.01 }],
    },
  ],
};
