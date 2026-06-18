import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'homeoffice-pauschale-rechner',
  category: 'beruf',
  title: 'Homeoffice-Pauschale Rechner',
  shortTitle: 'Homeoffice-Pauschale',
  description:
    'Berechne deine Homeoffice-Pauschale: 6 € pro Tag im Homeoffice, maximal 1.260 € im Jahr (210 Tage) als Werbungskosten.',
  keywords: [
    'homeoffice pauschale rechner',
    'home office pauschale berechnen',
    'homeoffice steuer 6 euro',
    'homeoffice pauschale 2026',
    'arbeitszimmer pauschale',
    'tagespauschale homeoffice',
  ],
  formula:
    'Pauschale = min(Homeoffice-Tage, 210) × 6 €  (Höchstbetrag 1.260 € / Jahr)',
  inputs: [
    { type: 'number', id: 'tage', label: 'Tage im Homeoffice pro Jahr', unit: 'Tage', default: 150, min: 0, max: 365, step: 1, help: 'Tage, an denen die Tätigkeit überwiegend zu Hause ausgeübt wurde.' },
  ],
  compute: (v) => {
    const tage = num(v.tage);

    const satzProTag = 6;
    const maxTage = 210;
    const anerkannteTage = Math.min(tage, maxTage);
    const pauschale = anerkannteTage * satzProTag;
    const nichtAnerkannt = Math.max(tage - maxTage, 0);
    const verlorenerBetrag = nichtAnerkannt * satzProTag;

    return [
      { label: 'Homeoffice-Pauschale', value: pauschale, unit: '€', digits: 2, primary: true },
      { label: 'Anerkannte Tage', value: anerkannteTage, unit: 'Tage', digits: 0 },
      { label: 'Tage über dem Höchstwert', value: nichtAnerkannt, unit: 'Tage', digits: 0 },
      { label: 'Nicht ansetzbarer Betrag', value: verlorenerBetrag, unit: '€', digits: 2, help: 'Anteil über dem Jahreshöchstbetrag von 1.260 €.' },
    ];
  },
  intro:
    'Für Tage, an denen du überwiegend zu Hause gearbeitet hast, kannst du die Homeoffice-Tagespauschale als Werbungskosten ansetzen: 6 € pro Tag, höchstens 1.260 € im Jahr (entspricht 210 Tagen). Ein separates häusliches Arbeitszimmer ist dafür nicht nötig. Der Rechner liefert eine Orientierung zum Werbungskostenbetrag.',
  howto: [
    'Zähle die Tage, an denen du überwiegend von zu Hause gearbeitet hast.',
    'Trage die Anzahl in das Feld ein.',
    'Lies die ansetzbare Homeoffice-Pauschale ab – maximal 1.260 € pro Jahr.',
  ],
  faq: [
    { q: 'Wie hoch ist die Homeoffice-Pauschale?', a: '6 € pro Homeoffice-Tag, gedeckelt auf 1.260 € im Jahr. Das entspricht 210 anerkannten Tagen.' },
    { q: 'Brauche ich ein eigenes Arbeitszimmer?', a: 'Nein. Die Tagespauschale gilt unabhängig davon, ob ein abgeschlossenes häusliches Arbeitszimmer vorhanden ist. Sie deckt die anteiligen Raumkosten pauschal ab.' },
    { q: 'Kann ich an einem Tag Pauschale und Pendlerpauschale ansetzen?', a: 'In der Regel nicht für denselben Tag, da die Tagespauschale eine überwiegende Tätigkeit zu Hause voraussetzt. Es gibt eng begrenzte Ausnahmen, etwa wenn dauerhaft kein anderer Arbeitsplatz zur Verfügung steht.' },
    { q: 'Ist die Pauschale schon meine Steuerersparnis?', a: 'Nein, es ist der Werbungskostenbetrag. Die tatsächliche Ersparnis ergibt sich aus dem Betrag mal deinem persönlichen Steuersatz und nur, soweit die Werbungskosten den Pauschbetrag übersteigen.' },
  ],
  related: ['pendlerpauschale-rechner', 'arbeitstage-rechner', 'jahresgehalt-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { tage: 150 },
      expect: [
        { label: 'Homeoffice-Pauschale', value: 900, tolerance: 0.01 },
        { label: 'Anerkannte Tage', value: 150, tolerance: 0.01 },
      ],
    },
    {
      values: { tage: 250 },
      expect: [
        { label: 'Homeoffice-Pauschale', value: 1260, tolerance: 0.01 },
        { label: 'Nicht ansetzbarer Betrag', value: 240, tolerance: 0.01 },
      ],
    },
  ],
};
