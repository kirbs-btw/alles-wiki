import type { CategorySlug, FaqItem } from './types';

/**
 * Generatoren = interaktive Tools mit eigenem Widget (nicht datengetrieben wie die Rechner).
 * Jede Generator-Seite liegt unter src/pages/generator/<slug>.astro und nutzt diese Metadaten
 * für Titel, Meta, JSON-LD, Breadcrumbs und Cross-Links. Diese Registry speist außerdem
 * die Übersicht /generator und die interne Verlinkung.
 */
export interface GeneratorMeta {
  slug: string;
  category: CategorySlug;
  title: string;
  shortTitle: string;
  description: string;
  keywords: string[];
  /** Einleitungstext (SEO) unter dem Widget. */
  intro: string;
  faq: FaqItem[];
  /** Verwandte Rechner-Slugs (für „Passende Rechner"). */
  related?: string[];
  updated: string;
}

export const GENERATORS: GeneratorMeta[] = [
  {
    slug: 'passwort-generator',
    category: 'technik',
    title: 'Passwort-Generator',
    shortTitle: 'Passwort',
    description:
      'Sichere Passwörter erzeugen – Länge und Zeichentypen frei wählbar. Läuft komplett lokal im Browser, nichts wird übertragen.',
    keywords: ['passwort generator', 'sicheres passwort erstellen', 'zufälliges passwort', 'passwort generieren', 'starkes passwort'],
    intro:
      'Dieser Passwort-Generator erstellt zufällige, starke Passwörter direkt in deinem Browser. Du bestimmst Länge und welche Zeichen enthalten sein sollen – Groß- und Kleinbuchstaben, Ziffern und Sonderzeichen. Es werden keine Passwörter gespeichert oder übertragen.',
    faq: [
      { q: 'Wie lang sollte ein sicheres Passwort sein?', a: 'Für die meisten Konten gelten mindestens 12–16 Zeichen mit gemischten Zeichentypen als sicher. Je länger, desto besser.' },
      { q: 'Werden die Passwörter gespeichert?', a: 'Nein. Die Generierung läuft ausschließlich lokal in deinem Browser über einen kryptografisch sicheren Zufallsgenerator. Nichts verlässt dein Gerät.' },
    ],
    related: ['kosten-pro-nutzung-rechner'],
    updated: '2026-06-18',
  },
  {
    slug: 'qr-code-generator',
    category: 'technik',
    title: 'QR-Code-Generator',
    shortTitle: 'QR-Code',
    description:
      'QR-Code aus Text, Link oder Kontaktdaten erstellen und als Bild herunterladen – kostenlos, ohne Anmeldung, lokal im Browser.',
    keywords: ['qr code generator', 'qr code erstellen', 'qr code kostenlos', 'qr code mit link', 'qr code download'],
    intro:
      'Erstelle aus beliebigem Text oder einer URL einen QR-Code und lade ihn als Bild herunter. Die Erzeugung passiert vollständig in deinem Browser – deine Eingaben werden nicht an einen Server gesendet.',
    faq: [
      { q: 'Läuft der QR-Code ab?', a: 'Nein. Der erzeugte QR-Code ist statisch und enthält den Inhalt direkt – er funktioniert dauerhaft und ohne Verbindung zu einem Dienst.' },
      { q: 'Kann ich Links verschlüsseln?', a: 'Der QR-Code kodiert den Inhalt unverschlüsselt. Jeder mit Scanner kann ihn lesen – gib also keine geheimen Daten hinein.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'zufallszahlen-generator',
    category: 'mathe',
    title: 'Zufallszahlen-Generator',
    shortTitle: 'Zufallszahl',
    description:
      'Zufallszahlen in einem frei wählbaren Bereich ziehen – mit oder ohne Wiederholung. Ideal zum Losen, Auswählen und für Spiele.',
    keywords: ['zufallszahlen generator', 'zufallszahl', 'zahl losen', 'lottozahlen ziehen', 'zufallsgenerator zahlen'],
    intro:
      'Ziehe eine oder mehrere Zufallszahlen aus einem von dir bestimmten Bereich. Optional ohne Wiederholung, zum Beispiel zum Auslosen von Gewinnern oder für Lotto-ähnliche Ziehungen.',
    faq: [
      { q: 'Sind die Zahlen wirklich zufällig?', a: 'Sie werden über den Zufallsgenerator deines Browsers erzeugt. Für Spiele, Lose und Entscheidungen ist das völlig ausreichend.' },
      { q: 'Kann ich Wiederholungen ausschließen?', a: 'Ja. Mit der Option „ohne Wiederholung" wird jede Zahl im gewählten Bereich höchstens einmal gezogen.' },
    ],
    related: ['prozentrechner'],
    updated: '2026-06-18',
  },
  {
    slug: 'wuerfel-muenzwurf-generator',
    category: 'alltag',
    title: 'Würfel & Münzwurf',
    shortTitle: 'Würfeln',
    description:
      'Online würfeln und Münze werfen – fairer Zufall für Brettspiele und schnelle Entscheidungen. Beliebig viele Würfel und Seiten.',
    keywords: ['würfeln online', 'münzwurf online', 'würfel simulator', 'kopf oder zahl', 'online würfel'],
    intro:
      'Kein Würfel zur Hand? Würfle hier mit beliebig vielen Würfeln und Seitenzahlen oder wirf eine Münze (Kopf oder Zahl). Praktisch für Brettspiele und um Entscheidungen dem Zufall zu überlassen.',
    faq: [
      { q: 'Wie viele Würfel kann ich werfen?', a: 'Du kannst die Anzahl der Würfel und die Seitenzahl frei einstellen – vom klassischen W6 bis zum W20.' },
      { q: 'Ist das Ergebnis fair?', a: 'Ja, jedes Ergebnis ist gleich wahrscheinlich, da der Zufallsgenerator des Browsers verwendet wird.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'lorem-ipsum-generator',
    category: 'technik',
    title: 'Lorem-Ipsum-Generator',
    shortTitle: 'Lorem Ipsum',
    description:
      'Blindtext in Absätzen, Sätzen oder Wörtern erzeugen – für Layouts, Mockups und Designvorlagen. Mit einem Klick kopierbar.',
    keywords: ['lorem ipsum generator', 'blindtext generator', 'fülltext erstellen', 'lorem ipsum text', 'platzhaltertext'],
    intro:
      'Erzeuge klassischen Lorem-Ipsum-Blindtext in der gewünschten Menge – als Absätze, Sätze oder einzelne Wörter. Ideal, um Layouts und Designs mit realistisch wirkendem Platzhaltertext zu füllen.',
    faq: [
      { q: 'Was ist Lorem Ipsum?', a: 'Lorem Ipsum ist ein seit Jahrhunderten genutzter Blindtext ohne Bedeutung. Er zeigt, wie ein Layout mit Text wirkt, ohne vom Design abzulenken.' },
      { q: 'Darf ich den Text frei verwenden?', a: 'Ja. Lorem-Ipsum-Blindtext ist gemeinfrei und kann uneingeschränkt für Entwürfe genutzt werden.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'tilgungsplan-generator',
    category: 'finanzen',
    title: 'Tilgungsplan-Rechner',
    shortTitle: 'Tilgungsplan',
    description:
      'Vollständiger Tilgungsplan für dein Annuitätendarlehen – Monat für Monat mit Zins, Tilgung und Restschuld. Als Tabelle und CSV.',
    keywords: ['tilgungsplan erstellen', 'tilgungsrechner', 'annuitätendarlehen tilgungsplan', 'darlehen tilgungsplan', 'kredit tilgungsplan'],
    intro:
      'Dieser Generator erstellt den kompletten Tilgungsplan für ein Annuitätendarlehen: Aus Darlehensbetrag, Sollzins und anfänglicher Tilgung wird die monatliche Rate berechnet und jede Rate in Zins- und Tilgungsanteil aufgeschlüsselt – bis zur Restschuld am Ende.',
    faq: [
      { q: 'Was ist ein Annuitätendarlehen?', a: 'Ein Darlehen mit gleichbleibender Monatsrate (Annuität). Über die Laufzeit sinkt der Zinsanteil und der Tilgungsanteil steigt.' },
      { q: 'Was bedeutet anfängliche Tilgung?', a: 'Der Tilgungssatz im ersten Jahr in Prozent der Darlehenssumme. Zusammen mit dem Sollzins bestimmt er die Rate und die Laufzeit.' },
    ],
    related: ['kreditrechner', 'tilgungsrechner', 'baufinanzierung-rate-rechner'],
    updated: '2026-06-18',
  },
  {
    slug: 'einmaleins-generator',
    category: 'bildung',
    title: 'Einmaleins-Arbeitsblatt-Generator',
    shortTitle: 'Einmaleins',
    description:
      'Druckbare Einmaleins-Arbeitsblätter mit Lösungen erstellen – Reihen frei wählbar. Perfekt zum Üben in Grundschule und zuhause.',
    keywords: ['einmaleins arbeitsblatt', 'einmaleins üben', 'kleines einmaleins', '1x1 arbeitsblatt', 'einmaleins generator'],
    intro:
      'Erstelle individuelle Einmaleins-Arbeitsblätter zum Ausdrucken. Wähle die Reihen und die Anzahl der Aufgaben – die Aufgaben werden zufällig gemischt und auf Wunsch mit Lösungen ausgegeben. Ideal zum Üben des kleinen Einmaleins.',
    faq: [
      { q: 'Welche Reihen kann ich üben?', a: 'Du kannst die Reihen frei auswählen, vom 1er- bis zum 10er-Einmaleins oder einzelne Reihen gezielt.' },
      { q: 'Gibt es Lösungen?', a: 'Ja, die Lösungen lassen sich ein- und ausblenden, sodass du dasselbe Blatt zum Üben und zum Kontrollieren nutzen kannst.' },
    ],
    related: ['notendurchschnitt-rechner'],
    updated: '2026-06-18',
  },
  {
    slug: 'farbpalette-generator',
    category: 'technik',
    title: 'Farbpalette-Generator',
    shortTitle: 'Farbpalette',
    description:
      'Harmonische Farbpaletten und Abstufungen aus einer Grundfarbe erzeugen – mit HEX-Codes zum Kopieren. Für Web, Design und Deko.',
    keywords: ['farbpalette generator', 'farben kombinieren', 'hex farben palette', 'farbschema erstellen', 'farbpalette erstellen'],
    intro:
      'Wähle eine Grundfarbe und erhalte dazu passende Paletten – Abstufungen (heller/dunkler) sowie harmonische Farbschemata. Jeder Farbwert lässt sich als HEX-Code kopieren, ideal für Websites, Grafiken und Gestaltung.',
    faq: [
      { q: 'Was ist ein HEX-Code?', a: 'Ein HEX-Code wie #2563eb beschreibt eine Farbe über ihre Rot-, Grün- und Blauanteile. Er wird in CSS und Designprogrammen verwendet.' },
      { q: 'Wie entstehen harmonische Farben?', a: 'Aus dem Farbkreis: durch Verschieben des Farbtons (z. B. Komplementär- oder Analogfarben) entstehen Kombinationen, die zusammen stimmig wirken.' },
    ],
    related: ['hex-rgb-umrechner'],
    updated: '2026-06-18',
  },
];

export function getGenerator(slug: string): GeneratorMeta | undefined {
  return GENERATORS.find((g) => g.slug === slug);
}
