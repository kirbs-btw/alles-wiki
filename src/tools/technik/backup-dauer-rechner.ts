import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Datenmenge in Megabyte je Einheit (dezimal, wie bei Speichermedien üblich).
const MENGE_MB: Record<string, number> = {
  gb: 1e3,
  tb: 1e6,
};

export const tool: Tool = {
  slug: 'backup-dauer-rechner',
  category: 'technik',
  title: 'Backup-Dauer-Rechner',
  shortTitle: 'Backup-Dauer',
  description:
    'Berechne, wie lange ein Backup oder eine Datenübertragung dauert – aus Datenmenge und Schreibgeschwindigkeit in MB/s, inklusive realistischem Overhead.',
  keywords: [
    'backup dauer berechnen',
    'kopierzeit rechner',
    'übertragungsdauer festplatte',
    'wie lange dauert backup',
    'datenmenge zeit mb/s',
    'kopiergeschwindigkeit dauer',
  ],
  formula: 'Dauer (s) = Datenmenge (MB) / (Schreibrate (MB/s) × Effizienz)',
  inputs: [
    { type: 'number', id: 'menge', label: 'Datenmenge', default: 1, min: 0, step: 0.1 },
    {
      type: 'select',
      id: 'mengeEinheit',
      label: 'Einheit Datenmenge',
      default: 'tb',
      options: [
        { value: 'gb', label: 'Gigabyte (GB)' },
        { value: 'tb', label: 'Terabyte (TB)' },
      ],
    },
    { type: 'number', id: 'rate', label: 'Schreibgeschwindigkeit', unit: 'MB/s', default: 120, min: 1, step: 1, help: 'USB-HDD ~120, SATA-SSD ~500, NVMe-SSD ~2000, Gigabit-LAN ~110.' },
    { type: 'number', id: 'effizienz', label: 'Effizienz / Auslastung', unit: '%', default: 80, min: 1, max: 100, step: 1, help: 'Viele kleine Dateien und Overhead bremsen; selten werden 100 % erreicht.' },
  ],
  compute: (v) => {
    const mengeMb = num(v.menge) * (MENGE_MB[String(v.mengeEinheit)] ?? 1e3);
    const eff = num(v.effizienz, 100) / 100;
    const rate = num(v.rate) * eff;
    const sekunden = rate > 0 ? mengeMb / rate : 0;
    const minuten = sekunden / 60;
    const stunden = minuten / 60;
    return [
      { label: 'Dauer', value: stunden, unit: 'h', digits: 2, primary: true },
      { label: 'Dauer in Minuten', value: minuten, unit: 'min', digits: 1 },
      { label: 'Dauer in Sekunden', value: sekunden, unit: 's', digits: 0 },
      { label: 'Effektives Tempo', value: rate, unit: 'MB/s', digits: 0, help: 'Schreibrate nach Abzug der Effizienz.' },
    ];
  },
  intro:
    'Wie lange ein Backup dauert, ergibt sich aus der Datenmenge geteilt durch die Schreibgeschwindigkeit des Ziels. Eine externe USB-Festplatte schafft real oft nur 80–120 MB/s, eine SATA-SSD rund 500 MB/s, eine NVMe-SSD über 2.000 MB/s. Über Gigabit-LAN sind es maximal etwa 110 MB/s. Viele kleine Dateien, Verschlüsselung und Overhead drücken das Tempo, weshalb der Effizienz-Faktor das Ergebnis realistischer macht. Die Richtwerte sind Näherungen (Stand 2026).',
  howto: [
    'Datenmenge eingeben und Einheit (GB oder TB) wählen.',
    'Schreibgeschwindigkeit des Ziels in MB/s eintragen (Richtwerte siehe Hinweis).',
    'Effizienz schätzen – 80 % ist bei gemischten Daten realistisch.',
    'Dauer in Stunden, Minuten und Sekunden ablesen.',
  ],
  faq: [
    { q: 'Wie lange dauert ein Backup von 1 TB?', a: 'Bei 120 MB/s und voller Geschwindigkeit rund 2,3 Stunden. Mit realistischen 80 % Effizienz sind es eher knapp 3 Stunden. Auf einer schnellen SSD geht es deutlich fixer.' },
    { q: 'Warum ist mein Backup langsamer als erwartet?', a: 'Viele kleine Dateien, Virenscanner, Verschlüsselung und USB-Overhead reduzieren die Schreibrate. Große, zusammenhängende Dateien werden mit nahezu voller Geschwindigkeit übertragen.' },
    { q: 'Welche Schreibgeschwindigkeit soll ich eintragen?', a: 'USB-Festplatten etwa 80–120 MB/s, SATA-SSDs rund 500 MB/s, NVMe-SSDs 2.000 MB/s und mehr. Über Gigabit-Netzwerk sind maximal etwa 110 MB/s möglich.' },
    { q: 'Gilt das auch für Cloud-Backups?', a: 'Im Prinzip ja, dann begrenzt aber deine Upload-Geschwindigkeit. Rechne die Upload-Mbit/s in MB/s um (geteilt durch 8) und trage diesen Wert als Schreibgeschwindigkeit ein.' },
  ],
  related: ['download-dauer', 'datenmengen-umrechner', 'raid-kapazitaet-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { menge: 1, mengeEinheit: 'tb', rate: 120, effizienz: 100 },
      // 1.000.000 MB / 120 = 8.333,33 s = 2,3148 h
      expect: [
        { label: 'Dauer in Sekunden', value: 8333, tolerance: 1 },
        { label: 'Dauer', value: 2.31, tolerance: 0.02 },
      ],
    },
    {
      values: { menge: 500, mengeEinheit: 'gb', rate: 500, effizienz: 100 },
      // 500.000 MB / 500 = 1.000 s = 16,667 min
      expect: [{ label: 'Dauer in Minuten', value: 16.7, tolerance: 0.1 }],
    },
  ],
};
