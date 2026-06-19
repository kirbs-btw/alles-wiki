import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'raid-kapazitaet-rechner',
  category: 'technik',
  title: 'RAID-Nutzkapazität-Rechner',
  shortTitle: 'RAID-Kapazität',
  description:
    'Berechne die nutzbare Speicherkapazität und den Verlust durch Redundanz für RAID 0, 1, 5, 6 und 10 aus Anzahl und Größe der Festplatten.',
  keywords: [
    'raid kapazität berechnen',
    'raid nutzkapazität rechner',
    'raid 5 speicher rechner',
    'raid 6 kapazität',
    'nutzbarer speicher raid',
    'raid 10 kapazität',
  ],
  formula: 'RAID0: n×G · RAID1: G · RAID5: (n−1)×G · RAID6: (n−2)×G · RAID10: n/2×G',
  inputs: [
    { type: 'number', id: 'anzahl', label: 'Anzahl Festplatten', default: 4, min: 1, max: 64, step: 1 },
    { type: 'number', id: 'groesse', label: 'Größe je Festplatte', unit: 'TB', default: 4, min: 0.1, step: 0.5, help: 'Alle Platten werden gleich groß angenommen.' },
    {
      type: 'select',
      id: 'level',
      label: 'RAID-Level',
      default: 'raid5',
      options: [
        { value: 'raid0', label: 'RAID 0 (Striping, keine Redundanz)' },
        { value: 'raid1', label: 'RAID 1 (Spiegelung)' },
        { value: 'raid5', label: 'RAID 5 (1 Platte Parität)' },
        { value: 'raid6', label: 'RAID 6 (2 Platten Parität)' },
        { value: 'raid10', label: 'RAID 10 (Spiegel + Stripe)' },
      ],
    },
  ],
  compute: (v) => {
    const n = Math.max(0, Math.floor(num(v.anzahl)));
    const g = num(v.groesse);
    const level = String(v.level);
    const brutto = n * g;
    let nutz = 0;
    let toleranz = 0; // wie viele Platten dürfen ausfallen
    switch (level) {
      case 'raid0':
        nutz = n * g;
        toleranz = 0;
        break;
      case 'raid1':
        nutz = n >= 1 ? g : 0; // Spiegel: Kapazität einer Platte
        toleranz = Math.max(0, n - 1);
        break;
      case 'raid5':
        nutz = n >= 2 ? (n - 1) * g : 0;
        toleranz = n >= 2 ? 1 : 0;
        break;
      case 'raid6':
        nutz = n >= 3 ? (n - 2) * g : 0;
        toleranz = n >= 3 ? 2 : 0;
        break;
      case 'raid10':
        nutz = n >= 2 ? Math.floor(n / 2) * g : 0; // Paare; ungerade Platte ungenutzt
        toleranz = n >= 2 ? Math.floor(n / 2) : 0; // min. 1 je Paar (best case)
        break;
      default:
        nutz = 0;
    }
    const verlust = brutto - nutz;
    const effizienz = brutto > 0 ? (nutz / brutto) * 100 : 0;
    return [
      { label: 'Nutzkapazität', value: nutz, unit: 'TB', digits: 2, primary: true },
      { label: 'Bruttokapazität', value: brutto, unit: 'TB', digits: 2 },
      { label: 'Verlust durch Redundanz', value: verlust, unit: 'TB', digits: 2 },
      { label: 'Speichereffizienz', value: effizienz, unit: '%', digits: 0 },
      { label: 'Platten-Ausfalltoleranz', value: toleranz, unit: 'Platten', digits: 0, help: 'Wie viele Platten ohne Datenverlust ausfallen dürfen (bei RAID 10 günstigster Fall).' },
    ];
  },
  intro:
    'Ein RAID bündelt mehrere Festplatten – je nach Level für mehr Tempo, mehr Sicherheit oder beides, immer auf Kosten der nutzbaren Kapazität. RAID 0 nutzt den vollen Speicher, bietet aber keine Sicherheit. RAID 5 opfert eine Platte für Parität, RAID 6 zwei, RAID 1 und 10 spiegeln. Dieser Rechner zeigt aus Plattenzahl und -größe die Nutzkapazität, den Redundanzverlust und wie viele Platten ausfallen dürfen. Hinweis: Hersteller-TB werden dezimal gerechnet, das Betriebssystem zeigt binäre Werte etwas niedriger an.',
  howto: [
    'Anzahl der Festplatten im Verbund eingeben.',
    'Größe je Platte in TB eintragen (gleich große Platten angenommen).',
    'RAID-Level wählen.',
    'Nutzkapazität, Redundanzverlust und Ausfalltoleranz ablesen.',
  ],
  faq: [
    { q: 'Wie viel Speicher bleibt bei RAID 5?', a: 'Die Kapazität einer Platte geht für Parität verloren: Bei 4 Platten à 4 TB sind das 16 TB brutto, aber nur 12 TB nutzbar. Eine Platte darf ausfallen, ohne dass Daten verloren gehen.' },
    { q: 'Was ist der Unterschied zwischen RAID 5 und RAID 6?', a: 'RAID 6 verwendet zwei statt einer Paritätsplatte und verträgt daher den gleichzeitigen Ausfall von zwei Platten – sicherer, aber mit etwas geringerer Nutzkapazität.' },
    { q: 'Ersetzt ein RAID ein Backup?', a: 'Nein. RAID schützt vor Plattenausfall, nicht vor versehentlichem Löschen, Ransomware oder Diebstahl. Ein separates Backup bleibt unverzichtbar.' },
    { q: 'Warum zeigt mein NAS weniger als berechnet?', a: 'Hersteller rechnen TB dezimal (1000), Betriebssysteme oft binär (1024). Zusätzlich belegen Dateisystem und Reserve Platz. Die echte freie Kapazität liegt daher etwas unter dem Brutto-Nutzwert.' },
  ],
  related: ['backup-dauer-rechner', 'datenmengen-umrechner', 'speicherbedarf-videos'],
  updated: '2026-06-19',
  examples: [
    {
      values: { anzahl: 4, groesse: 4, level: 'raid5' },
      // brutto 16; nutz (4-1)×4 = 12; Verlust 4; Effizienz 75 %
      expect: [
        { label: 'Nutzkapazität', value: 12, tolerance: 0.01 },
        { label: 'Speichereffizienz', value: 75, tolerance: 0.5 },
      ],
    },
    {
      values: { anzahl: 4, groesse: 4, level: 'raid10' },
      // nutz floor(4/2)×4 = 8; brutto 16; Effizienz 50 %
      expect: [
        { label: 'Nutzkapazität', value: 8, tolerance: 0.01 },
        { label: 'Speichereffizienz', value: 50, tolerance: 0.5 },
      ],
    },
  ],
};
