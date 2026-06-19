import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

export const tool: Tool = {
  slug: 'midijob-uebergangsbereich-rechner',
  category: 'beruf',
  title: 'Midijob-Rechner (Übergangsbereich / Gleitzone)',
  shortTitle: 'Midijob',
  description:
    'Schätze deinen reduzierten Arbeitnehmer-Beitragsanteil im Midijob-Übergangsbereich (Stand 2026: 556,01 € bis 2.000 €) – inklusive Ersparnis gegenüber dem vollen Beitrag.',
  keywords: [
    'midijob rechner',
    'übergangsbereich rechner',
    'gleitzone rechner',
    'midijob beitrag berechnen',
    'reduzierter sozialversicherungsbeitrag',
    'midijob 2000 euro',
  ],
  formula:
    'AN-Bemessung steigt linear von F×Untergrenze (F≈0,68) bis zum vollen Lohn an der Obergrenze ; AN-Beitrag = Bemessung × Beitragssatz (Näherung)',
  inputs: [
    { type: 'number', id: 'lohn', label: 'Monatslohn (brutto)', unit: '€', default: 1300, min: 0, step: 10, help: 'Übergangsbereich Stand 2026: 556,01 € bis 2.000 €.' },
    { type: 'number', id: 'svSatz', label: 'Voller AN-Beitragssatz (gesamt SV)', unit: '%', default: 20, min: 0, max: 30, step: 0.1, help: 'Summe aus RV, KV, PV, AV (Arbeitnehmer-Anteil, grob ~20–21 %).' },
    { type: 'number', id: 'untergrenze', label: 'Untere Grenze Übergangsbereich', unit: '€', default: 556.01, min: 0, step: 0.01 },
    { type: 'number', id: 'obergrenze', label: 'Obere Grenze Übergangsbereich', unit: '€', default: 2000, min: 1, step: 10 },
    { type: 'number', id: 'faktorF', label: 'Faktor F (Startentlastung)', unit: '', default: 0.68, min: 0.1, max: 1, step: 0.01, help: 'Vereinfachter Entlastungsfaktor an der Untergrenze (amtlicher F-Wert, Näherung).' },
  ],
  compute: (v) => {
    const lohn = num(v.lohn);
    const satz = num(v.svSatz) / 100;
    const ug = num(v.untergrenze);
    const og = num(v.obergrenze);
    const F = num(v.faktorF, 0.68);

    // Voller AN-Beitrag ohne Entlastung
    const vollerBeitrag = lohn * satz;

    let bemessung = lohn;
    let imBereich = false;
    if (lohn > ug && lohn <= og && og > ug) {
      imBereich = true;
      // Lineare Interpolation der beitragspflichtigen AN-Bemessung:
      // an der Untergrenze = F × Untergrenze, an der Obergrenze = voller Lohn (Obergrenze).
      const anUg = F * ug;
      bemessung = anUg + ((og - anUg) / (og - ug)) * (lohn - ug);
    }

    const reduzierterBeitrag = imBereich ? bemessung * satz : vollerBeitrag;
    const ersparnis = vollerBeitrag - reduzierterBeitrag;

    return [
      { label: 'Reduzierter AN-Beitrag (Näherung)', value: reduzierterBeitrag, unit: '€', digits: 2, primary: true, help: 'Geschätzter Arbeitnehmer-Anteil im Übergangsbereich. Orientierungswert, Stand 2026.' },
      { label: 'Voller AN-Beitrag ohne Entlastung', value: vollerBeitrag, unit: '€', digits: 2 },
      { label: 'Beitragsersparnis pro Monat', value: ersparnis, unit: '€', digits: 2, help: 'Differenz durch die Midijob-Regelung.' },
      { label: 'Im Übergangsbereich?', value: imBereich ? 'Ja' : 'Nein' },
    ];
  },
  intro:
    'Im Midijob-Übergangsbereich (früher Gleitzone) zahlst du als Arbeitnehmer reduzierte Sozialversicherungsbeiträge: An der unteren Grenze liegt deine beitragspflichtige Bemessung deutlich unter dem Lohn und steigt bis zur oberen Grenze linear bis zum vollen Lohn an. Stand 2026 reicht der Bereich von 556,01 € bis 2.000 € im Monat. Dieser Rechner liefert eine vereinfachte Näherung deines entlasteten Beitragsanteils – die exakte Berechnung erfolgt über die amtliche SV-Formel des jeweiligen Jahres.',
  howto: [
    'Trage deinen monatlichen Bruttolohn ein.',
    'Prüfe den vollen Arbeitnehmer-Beitragssatz (Summe aus RV, KV, PV, AV).',
    'Belasse die Grenzen des Übergangsbereichs und den Faktor F oder passe sie an.',
    'Lies den geschätzten reduzierten Beitrag und deine Ersparnis ab.',
  ],
  faq: [
    { q: 'Was ist der Übergangsbereich?', a: 'Der Übergangsbereich (Midijob, früher Gleitzone) ist der Lohnkorridor knapp oberhalb des Minijobs. Hier zahlen Arbeitnehmer reduzierte SV-Beiträge, behalten aber den vollen Sozialversicherungsschutz. Stand 2026: 556,01 € bis 2.000 €.' },
    { q: 'Ist das Ergebnis exakt?', a: 'Nein, es ist eine Näherung zur Orientierung (Stand 2026). Die amtliche Berechnung nutzt eine jährlich festgelegte Formel mit dem Faktor F, der sich aus dem Gesamtsozialversicherungsbeitragssatz ergibt. Maßgeblich ist die Lohnabrechnung.' },
    { q: 'Sinken auch die Leistungen?', a: 'Beim Rentenanspruch wird der volle Lohn zugrunde gelegt, sodass keine Nachteile bei der Rente entstehen. Nur dein Beitragsanteil ist reduziert.' },
    { q: 'Was zahlt der Arbeitgeber?', a: 'Der Arbeitgeber trägt im Übergangsbereich den größeren Beitragsanteil. Seine Belastung ist höher als beim Arbeitnehmer und gleicht die Entlastung teilweise aus.' },
  ],
  related: ['minijob-stunden-rechner', 'werkstudent-stunden-rechner', 'netto-stundenlohn-rechner'],
  updated: '2026-06-19',
  examples: [
    {
      values: { lohn: 1000, svSatz: 20, untergrenze: 556.01, obergrenze: 2000, faktorF: 0.68 },
      expect: [
        { label: 'Voller AN-Beitrag ohne Entlastung', value: 200, tolerance: 0.01 },
        { label: 'Reduzierter AN-Beitrag (Näherung)', value: 175.36, tolerance: 0.05 },
      ],
    },
  ],
};
