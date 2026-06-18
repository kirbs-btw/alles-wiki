import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

/**
 * Eismenge zum Kühlen von Getränken (Physik-Näherung).
 * Wärme, die den Getränken entzogen werden muss: Q = m_getraenk × c × ΔT.
 * Diese Wärme wird primär durch Schmelzen von Eis aufgenommen: Q_eis = m_eis × L (Schmelzwärme).
 * Wasser c = 4,18 kJ/(kg·K); Schmelzwärme Eis L = 334 kJ/kg.
 * Wegen Verlusten und unvollständigem Schmelzen wird ein praxisnaher Sicherheitsfaktor (×2) ergänzt.
 */
const C_WASSER = 4.18; // kJ/(kg·K)
const L_EIS = 334; // kJ/kg
const SICHERHEITSFAKTOR = 2;

export const tool: Tool = {
  slug: 'getraenke-kuehlung-eismenge-rechner',
  category: 'alltag',
  title: 'Eismenge zum Kühlen von Getränken berechnen',
  shortTitle: 'Eismenge',
  description:
    'Berechne, wie viel Eis du brauchst, um deine Getränke für die Party herunterzukühlen – aus Getränkemenge und gewünschter Temperaturabsenkung.',
  keywords: [
    'eismenge getraenke kuehlen',
    'wie viel eis fuer getraenke',
    'getraenke kuehlen eis',
    'eis berechnen party',
    'eismenge berechnen',
    'getraenkekuehlung eis',
  ],
  formula:
    'Kühlbedarf Q = Getränkemenge(kg) × 4,18 × ΔT; Eis = Q / 334 × Sicherheitsfaktor 2',
  inputs: [
    {
      type: 'number',
      id: 'getraenke',
      label: 'Getränkemenge',
      unit: 'l',
      default: 20,
      min: 0.5,
      max: 500,
      step: 1,
      help: '1 Liter Getränk entspricht etwa 1 kg.',
    },
    {
      type: 'number',
      id: 'startTemp',
      label: 'Ausgangstemperatur',
      unit: '°C',
      default: 22,
      min: -5,
      max: 50,
      step: 1,
    },
    {
      type: 'number',
      id: 'zielTemp',
      label: 'Zieltemperatur',
      unit: '°C',
      default: 7,
      min: -5,
      max: 50,
      step: 1,
      help: 'Kühlschranktemperatur liegt bei rund 6–8 °C.',
    },
  ],
  compute: (v) => {
    const getraenke = Math.max(0, num(v.getraenke, 0));
    const startTemp = num(v.startTemp, 22);
    const zielTemp = num(v.zielTemp, 7);
    const deltaT = Math.max(0, startTemp - zielTemp);
    const masse = getraenke; // 1 l ≈ 1 kg
    const qKj = masse * C_WASSER * deltaT;
    const eisKg = (qKj / L_EIS) * SICHERHEITSFAKTOR;
    return [
      { label: 'Eismenge', value: eisKg, unit: 'kg', digits: 1, primary: true },
      { label: 'Kühlbedarf', value: qKj, unit: 'kJ', digits: 0 },
      { label: 'Temperaturabsenkung', value: deltaT, unit: 'K', digits: 0 },
    ];
  },
  intro:
    'Um Getränke kalt zu bekommen, muss ihnen Wärme entzogen werden – und genau das macht schmelzendes Eis. Aus der Getränkemenge und der gewünschten Temperaturabsenkung lässt sich die nötige Eismenge physikalisch abschätzen. Weil in der Praxis Wärme von außen nachströmt und nicht alles Eis ideal schmilzt, rechnet dieser Rechner mit einem Sicherheitsfaktor von 2.',
  howto: [
    'Trage die gesamte Getränkemenge in Litern ein.',
    'Gib die Ausgangstemperatur der Getränke an (Raumtemperatur ca. 22 °C).',
    'Gib die gewünschte Zieltemperatur an (Kühlschrank ca. 7 °C).',
    'Lies die benötigte Eismenge in Kilogramm ab.',
  ],
  faq: [
    { q: 'Warum der Sicherheitsfaktor 2?', a: 'In der Praxis dringt Wärme von außen in die Kühlbox ein und das Schmelzwasser kühlt nicht perfekt. Die doppelte theoretische Menge sorgt dafür, dass die Getränke wirklich kalt werden und bleiben.' },
    { q: 'Wie viel Eis für eine Kiste?', a: 'Für etwa 20 Liter Getränke von Raum- auf Kühltemperatur sind grob 7–8 kg Eis ein guter Richtwert.' },
    { q: 'Hilft Salz im Eiswasser?', a: 'Ja, eine Salz-Eis-Mischung wird kälter als 0 °C und kühlt Flaschen schneller. Für die reine Eismenge ändert das wenig, beschleunigt aber das Herunterkühlen.' },
    { q: 'Ist das exakt?', a: 'Es ist eine Näherung auf Basis der Schmelzwärme von Eis. Reale Werte hängen von Isolierung der Box, Außentemperatur und Standzeit ab.' },
  ],
  related: ['getraenke-pro-gast-rechner', 'partymengen-rechner', 'temperatur-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { getraenke: 20, startTemp: 22, zielTemp: 7 },
      // deltaT = 15; Q = 20*4.18*15 = 1254 kJ; eis = 1254/334*2 = 3.7545*2 = 7.509 kg
      expect: [
        { label: 'Eismenge', value: 7.5, tolerance: 0.1 },
        { label: 'Kühlbedarf', value: 1254, tolerance: 1 },
        { label: 'Temperaturabsenkung', value: 15, tolerance: 0 },
      ],
    },
    {
      values: { getraenke: 10, startTemp: 20, zielTemp: 5 },
      // deltaT = 15; Q = 10*4.18*15 = 627 kJ; eis = 627/334*2 = 1.877*2 = 3.754 kg
      expect: [{ label: 'Eismenge', value: 3.8, tolerance: 0.1 }],
    },
  ],
};
