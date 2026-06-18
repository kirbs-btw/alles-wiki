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
  {
    slug: 'schriftgenerator',
    category: 'technik',
    title: 'Schriftgenerator',
    shortTitle: 'Schriftarten',
    description:
      'Text in coole Schriftarten umwandeln – fett, kursiv, Schreibschrift, Fraktur und mehr. Zum Kopieren für Social Media, Bio und Nicknames.',
    keywords: ['schriftgenerator', 'schriftarten generator', 'coole schrift', 'instagram schrift', 'schreibschrift generator'],
    intro:
      'Gib einen Text ein und erhalte ihn in vielen Unicode-Schriftstilen – fett, kursiv, Schreibschrift, Frakturschrift, Monospace und mehr. Die Zeichen sind echtes Unicode und lassen sich überall einfügen, wo normaler Text erlaubt ist (Instagram, TikTok, WhatsApp, Profile).',
    faq: [
      { q: 'Funktioniert das überall?', a: 'Meist ja, da es echte Unicode-Zeichen sind. Einzelne Apps oder Schriftarten zeigen seltene Zeichen aber als Kästchen an.' },
      { q: 'Ist das eine echte Schriftart?', a: 'Nein. Es sind Unicode-Varianten der Buchstaben, keine installierte Schriftart – deshalb funktioniert das Kopieren ohne Font-Download.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'benutzername-generator',
    category: 'alltag',
    title: 'Benutzername-Generator',
    shortTitle: 'Username',
    description:
      'Kreative Benutzernamen und Nicknames generieren – mit Zahlen, Trennzeichen und Stil-Optionen. Für Gaming, Social Media und neue Accounts.',
    keywords: ['benutzername generator', 'username generator', 'nickname generator', 'gamertag generator', 'nutzername ideen'],
    intro:
      'Dir fällt kein guter Benutzername ein? Dieser Generator kombiniert Wörter, Zahlen und Trennzeichen zu Vorschlägen. Stelle Stil und Länge ein und generiere so viele Ideen, wie du möchtest – alles lokal im Browser.',
    faq: [
      { q: 'Sind die Namen verfügbar?', a: 'Das hängt von der jeweiligen Plattform ab. Prüfe einen Favoriten direkt beim Anbieter, da Verfügbarkeit nicht abgefragt werden kann.' },
      { q: 'Kann ich Zahlen anhängen?', a: 'Ja, optional werden Zahlen ergänzt – das erhöht die Chance, dass ein Name noch frei ist.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'uuid-generator',
    category: 'technik',
    title: 'UUID-Generator',
    shortTitle: 'UUID',
    description:
      'Zufällige UUIDs (Version 4) erzeugen – einzeln oder als Liste, direkt kopierbar. Für Entwicklung, Datenbanken und Tests.',
    keywords: ['uuid generator', 'guid generator', 'uuid v4', 'eindeutige id erzeugen', 'uuid online'],
    intro:
      'Eine UUID (Universally Unique Identifier) ist eine 128-Bit-Kennung, die praktisch garantiert eindeutig ist. Dieser Generator erzeugt UUIDs der Version 4 (zufallsbasiert) über den kryptografischen Zufallsgenerator deines Browsers – einzeln oder als Liste.',
    faq: [
      { q: 'Was bedeutet Version 4?', a: 'Version 4 erzeugt die UUID aus Zufallswerten. Sie ist die gängigste Variante, wenn keine zeit- oder namensbasierte ID nötig ist.' },
      { q: 'Sind die UUIDs wirklich eindeutig?', a: 'Die Kollisionswahrscheinlichkeit ist verschwindend gering. Für praktisch alle Anwendungen gelten v4-UUIDs als eindeutig.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'base64-generator',
    category: 'technik',
    title: 'Base64 Encoder & Decoder',
    shortTitle: 'Base64',
    description:
      'Text zu Base64 kodieren und wieder dekodieren – UTF-8-sicher und komplett lokal im Browser. Für Entwicklung, APIs und Daten-URLs.',
    keywords: ['base64 encode', 'base64 decode', 'base64 generator', 'text zu base64', 'base64 dekodieren'],
    intro:
      'Base64 kodiert beliebige Zeichen in ein sicher übertragbares Format aus Buchstaben, Ziffern und wenigen Sonderzeichen. Hier kodierst du Text nach Base64 oder dekodierst Base64 zurück in Klartext – UTF-8-sicher (Umlaute und Emojis bleiben erhalten).',
    faq: [
      { q: 'Ist Base64 eine Verschlüsselung?', a: 'Nein. Base64 ist nur eine Kodierung und bietet keinen Schutz – jeder kann sie zurückrechnen. Für Geheimnisse ist Verschlüsselung nötig.' },
      { q: 'Werden Umlaute korrekt behandelt?', a: 'Ja. Der Text wird vor der Kodierung als UTF-8 verarbeitet, daher bleiben Umlaute und Sonderzeichen erhalten.' },
    ],
    related: ['bit-byte-umrechner'],
    updated: '2026-06-18',
  },
  {
    slug: 'lottozahlen-generator',
    category: 'alltag',
    title: 'Lottozahlen-Generator',
    shortTitle: 'Lottozahlen',
    description:
      'Zufällige Lottozahlen ziehen: 6 aus 49 plus Superzahl, auf Wunsch mehrere Tippreihen auf einmal. Fairer Zufall im Browser.',
    keywords: ['lottozahlen generator', 'lotto zufallszahlen', '6 aus 49 generator', 'zufällige lottozahlen', 'lotto tippreihen'],
    intro:
      'Keine Idee für deinen Lottoschein? Dieser Generator zieht zufällige Tippreihen für 6 aus 49 inklusive Superzahl (0–9). Du kannst mehrere Reihen auf einmal erzeugen – die Ziehung läuft über den Zufallsgenerator deines Browsers.',
    faq: [
      { q: 'Erhöht das meine Gewinnchance?', a: 'Nein. Jede Kombination ist gleich wahrscheinlich. Der Generator nimmt dir nur das Ausdenken der Zahlen ab.' },
      { q: 'Wie funktioniert 6 aus 49?', a: 'Es werden 6 verschiedene Zahlen von 1 bis 49 gezogen, dazu eine Superzahl von 0 bis 9.' },
    ],
    updated: '2026-06-18',
  },
  {
    slug: 'entscheidungs-generator',
    category: 'alltag',
    title: 'Entscheidungs-Generator',
    shortTitle: 'Entscheidung',
    description:
      'Kannst du dich nicht entscheiden? Optionen eingeben und den Zufall fair entscheiden lassen – von „Ja oder Nein" bis zur langen Liste.',
    keywords: ['entscheidung treffen', 'zufallsentscheidung', 'entscheidungshilfe', 'ja oder nein generator', 'auslosen'],
    intro:
      'Pizza oder Pasta? Dieser Generator trifft für dich eine neutrale Zufallsentscheidung. Trage deine Optionen ein (eine pro Zeile) und lass den Zufall wählen – fair und ohne Hintergedanken.',
    faq: [
      { q: 'Ist die Auswahl wirklich fair?', a: 'Ja, jede Option hat dieselbe Wahrscheinlichkeit, da der Zufallsgenerator des Browsers verwendet wird.' },
      { q: 'Wie viele Optionen kann ich eingeben?', a: 'So viele du möchtest – eine pro Zeile. Mindestens zwei sollten es sein, damit es etwas zu entscheiden gibt.' },
    ],
    updated: '2026-06-18',
  },
];

export function getGenerator(slug: string): GeneratorMeta | undefined {
  return GENERATORS.find((g) => g.slug === slug);
}
