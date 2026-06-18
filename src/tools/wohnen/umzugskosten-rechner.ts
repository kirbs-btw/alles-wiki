import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'umzugskosten-rechner',
  category: 'wohnen',
  title: 'Umzugskosten-Schätzung',
  shortTitle: 'Umzugskosten',
  description:
    'Schätze die Kosten eines Umzugs aus Wohnfläche, Entfernung, Helfern und Zusatzleistungen wie Verpackung, Halteverbotszone und Möbelmontage – als Richtwert.',
  keywords: [
    'umzugskosten berechnen',
    'umzug kosten schätzen',
    'umzugsunternehmen preis',
    'umzug pro quadratmeter',
    'umzugskosten rechner',
    'kosten umzug helfer',
    'umzug kalkulieren',
  ],
  formula:
    'Kosten = Fläche × Satz/m² + Entfernung × Fahrtkostensatz + Helfer × Stunden × Stundensatz + Zusatzleistungen',
  inputs: [
    { type: 'number', id: 'flaeche', label: 'Wohnfläche', unit: 'm²', default: 75, min: 1, step: 1 },
    { type: 'number', id: 'satz', label: 'Grundpreis je m²', unit: '€/m²', default: 35, min: 0, step: 1, help: 'Richtwert Umzugsunternehmen: ca. 25 bis 50 €/m² je nach Aufwand.' },
    { type: 'number', id: 'entfernung', label: 'Entfernung (einfach)', unit: 'km', default: 50, min: 0, step: 5 },
    { type: 'number', id: 'fahrtkosten', label: 'Fahrtkosten je km', unit: '€/km', default: 1.2, min: 0, step: 0.1 },
    { type: 'number', id: 'helfer', label: 'Bezahlte Helfer', unit: 'Personen', default: 3, min: 0, step: 1 },
    { type: 'number', id: 'stunden', label: 'Stunden je Helfer', unit: 'h', default: 6, min: 0, step: 1 },
    { type: 'number', id: 'stundensatz', label: 'Stundensatz je Helfer', unit: '€/h', default: 25, min: 0, step: 1 },
    {
      type: 'select', id: 'zusatz', label: 'Zusatzleistungen', default: 'standard',
      options: [
        { value: 'keine', label: 'Keine (Selbstpacker)' },
        { value: 'standard', label: 'Halteverbotszone + Kartons (ca. 200 €)' },
        { value: 'voll', label: 'Voller Service: Packen + Montage (ca. 600 €)' },
      ],
    },
  ],
  compute: (v) => {
    const flaeche = num(v.flaeche);
    const satz = num(v.satz);
    const entfernung = num(v.entfernung);
    const fahrtkosten = num(v.fahrtkosten);
    const helfer = num(v.helfer);
    const stunden = num(v.stunden);
    const stundensatz = num(v.stundensatz);
    const zusatzMap: Record<string, number> = { keine: 0, standard: 200, voll: 600 };
    const zusatz = zusatzMap[String(v.zusatz)] ?? 0;
    const grundkosten = flaeche * satz;
    const fahrt = entfernung * fahrtkosten;
    const personalkosten = helfer * stunden * stundensatz;
    const gesamt = grundkosten + fahrt + personalkosten + zusatz;
    return [
      { label: 'Geschätzte Umzugskosten', value: gesamt, unit: '€', digits: 2, primary: true },
      { label: 'Grundkosten Transport', value: grundkosten, unit: '€', digits: 2 },
      { label: 'Fahrtkosten', value: fahrt, unit: '€', digits: 2 },
      { label: 'Personalkosten Helfer', value: personalkosten, unit: '€', digits: 2 },
      { label: 'Zusatzleistungen', value: zusatz, unit: '€', digits: 2 },
    ];
  },
  intro:
    'Was ein Umzug kostet, hängt vor allem von der Wohnungsgröße, der Entfernung, der Zahl der Helfer und den gebuchten Zusatzleistungen ab. Dieser Rechner liefert eine transparente Richtwert-Schätzung, mit der du Angebote von Umzugsunternehmen einordnen oder dein Budget für einen Umzug in Eigenregie planen kannst.',
  howto: [
    'Wohnfläche und einen Grundpreis je m² eingeben.',
    'Entfernung und Fahrtkosten je Kilometer ergänzen.',
    'Anzahl bezahlter Helfer, Stunden und Stundensatz angeben.',
    'Zusatzleistungen wählen und die geschätzten Gesamtkosten ablesen.',
  ],
  faq: [
    { q: 'Was kostet ein Umzug ungefähr?', a: 'Als grober Richtwert gelten bei einem Umzugsunternehmen rund 25 bis 50 € pro Quadratmeter Wohnfläche zuzüglich Fahrtkosten und Zusatzleistungen. Ein Selbstumzug mit Mietwagen und privaten Helfern ist deutlich günstiger.' },
    { q: 'Welche Zusatzkosten werden oft vergessen?', a: 'Häufig unterschätzt werden eine Halteverbotszone, Verpackungsmaterial, Möbelmontage, Kühlschranktransport, Etagenzuschläge ohne Aufzug und die Ummeldung von Adresse, Strom und Internet.' },
    { q: 'Kann ich Umzugskosten von der Steuer absetzen?', a: 'Bei einem beruflich bedingten Umzug sind die Kosten als Werbungskosten absetzbar, bei einem privaten Umzug teils als haushaltsnahe Dienstleistung. Hebe alle Rechnungen und Belege auf.' },
    { q: 'Wie genau ist diese Schätzung?', a: 'Es handelt sich um eine vereinfachte Kalkulation auf Basis typischer Richtwerte. Tatsächliche Angebote variieren je nach Region, Saison, Stockwerk und Möbelvolumen – hole für verbindliche Preise mehrere Angebote ein.' },
  ],
  related: ['kaution-rechner', 'quadratmeterpreis-rechner', 'maklerprovision-rechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { flaeche: 75, satz: 35, entfernung: 50, fahrtkosten: 1.2, helfer: 3, stunden: 6, stundensatz: 25, zusatz: 'standard' },
      expect: [
        { label: 'Grundkosten Transport', value: 2625, tolerance: 0.01 },
        { label: 'Fahrtkosten', value: 60, tolerance: 0.01 },
        { label: 'Personalkosten Helfer', value: 450, tolerance: 0.01 },
        { label: 'Geschätzte Umzugskosten', value: 3335, tolerance: 0.01 },
      ],
    },
  ],
};
