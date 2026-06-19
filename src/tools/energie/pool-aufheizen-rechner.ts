import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'pool-aufheizen-rechner',
  category: 'energie',
  title: 'Pool-Aufheizkosten-Rechner',
  shortTitle: 'Pool aufheizen',
  description:
    'Berechne Energiebedarf und Kosten, um deinen Pool aufzuheizen - aus Wasservolumen, Temperaturerhöhung, Energieträger und Wirkungsgrad bzw. Wärmepumpen-COP.',
  keywords: [
    'pool aufheizen kosten',
    'pool heizen rechner',
    'poolheizung kosten',
    'wasser erwärmen kosten',
    'pool wärmepumpe kosten',
    'pool aufheizen strom',
  ],
  intro:
    'Wer seinen Pool erwärmen will, zahlt für die Energie, die im Wasser steckt. Dieser Rechner berechnet aus dem Wasservolumen und der gewünschten Temperaturerhöhung den Energiebedarf - rund 1,16 kWh, um 1000 Liter um ein Grad zu erwärmen. Anschließend werden die Kosten je nach Energieträger ermittelt: bei Strom-Wärmepumpen über den COP, bei Heizstab, Gas oder Solarthermie über den Wirkungsgrad. Wärmeverluste an Luft und Boden sind nicht enthalten.',
  formula: 'Energie = Volumen(l) × ΔT × 1,16 Wh; Kosten = Energie ÷ Effizienz × Preis',
  inputs: [
    { type: 'number', id: 'volumen', label: 'Wasservolumen', unit: 'm³', default: 30, min: 0, step: 1, help: '1 m³ = 1000 Liter. Aufstellpool ~10-20 m³, eingelassener Pool ~30-60 m³.' },
    { type: 'number', id: 'start', label: 'Aktuelle Wassertemperatur', unit: '°C', default: 18, min: 0, max: 40, step: 1 },
    { type: 'number', id: 'ziel', label: 'Wunschtemperatur', unit: '°C', default: 28, min: 1, max: 40, step: 1 },
    {
      type: 'select',
      id: 'quelle',
      label: 'Energieträger',
      default: 'wp',
      options: [
        { value: 'wp', label: 'Wärmepumpe (Strom, COP)' },
        { value: 'strom', label: 'Elektro-Heizstab (Strom)' },
        { value: 'gas', label: 'Gasheizung' },
      ],
    },
    { type: 'number', id: 'cop', label: 'Wärmepumpen-COP', unit: '', default: 5, min: 1, step: 0.5, help: 'Nur bei Wärmepumpe relevant. Pool-Wärmepumpen ~4-6.' },
    { type: 'number', id: 'wgGas', label: 'Wirkungsgrad Gasheizung', unit: '%', default: 90, min: 1, max: 110, step: 1, help: 'Nur bei Gasheizung relevant.' },
    { type: 'number', id: 'strompreis', label: 'Strompreis', unit: 'ct/kWh', default: 35, min: 0, step: 0.5 },
    { type: 'number', id: 'gaspreis', label: 'Gaspreis', unit: 'ct/kWh', default: 11, min: 0, step: 0.1 },
  ],
  compute: (v) => {
    const volumenL = num(v.volumen) * 1000;
    const deltaT = Math.max(num(v.ziel) - num(v.start), 0);
    // 1,1628 Wh je Liter und Grad -> kWh
    const energieKwh = (volumenL * deltaT * 1.1628) / 1000;
    const quelle = String(v.quelle);
    let endenergie = energieKwh;
    let preis = 0;
    if (quelle === 'wp') {
      const cop = num(v.cop);
      endenergie = cop > 0 ? energieKwh / cop : energieKwh;
      preis = num(v.strompreis) / 100;
    } else if (quelle === 'strom') {
      endenergie = energieKwh; // Heizstab ~100 %
      preis = num(v.strompreis) / 100;
    } else {
      const wg = num(v.wgGas) / 100;
      endenergie = wg > 0 ? energieKwh / wg : energieKwh;
      preis = num(v.gaspreis) / 100;
    }
    const kosten = endenergie * preis;
    return [
      { label: 'Aufheizkosten', value: kosten, unit: '€', digits: 2, primary: true },
      { label: 'Wärme im Wasser', value: energieKwh, unit: 'kWh', digits: 1 },
      { label: 'Benötigte Endenergie', value: endenergie, unit: 'kWh', digits: 1, help: 'Strom bzw. Gas inkl. Effizienz/COP.' },
      { label: 'Temperaturerhöhung', value: deltaT, unit: '°C', digits: 0 },
    ];
  },
  howto: [
    'Wasservolumen des Pools in Kubikmetern eintragen (1 m³ = 1000 Liter).',
    'Aktuelle und gewünschte Wassertemperatur angeben.',
    'Energieträger wählen und den passenden Effizienzwert (COP oder Wirkungsgrad) eintragen.',
    'Strom- bzw. Gaspreis ergänzen und die Aufheizkosten ablesen.',
  ],
  faq: [
    { q: 'Warum ist eine Wärmepumpe so viel günstiger?', a: 'Eine Pool-Wärmepumpe macht aus einer Kilowattstunde Strom über den COP das Vier- bis Sechsfache an Wärme. Ein Elektro-Heizstab wandelt eine kWh Strom dagegen nur in eine kWh Wärme um - er ist daher um ein Vielfaches teurer.' },
    { q: 'Sind die Wärmeverluste berücksichtigt?', a: 'Nein. Der Rechner ermittelt nur die Energie, um das Wasser einmalig aufzuheizen. Über Tage und Wochen verliert ein Pool Wärme an Luft, Boden und durch Verdunstung. Eine Abdeckung reduziert diese Verluste deutlich.' },
    { q: 'Womit rechnet der Rechner?', a: 'Mit der Wärmekapazität von Wasser: rund 1,16 Wattstunden je Liter und Grad. 30 m³ um 10 Grad zu erwärmen erfordert also etwa 349 kWh reine Wärmeenergie.' },
    { q: 'Lohnt sich eine Solarabdeckung?', a: 'Ja. Eine Solarfolie oder Abdeckung verringert die Verdunstung, hält die Wärme und kann die Wassertemperatur passiv anheben - das senkt die laufenden Heizkosten erheblich.' },
  ],
  related: ['waermepumpe-stromkosten-rechner', 'durchlauferhitzer-kosten-rechner', 'gaskosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { volumen: 30, start: 18, ziel: 28, quelle: 'wp', cop: 5, wgGas: 90, strompreis: 35, gaspreis: 11 },
      expect: [
        { label: 'Wärme im Wasser', value: 348.84, tolerance: 0.1 },
        { label: 'Benötigte Endenergie', value: 69.768, tolerance: 0.1 },
        { label: 'Aufheizkosten', value: 24.42, tolerance: 0.05 },
      ],
    },
  ],
};
