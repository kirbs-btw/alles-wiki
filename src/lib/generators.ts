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
  {
    slug: 'css-gradient-generator',
    category: 'technik',
    title: 'CSS-Verlauf-Generator',
    shortTitle: 'CSS-Gradient',
    description:
      'Farbverläufe erstellen und den passenden CSS-Code kopieren – linear oder radial, mit Live-Vorschau. Für Web-Design und Layouts.',
    keywords: ['css gradient generator', 'farbverlauf css', 'linear-gradient generator', 'css verlauf erstellen', 'gradient code'],
    intro:
      'Stelle zwei Farben, Richtung und Typ (linear oder radial) ein und erhalte sofort den fertigen CSS-Code mit Live-Vorschau. Kopiere den background-Wert direkt in dein Stylesheet.',
    faq: [
      { q: 'Linear oder radial?', a: 'Linear verläuft entlang einer Achse (z. B. von oben nach unten), radial vom Mittelpunkt nach außen. Beides wird hier unterstützt.' },
      { q: 'Funktioniert das in allen Browsern?', a: 'Ja, linear-gradient und radial-gradient sind seit Jahren Standard und werden von allen modernen Browsern unterstützt.' },
    ],
    related: ['hex-rgb-umrechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'hash-generator',
    category: 'technik',
    title: 'Hash-Generator (SHA-256)',
    shortTitle: 'Hash',
    description:
      'Prüfsummen aus Text erzeugen – SHA-256, SHA-1 und SHA-512. Läuft lokal im Browser über die Web-Crypto-API, nichts wird übertragen.',
    keywords: ['hash generator', 'sha256 generator', 'sha256 online', 'prüfsumme erstellen', 'sha512 hash'],
    intro:
      'Gib einen Text ein und erhalte seinen Hash-Wert (SHA-256, SHA-1 oder SHA-512) als Hexadezimal-Zeichenkette. Die Berechnung läuft über die Web-Crypto-API direkt in deinem Browser.',
    faq: [
      { q: 'Kann ich den Hash zurückrechnen?', a: 'Nein. Hash-Funktionen sind Einweg-Funktionen – aus dem Hash lässt sich der Ausgangstext nicht zurückgewinnen.' },
      { q: 'Wofür ist SHA-1 noch gut?', a: 'SHA-1 gilt als kryptografisch unsicher und sollte für Sicherheit nicht mehr verwendet werden – für Prüfsummen-Vergleiche älterer Systeme ist es hier dennoch verfügbar.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'wichtel-auslosung',
    category: 'alltag',
    title: 'Wichtel-Auslosung',
    shortTitle: 'Wichteln',
    description:
      'Wichtel- und Schrottwichtel-Partner fair und geheim auslosen – jeder beschenkt genau einen anderen, niemand sich selbst.',
    keywords: ['wichteln auslosen', 'schrottwichteln auslosung', 'secret santa generator', 'wichtel partner losen', 'wichteln zuteilung'],
    intro:
      'Gib die Namen aller Teilnehmer ein (eine pro Zeile) und lose die Wichtel-Paare aus. Jeder zieht genau eine andere Person und niemand sich selbst – die Zuteilung läuft fair und zufällig im Browser.',
    faq: [
      { q: 'Kann jemand sich selbst ziehen?', a: 'Nein. Die Auslosung stellt sicher, dass niemand sich selbst zugeteilt wird.' },
      { q: 'Wie bleibt es geheim?', a: 'Lass jede Person nur ihr eigenes Ergebnis ansehen. Da alles lokal läuft, wird nichts gespeichert oder übertragen.' },
    ],
    related: ['getraenke-pro-gast-rechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'morsecode-uebersetzer',
    category: 'technik',
    title: 'Morsecode-Übersetzer',
    shortTitle: 'Morsecode',
    description:
      'Text in Morsecode übersetzen und zurück – Buchstaben, Zahlen und Satzzeichen. Mit Kopierfunktion, komplett im Browser.',
    keywords: ['morsecode übersetzer', 'morse übersetzer', 'text in morsecode', 'morsecode entschlüsseln', 'morse alphabet'],
    intro:
      'Wandle Text in Morsecode um oder entschlüssele Morsezeichen zurück in Klartext. Unterstützt werden Buchstaben, Ziffern und gängige Satzzeichen nach dem internationalen Morse-Alphabet.',
    faq: [
      { q: 'Wie werden Wörter getrennt?', a: 'Buchstaben werden mit einem Leerzeichen, Wörter mit einem Schrägstrich (/) getrennt – so bleibt der Code eindeutig lesbar.' },
      { q: 'Werden Umlaute unterstützt?', a: 'Ja, die deutschen Umlaute haben eigene Morse-Zeichen und werden mit übersetzt.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'schere-stein-papier',
    category: 'alltag',
    title: 'Schere, Stein, Papier',
    shortTitle: 'Schere-Stein-Papier',
    description:
      'Online Schere, Stein, Papier gegen den Computer spielen – mit Punktestand. Schnelle Entscheidung oder Zeitvertreib.',
    keywords: ['schere stein papier online', 'schere stein papier spielen', 'schnick schnack schnuck', 'rock paper scissors', 'gegen computer spielen'],
    intro:
      'Wähle Schere, Stein oder Papier – der Computer hält zufällig dagegen. Der Punktestand wird mitgezählt. Ideal für eine schnelle Entscheidung oder zwischendurch.',
    faq: [
      { q: 'Spielt der Computer fair?', a: 'Ja, der Computer wählt rein zufällig und kennt deinen Zug nicht im Voraus.' },
      { q: 'Was schlägt was?', a: 'Schere schlägt Papier, Papier schlägt Stein, Stein schlägt Schere.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'team-auslosung',
    category: 'alltag',
    title: 'Team-Auslosung',
    shortTitle: 'Team-Auslosung',
    description:
      'Namen zufällig und gleichmäßig auf Teams oder Gruppen verteilen – für Sport, Spieleabend und Projekte. Fair gemischt im Browser.',
    keywords: ['teams auslosen', 'gruppen einteilen', 'mannschaften losen', 'gruppen generator', 'namen auf teams verteilen'],
    intro:
      'Trage alle Namen ein (eine pro Zeile) und gib die gewünschte Anzahl Teams an. Die Namen werden zufällig gemischt und möglichst gleichmäßig auf die Teams verteilt.',
    faq: [
      { q: 'Werden die Teams gleich groß?', a: 'Ja, soweit möglich. Geht die Teilnehmerzahl nicht glatt auf, sind einzelne Teams um eine Person größer.' },
      { q: 'Kann ich neu mischen?', a: 'Ja, jeder Klick erzeugt eine neue zufällige Aufteilung.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'passwort-staerke-checker',
    category: 'technik',
    title: 'Passwort-Stärke-Checker',
    shortTitle: 'Passwort-Stärke',
    description:
      'Prüfe, wie stark dein Passwort ist – Länge, Zeichenvielfalt und geschätzte Entropie. Komplett lokal, das Passwort wird nicht übertragen.',
    keywords: ['passwort stärke prüfen', 'passwort sicherheit testen', 'passwort entropie', 'wie sicher ist mein passwort', 'passwort checker'],
    intro:
      'Gib ein Passwort ein und erhalte eine Einschätzung seiner Stärke: Länge, enthaltene Zeichentypen und geschätzte Entropie in Bit. Die Prüfung läuft ausschließlich lokal in deinem Browser.',
    faq: [
      { q: 'Wird mein Passwort gespeichert?', a: 'Nein. Die Bewertung passiert nur in deinem Browser – nichts wird gesendet oder gespeichert.' },
      { q: 'Was ist Entropie?', a: 'Ein Maß für die Unvorhersehbarkeit. Je mehr Bit, desto mehr Versuche braucht ein Angreifer im Schnitt zum Erraten.' },
    ],
    related: ['kosten-pro-nutzung-rechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'bingo-zahlen-generator',
    category: 'alltag',
    title: 'Bingo-Zahlen-Generator',
    shortTitle: 'Bingo',
    description:
      'Bingo-Zahlen ziehen, ohne Wiederholung – wahlweise 1–75 (US) oder 1–90 (klassisch). Zieht eine neue Zahl pro Klick.',
    keywords: ['bingo zahlen generator', 'bingo ziehen online', 'bingo zufallszahlen', 'bingo nummern', 'bingo spiel zahlen'],
    intro:
      'Ziehe Bingo-Zahlen Stück für Stück oder alle auf einmal – ohne Wiederholung. Wähle den Zahlenbereich 1–75 oder 1–90. Bereits gezogene Zahlen werden angezeigt.',
    faq: [
      { q: '75 oder 90 Zahlen?', a: 'Das US-Bingo nutzt 1–75, das klassische (auch in Deutschland verbreitete) Bingo 1–90. Beides ist wählbar.' },
      { q: 'Kommt eine Zahl doppelt?', a: 'Nein, jede Zahl wird nur einmal gezogen, bis du neu startest.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'caesar-verschluesselung',
    category: 'technik',
    title: 'Caesar- & ROT13-Verschlüsselung',
    shortTitle: 'Caesar/ROT13',
    description:
      'Text mit der Caesar-Verschiebung verschlüsseln und entschlüsseln – frei wählbare Verschiebung oder klassisches ROT13.',
    keywords: ['caesar verschlüsselung', 'rot13 generator', 'text verschieben verschlüsseln', 'caesar chiffre', 'rot13 entschlüsseln'],
    intro:
      'Die Caesar-Chiffre verschiebt jeden Buchstaben um eine feste Anzahl im Alphabet. Stelle die Verschiebung ein (13 = ROT13) und ver- oder entschlüssele deinen Text direkt im Browser.',
    faq: [
      { q: 'Ist das sicher?', a: 'Nein. Die Caesar-Chiffre ist leicht zu knacken und nur für Rätsel, Lernzwecke oder Spaß gedacht.' },
      { q: 'Was ist ROT13?', a: 'ROT13 ist die Caesar-Verschiebung um 13. Da das Alphabet 26 Buchstaben hat, ist Ver- und Entschlüsselung identisch.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'binaer-text-uebersetzer',
    category: 'technik',
    title: 'Binär-Text-Übersetzer',
    shortTitle: 'Binär ↔ Text',
    description:
      'Text in Binärcode umwandeln und zurück – UTF-8-genau, in 8-Bit-Blöcken. Praktisch für Informatik, Rätsel und zum Lernen.',
    keywords: ['binär übersetzer', 'text in binär', 'binärcode entschlüsseln', 'text zu binär', 'binär in text'],
    intro:
      'Wandle Text in Binärcode (Nullen und Einsen) um oder übersetze Binärcode zurück in lesbaren Text. Die Umwandlung erfolgt UTF-8-genau, jedes Byte als 8-Bit-Block.',
    faq: [
      { q: 'Wie werden die Bytes getrennt?', a: 'Jedes Byte erscheint als 8-stelliger Block, getrennt durch ein Leerzeichen – so bleibt der Code eindeutig.' },
      { q: 'Funktionieren Umlaute und Emojis?', a: 'Ja. Der Text wird als UTF-8 kodiert, dadurch werden auch Mehrbyte-Zeichen korrekt übersetzt.' },
    ],
    related: ['zahlensystem-umrechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'timer-countdown',
    category: 'alltag',
    title: 'Timer & Countdown',
    shortTitle: 'Timer',
    description:
      'Online-Countdown stellen – Minuten und Sekunden eingeben, starten, pausieren. Mit Signalton am Ende. Für Kochen, Lernen und Sport.',
    keywords: ['online timer', 'countdown timer', 'eieruhr online', 'timer stellen', 'minuten timer'],
    intro:
      'Stelle Stunden, Minuten und Sekunden ein und starte den Countdown. Du kannst pausieren und zurücksetzen; am Ende ertönt ein kurzer Signalton. Praktisch fürs Kochen, Lernen oder Workouts.',
    faq: [
      { q: 'Läuft der Timer im Hintergrund weiter?', a: 'Solange der Tab geöffnet bleibt, ja. Bei manchen Browsern werden Hintergrund-Tabs gedrosselt – lass den Tab für genaue Zeit aktiv.' },
      { q: 'Kommt ein Ton?', a: 'Ja, am Ende ertönt ein kurzer Signalton (sofern dein Browser Audio zulässt).' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'monogramm-generator',
    category: 'alltag',
    title: 'Monogramm-Generator',
    shortTitle: 'Monogramm',
    description:
      'Initialen und Monogramme aus Namen erzeugen – verschiedene Stile und Reihenfolgen. Für Stickerei, Einladungen und Deko.',
    keywords: ['monogramm generator', 'initialen erstellen', 'monogramm erstellen', 'initialen monogramm', 'buchstaben monogramm'],
    intro:
      'Gib Vor-, Mittel- und Nachnamen ein und erhalte verschiedene Monogramm-Varianten (z. B. Reihenfolge und Hervorhebung des Nachnamens) zum Kopieren – ideal für Stickereien, Einladungen oder Geschenke.',
    faq: [
      { q: 'Welche Reihenfolge ist richtig?', a: 'Beim klassischen Monogramm steht der Nachname-Buchstabe größer in der Mitte, flankiert von Vor- und Mittelname. Beide gängigen Varianten werden angezeigt.' },
      { q: 'Kann ich nur zwei Namen nutzen?', a: 'Ja, der Mittelname ist optional – dann entsteht ein Zwei-Buchstaben-Monogramm.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'text-statistik',
    category: 'technik',
    title: 'Wörter & Zeichen zählen',
    shortTitle: 'Text-Statistik',
    description:
      'Zähle Wörter, Zeichen, Sätze und Absätze in deinem Text und sieh die geschätzte Lesezeit – live im Browser, nichts wird übertragen.',
    keywords: ['wörter zählen', 'zeichen zählen', 'text statistik', 'wortzähler', 'zeichen mit leerzeichen'],
    intro:
      'Füge deinen Text ein und sieh sofort die Anzahl Wörter, Zeichen (mit und ohne Leerzeichen), Sätze und Absätze sowie die geschätzte Lesezeit. Praktisch für Bewerbungen, Hausarbeiten, Social-Media-Limits und SEO.',
    faq: [
      { q: 'Werden Zeichen mit Leerzeichen gezählt?', a: 'Beides wird angezeigt: Zeichen mit und ohne Leerzeichen – viele Vorgaben (z. B. Honorare) beziehen sich auf eine der beiden Zählweisen.' },
      { q: 'Wie wird die Lesezeit berechnet?', a: 'Aus der Wortzahl bei rund 200 Wörtern pro Minute – ein üblicher Durchschnitt fürs stille Lesen.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'gross-klein-konverter',
    category: 'technik',
    title: 'Groß-/Kleinschreibung umwandeln',
    shortTitle: 'Groß/Klein',
    description:
      'Text in GROSSBUCHSTABEN, kleinbuchstaben, Title Case oder Satzanfang-Schreibung umwandeln – mit einem Klick kopierbar.',
    keywords: ['groß und kleinschreibung umwandeln', 'großbuchstaben umwandeln', 'text in kleinbuchstaben', 'title case generator', 'schreibweise ändern'],
    intro:
      'Wandle deinen Text in verschiedene Schreibweisen um: komplett groß, komplett klein, Wortanfänge groß (Title Case) oder nur Satzanfänge groß. Ideal für Überschriften, Listen und das Aufräumen kopierter Texte.',
    faq: [
      { q: 'Bleiben Umlaute erhalten?', a: 'Ja, ä/ö/ü und ß werden korrekt groß- bzw. kleingeschrieben.' },
      { q: 'Was ist Title Case?', a: 'Bei Title Case beginnt jedes Wort mit einem Großbuchstaben – häufig für Titel und Überschriften genutzt.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'slug-generator',
    category: 'technik',
    title: 'URL-Slug-Generator',
    shortTitle: 'Slug',
    description:
      'Aus einem Titel einen sauberen URL-Slug erzeugen – Kleinbuchstaben, Bindestriche, Umlaute aufgelöst. Für Webseiten, Blogs und SEO.',
    keywords: ['slug generator', 'url slug erstellen', 'permalink generator', 'url freundlich machen', 'slugify'],
    intro:
      'Gib einen Titel ein und erhalte einen suchmaschinenfreundlichen URL-Slug: alles klein, Leerzeichen zu Bindestrichen, Umlaute aufgelöst (ä→ae) und Sonderzeichen entfernt. Direkt kopierbar.',
    faq: [
      { q: 'Wie werden Umlaute behandelt?', a: 'Sie werden ausgeschrieben: ä→ae, ö→oe, ü→ue, ß→ss – so bleibt der Slug überall problemlos nutzbar.' },
      { q: 'Warum sind Slugs wichtig?', a: 'Klare, lesbare URLs helfen Nutzern und Suchmaschinen, den Seiteninhalt einzuordnen.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'json-formatter',
    category: 'technik',
    title: 'JSON formatieren & prüfen',
    shortTitle: 'JSON',
    description:
      'JSON einrücken (Pretty-Print) oder kompakt minifizieren und auf Gültigkeit prüfen – mit klarer Fehlermeldung. Lokal im Browser.',
    keywords: ['json formatter', 'json formatieren', 'json prüfen', 'json beautify', 'json validieren'],
    intro:
      'Füge JSON ein und lass es sauber einrücken oder kompakt minifizieren. Ist das JSON ungültig, bekommst du eine verständliche Fehlermeldung. Alles passiert lokal in deinem Browser.',
    faq: [
      { q: 'Werden meine Daten übertragen?', a: 'Nein. Das JSON wird nur in deinem Browser verarbeitet, nichts wird gesendet oder gespeichert.' },
      { q: 'Was bedeutet Minifizieren?', a: 'Alle überflüssigen Leerzeichen und Zeilenumbrüche werden entfernt – das spart Platz bei der Übertragung.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'wlan-qr-generator',
    category: 'technik',
    title: 'WLAN-QR-Code-Generator',
    shortTitle: 'WLAN-QR',
    description:
      'QR-Code fürs WLAN erstellen: Gäste scannen und sind verbunden, ohne das Passwort einzutippen. Lokal erzeugt, nichts wird übertragen.',
    keywords: ['wlan qr code', 'wifi qr code generator', 'wlan qr code erstellen', 'gäste wlan qr', 'wifi passwort qr'],
    intro:
      'Gib WLAN-Name (SSID), Passwort und Verschlüsselung ein und erhalte einen QR-Code. Wer ihn mit der Kamera scannt, verbindet sich automatisch – ideal fürs Gäste-WLAN. Die Erzeugung läuft komplett im Browser.',
    faq: [
      { q: 'Wie funktioniert das beim Scannen?', a: 'Der QR-Code enthält Netzwerkname, Verschlüsselungstyp und Passwort im Standardformat. Moderne Smartphones bieten beim Scannen direkt das Verbinden an.' },
      { q: 'Ist mein Passwort sicher?', a: 'Der QR-Code wird nur lokal erzeugt. Bedenke aber: Wer den QR-Code sieht oder scannt, kann sich verbinden – häng ihn nur dort auf, wo du das möchtest.' },
    ],
    related: ['stromkosten-rechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'farbkontrast-checker',
    category: 'technik',
    title: 'Farbkontrast-Checker (WCAG)',
    shortTitle: 'Kontrast',
    description:
      'Kontrastverhältnis zwischen Text- und Hintergrundfarbe prüfen – mit WCAG-Bewertung (AA/AAA) und Live-Vorschau. Für barrierearmes Webdesign.',
    keywords: ['farbkontrast prüfen', 'kontrast checker wcag', 'kontrastverhältnis berechnen', 'lesbarkeit farben', 'aa aaa kontrast'],
    intro:
      'Wähle Text- und Hintergrundfarbe und sieh das Kontrastverhältnis samt WCAG-Bewertung (AA und AAA für normalen und großen Text). Eine Live-Vorschau zeigt, wie lesbar die Kombination ist – wichtig für Barrierefreiheit.',
    faq: [
      { q: 'Was bedeutet AA und AAA?', a: 'WCAG-Stufen: AA verlangt mindestens 4,5:1 (großer Text 3:1), AAA mindestens 7:1. Je höher, desto besser lesbar.' },
      { q: 'Warum ist Kontrast wichtig?', a: 'Ausreichender Kontrast macht Texte für Menschen mit Sehschwäche und bei schlechten Lichtverhältnissen lesbar.' },
    ],
    related: ['hex-rgb-umrechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'emoji-picker',
    category: 'alltag',
    title: 'Emoji-Auswahl',
    shortTitle: 'Emojis',
    description:
      'Emojis durchsuchen und mit einem Klick kopieren – nach Kategorien sortiert. Für Chats, Social Media und Bios.',
    keywords: ['emoji kopieren', 'emojis zum kopieren', 'emoji liste', 'emoji picker', 'smileys kopieren'],
    intro:
      'Stöbere durch Emojis nach Kategorien oder suche nach einem Stichwort und kopiere dein Wunsch-Emoji mit einem Klick. Praktisch, wenn deine Tastatur keine Emoji-Auswahl hat.',
    faq: [
      { q: 'Funktionieren die Emojis überall?', a: 'Es sind Standard-Unicode-Emojis. Die Darstellung kann je nach Gerät und App leicht abweichen, der Code ist aber identisch.' },
      { q: 'Kann ich mehrere kopieren?', a: 'Klicke nacheinander – jedes geklickte Emoji wird in die Zwischenablage gelegt bzw. gesammelt.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'stoppuhr',
    category: 'alltag',
    title: 'Stoppuhr',
    shortTitle: 'Stoppuhr',
    description:
      'Online-Stoppuhr mit Start, Stopp und Rundenzeiten – auf die Hundertstelsekunde genau. Für Sport, Training und den Alltag.',
    keywords: ['stoppuhr online', 'online stoppuhr', 'stoppuhr mit runden', 'zeitmessung online', 'stoppuhr starten'],
    intro:
      'Starte und stoppe die Zeit auf die Hundertstelsekunde genau und nimm beliebig viele Rundenzeiten auf. Ideal fürs Training, zum Kochen oder für kleine Wettbewerbe – ganz ohne App.',
    faq: [
      { q: 'Wie genau ist die Stoppuhr?', a: 'Sie zeigt Hundertstelsekunden. Die tatsächliche Genauigkeit hängt von deinem Gerät und Browser ab, reicht aber für Alltag und Training locker.' },
      { q: 'Was sind Rundenzeiten?', a: 'Zwischenzeiten, die du per Klick festhältst, ohne die Uhr anzuhalten – praktisch für mehrere Durchgänge.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'pomodoro-timer',
    category: 'beruf',
    title: 'Pomodoro-Timer',
    shortTitle: 'Pomodoro',
    description:
      'Konzentriert arbeiten mit der Pomodoro-Technik: 25 Minuten Fokus, 5 Minuten Pause. Mit Zähler und Signalton – direkt im Browser.',
    keywords: ['pomodoro timer', 'pomodoro technik', 'fokus timer', '25 5 timer', 'lerntimer'],
    intro:
      'Die Pomodoro-Technik teilt Arbeit in 25-Minuten-Blöcke mit kurzen Pausen. Dieser Timer wechselt automatisch zwischen Fokus- und Pausenphasen, zählt die abgeschlossenen Einheiten und gibt am Ende jeder Phase einen Signalton. Längen sind anpassbar.',
    faq: [
      { q: 'Wie lang sind die Phasen?', a: 'Standard sind 25 Minuten Fokus und 5 Minuten Pause, nach vier Einheiten eine längere Pause. Du kannst die Zeiten anpassen.' },
      { q: 'Wofür ist Pomodoro gut?', a: 'Die festen Blöcke helfen gegen Aufschieben und Erschöpfung – konzentriertes Arbeiten mit eingeplanten Pausen.' },
    ],
    related: ['lerneinheiten-pomodoro-rechner'],
    updated: '2026-06-19',
  },
  {
    slug: 'fantasy-namensgenerator',
    category: 'alltag',
    title: 'Fantasy-Namen-Generator',
    shortTitle: 'Fantasy-Namen',
    description:
      'Namen für Fantasy-Charaktere, Rollenspiele und Games generieren – verschiedene Stile (elbisch, düster, drollig). Mit einem Klick kopierbar.',
    keywords: ['fantasy namen generator', 'rpg namen', 'charakter namen generator', 'gamer namen', 'rollenspiel namen'],
    intro:
      'Brauchst du einen Namen für einen Charakter in einem Rollenspiel, Roman oder Game? Wähle einen Stil und generiere so viele klangvolle Fantasy-Namen, wie du möchtest – jeder mit einem Klick kopierbar.',
    faq: [
      { q: 'Sind die Namen einzigartig?', a: 'Sie werden zufällig aus Silben zusammengesetzt, sodass viele verschiedene Varianten entstehen. Eine Garantie auf Einzigartigkeit gibt es nicht.' },
      { q: 'Kann ich den Stil wählen?', a: 'Ja, verschiedene Stile erzeugen unterschiedlich klingende Namen – von wohlklingend bis düster.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'tally-counter',
    category: 'alltag',
    title: 'Zähler / Strichliste',
    shortTitle: 'Zähler',
    description:
      'Einfacher Klick-Zähler für den Alltag – zählen, runterzählen, zurücksetzen. Für Inventur, Besucher, Wiederholungen und Spiele.',
    keywords: ['zähler online', 'strichliste online', 'klick zähler', 'counter online', 'tally counter'],
    intro:
      'Ein digitaler Handzähler: Tippe zum Hochzählen, optional auch runter, und setze bei Bedarf zurück. Praktisch für Inventur, das Zählen von Personen, Wiederholungen beim Sport oder Spielpunkte.',
    faq: [
      { q: 'Bleibt der Stand erhalten?', a: 'Solange die Seite geöffnet ist, ja. Beim Neuladen startet der Zähler wieder bei null.' },
      { q: 'Kann ich die Schrittweite ändern?', a: 'Standard ist +1 pro Klick; eine Schrittweite lässt sich einstellen, um z. B. in Zweierschritten zu zählen.' },
    ],
    updated: '2026-06-19',
  },
  {
    slug: 'countdown-event',
    category: 'alltag',
    title: 'Countdown bis Datum',
    shortTitle: 'Countdown',
    description:
      'Live-Countdown bis zu einem Datum und einer Uhrzeit – Tage, Stunden, Minuten, Sekunden ticken mit. Für Urlaub, Geburtstag und Events.',
    keywords: ['countdown erstellen', 'countdown bis datum', 'tage countdown', 'event countdown', 'countdown timer datum'],
    intro:
      'Wähle ein Zieldatum und eine Uhrzeit und sieh den Countdown live herunterticken – in Tagen, Stunden, Minuten und Sekunden. Ideal für Urlaub, Geburtstage, Feiertage oder den nächsten großen Termin.',
    faq: [
      { q: 'Tickt der Countdown live?', a: 'Ja, die Anzeige aktualisiert sich jede Sekunde, solange die Seite geöffnet ist.' },
      { q: 'Was passiert nach dem Ziel?', a: 'Ist das Datum erreicht, zeigt der Countdown, dass das Ereignis da ist bzw. wie lange es her ist.' },
    ],
    related: ['tage-bis-rechner'],
    updated: '2026-06-19',
  },
];

export function getGenerator(slug: string): GeneratorMeta | undefined {
  return GENERATORS.find((g) => g.slug === slug);
}
