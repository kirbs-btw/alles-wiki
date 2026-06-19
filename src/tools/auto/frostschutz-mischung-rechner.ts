import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'frostschutz-mischung-rechner',
  category: 'auto',
  title: 'Frostschutz-Mischung-Rechner (Kühlmittel)',
  shortTitle: 'Frostschutz',
  description:
    'Berechne, wie viel Kühlerfrostschutz-Konzentrat du für dein Kühlsystem brauchst, um einen Zielanteil und damit die gewünschte Frostsicherheit zu erreichen.',
  keywords: [
    'frostschutz mischverhältnis rechner',
    'kühlerfrostschutz berechnen',
    'kühlmittel mischung rechner',
    'frostschutz konzentrat menge',
    'kühlflüssigkeit mischen',
  ],
  formula:
    'Benötigtes Konzentrat = Systemvolumen × Zielanteil; Nachfüllen = Ziel-Konzentrat − vorhandenes Konzentrat',
  intro:
    'Kühlerfrostschutz wird als Konzentrat mit Wasser gemischt. Der Konzentratanteil bestimmt, bis zu welcher Temperatur das Kühlsystem frostsicher ist – ein Anteil von rund 50 % schützt meist bis etwa −37 °C. Dieser Rechner ermittelt aus Systemvolumen, vorhandenem und gewünschtem Anteil, wie viel Konzentrat insgesamt nötig ist und wie viel du noch nachfüllen musst.',
  inputs: [
    { type: 'number', id: 'volumen', label: 'Kühlsystem-Volumen', unit: 'l', default: 8, min: 0, step: 0.5, help: 'Gesamtfüllmenge laut Handbuch.' },
    { type: 'number', id: 'zielAnteil', label: 'Ziel-Konzentratanteil', unit: '%', default: 50, min: 0, max: 70, step: 1, help: '50 % ≈ −37 °C, 60 % ≈ −52 °C (herstellerabhängig).' },
    { type: 'number', id: 'vorhandenVolumen', label: 'Bereits vorhandene Flüssigkeit', unit: 'l', default: 0, min: 0, step: 0.5, help: 'Restmenge im System (0 bei Komplettbefüllung).' },
    { type: 'number', id: 'vorhandenAnteil', label: 'Konzentratanteil der Restmenge', unit: '%', default: 0, min: 0, max: 100, step: 1 },
  ],
  compute: (v) => {
    const volumen = num(v.volumen);
    const zielAnteil = num(v.zielAnteil) / 100;
    const restVol = Math.min(num(v.vorhandenVolumen), volumen);
    const restAnteil = num(v.vorhandenAnteil) / 100;
    const benoetigtKonzentrat = volumen * zielAnteil;
    const vorhandenKonzentrat = restVol * restAnteil;
    const konzentratNachfuellen = Math.max(0, benoetigtKonzentrat - vorhandenKonzentrat);
    const restFuellmenge = Math.max(0, volumen - restVol);
    const wasserNachfuellen = Math.max(0, restFuellmenge - konzentratNachfuellen);
    return [
      { label: 'Konzentrat nachfüllen', value: konzentratNachfuellen, unit: 'l', digits: 2, primary: true },
      { label: 'Wasser nachfüllen', value: wasserNachfuellen, unit: 'l', digits: 2, help: 'Idealerweise destilliertes Wasser.' },
      { label: 'Konzentrat gesamt im System', value: benoetigtKonzentrat, unit: 'l', digits: 2 },
    ];
  },
  howto: [
    'Gesamtvolumen des Kühlsystems aus dem Handbuch eintragen.',
    'Gewünschten Konzentratanteil wählen (meist 50 % für ca. −37 °C).',
    'Vorhandene Restmenge und deren Konzentratanteil angeben (0, wenn komplett neu befüllt wird).',
    'Ablesen, wie viel Konzentrat und Wasser nachzufüllen sind.',
  ],
  faq: [
    { q: 'Welcher Konzentratanteil schützt bis wann?', a: 'Als Richtwert schützt ein Anteil von rund 40 % bis etwa −25 °C, 50 % bis etwa −37 °C und 60 % bis etwa −52 °C. Die genauen Werte stehen auf dem Gebinde des Herstellers (Mischtabelle).' },
    { q: 'Warum nicht mehr als 60 % Konzentrat?', a: 'Ein zu hoher Anteil verschlechtert die Wärmeabfuhr und kann den Gefrierschutz paradoxerweise wieder verringern. Hersteller empfehlen meist einen Anteil zwischen 40 und 60 %.' },
    { q: 'Welches Wasser soll ich verwenden?', a: 'Destilliertes oder demineralisiertes Wasser ist ideal, da kalkarmes Wasser Ablagerungen und Korrosion vermeidet. Stark kalkhaltiges Leitungswasser sollte nicht verwendet werden.' },
    { q: 'Darf ich verschiedene Frostschutzmittel mischen?', a: 'Nur Mittel derselben Spezifikation/Farbe und Freigabe (z. B. G12, G13) mischen. Unverträgliche Mittel können verklumpen und das Kühlsystem schädigen – im Zweifel komplett wechseln.' },
  ],
  related: ['winter-reichweite-rechner', 'reifen-restprofil-rechner', 'auto-gesamtkosten-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { volumen: 8, zielAnteil: 50, vorhandenVolumen: 0, vorhandenAnteil: 0 },
      // Konzentrat gesamt = 8*0,5 = 4; nachfüllen = 4; Wasser = 8-4 = 4
      expect: [
        { label: 'Konzentrat nachfüllen', value: 4, tolerance: 0.01 },
        { label: 'Wasser nachfüllen', value: 4, tolerance: 0.01 },
      ],
    },
    {
      values: { volumen: 10, zielAnteil: 50, vorhandenVolumen: 4, vorhandenAnteil: 25 },
      // Ziel-Konzentrat = 5; vorhanden = 4*0,25 = 1; nachfüllen = 4; Restfüllmenge = 6; Wasser = 6-4 = 2
      expect: [{ label: 'Konzentrat nachfüllen', value: 4, tolerance: 0.01 }],
    },
  ],
};
