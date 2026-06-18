import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'fps-frametime-rechner',
  category: 'technik',
  title: 'FPS-Frametime-Rechner',
  shortTitle: 'FPS / Frametime',
  description:
    'Rechne zwischen Bildrate (FPS) und Frametime in Millisekunden um – und finde heraus, wie viele Bilder pro Sekunde dein Monitor schafft.',
  keywords: [
    'fps in ms umrechnen',
    'frametime rechner',
    'fps frametime',
    'bildrate millisekunden',
    'frametime in fps',
    'monitor hz fps',
  ],
  formula: 'Frametime (ms) = 1000 / FPS; FPS = 1000 / Frametime (ms)',
  inputs: [
    {
      type: 'number',
      id: 'wert',
      label: 'Wert',
      default: 60,
      min: 0,
      step: 1,
    },
    {
      type: 'select',
      id: 'modus',
      label: 'Eingabe ist …',
      default: 'fps',
      options: [
        { value: 'fps', label: 'Bildrate (FPS) → Frametime' },
        { value: 'ms', label: 'Frametime (ms) → FPS' },
      ],
      help: 'Wähle, ob du FPS oder die Frametime in Millisekunden eingibst.',
    },
  ],
  compute: (v) => {
    const wert = num(v.wert);
    const istFps = String(v.modus) === 'fps';
    const fps = istFps ? wert : wert > 0 ? 1000 / wert : 0;
    const frametime = fps > 0 ? 1000 / fps : 0;
    // Das Hauptergebnis ist jeweils die umgerechnete Größe.
    if (istFps) {
      return [
        { label: 'Frametime', value: frametime, unit: 'ms', digits: 3, primary: true },
        { label: 'Bildrate', value: fps, unit: 'FPS', digits: 1 },
      ];
    }
    return [
      { label: 'Bildrate', value: fps, unit: 'FPS', digits: 1, primary: true },
      { label: 'Frametime', value: frametime, unit: 'ms', digits: 3 },
    ];
  },
  intro:
    'Die Bildrate (FPS, Frames pro Sekunde) und die Frametime sind zwei Seiten derselben Medaille: Die Frametime ist die Zeit, die ein einzelnes Bild bis zur Anzeige braucht. Bei 60 FPS sind das 1000 ms / 60 ≈ 16,7 ms pro Bild, bei 144 FPS nur rund 6,9 ms. Niedrige und vor allem gleichmäßige Frametimes sorgen für ein flüssiges Bild, während Frametime-Spitzen als Ruckler („Stutter“) auffallen.',
  howto: [
    'Den Wert eingeben (FPS oder Frametime in ms).',
    'Im Auswahlfeld festlegen, welche Größe du eingegeben hast.',
    'Das umgerechnete Ergebnis ablesen.',
  ],
  faq: [
    {
      q: 'Wie rechne ich 60 FPS in Millisekunden um?',
      a: '1000 geteilt durch 60 ergibt rund 16,7 ms. Jedes Bild steht also etwa 16,7 Millisekunden auf dem Schirm, bevor das nächste folgt.',
    },
    {
      q: 'Warum ist die Frametime aussagekräftiger als die FPS?',
      a: 'FPS sind ein Durchschnitt über eine Sekunde. Einzelne lange Frametimes (Spikes) verursachen sichtbare Ruckler, obwohl die durchschnittliche FPS-Zahl hoch wirkt. Deshalb schauen viele Tools auf den Frametime-Verlauf.',
    },
    {
      q: 'Wie hängt das mit der Monitor-Hertz-Zahl zusammen?',
      a: 'Ein 144-Hz-Monitor kann maximal 144 Bilder pro Sekunde zeigen, also eine Frametime von rund 6,9 ms. Liefert die Grafikkarte mehr FPS, werden nicht alle Bilder dargestellt; liefert sie weniger, wird die Bildrate vom Spiel begrenzt.',
    },
  ],
  related: ['seitenverhaeltnis-rechner', 'megapixel-rechner', 'datenrate-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { wert: 60, modus: 'fps' },
      expect: [{ label: 'Frametime', value: 16.667, tolerance: 0.01 }],
    },
    {
      values: { wert: 144, modus: 'fps' },
      expect: [{ label: 'Frametime', value: 6.944, tolerance: 0.01 }],
    },
  ],
};
