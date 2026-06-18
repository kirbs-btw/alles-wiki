/**
 * Kern-Datenmodell der Tool-Engine.
 * Jeder Rechner ist ein Modul, das `export const tool: Tool = {...}` bereitstellt.
 * `compute` ist eine PURE Funktion (server- und clientseitig identisch ausführbar, testbar).
 */

export type CategorySlug =
  | 'finanzen'
  | 'gesundheit'
  | 'auto'
  | 'wohnen'
  | 'recht'
  | 'familie'
  | 'beruf'
  | 'bildung'
  | 'energie'
  | 'mathe'
  | 'alltag'
  | 'technik';

export interface NumberInput {
  type: 'number';
  id: string;
  label: string;
  default: number;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
}

export interface SelectInput {
  type: 'select';
  id: string;
  label: string;
  default: string;
  options: { value: string; label: string }[];
  unit?: string;
  help?: string;
}

export interface DateInput {
  type: 'date';
  id: string;
  label: string;
  /** ISO-Datum YYYY-MM-DD. */
  default: string;
  min?: string;
  max?: string;
  help?: string;
  /** Wenn true, befüllt der Client das Feld initial mit dem heutigen Datum (z. B. Stichtag „heute"). */
  today?: boolean;
}

export type ToolInput = NumberInput | SelectInput | DateInput;

export type InputValues = Record<string, number | string>;

export interface ToolResult {
  label: string;
  /** Zahlen werden de-DE formatiert; Strings werden unverändert ausgegeben. */
  value: number | string;
  unit?: string;
  /** Nachkommastellen bei Zahlen (Default 2). */
  digits?: number;
  /** Hauptergebnis (hervorgehoben). */
  primary?: boolean;
  help?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ToolExample {
  values: InputValues;
  /** Erwartete Ergebnisse (per Label gematcht). */
  expect: { label: string; value: number; tolerance?: number }[];
}

export interface Tool {
  slug: string;
  category: CategorySlug;
  /** H1 / Titel-Kern, z. B. "Filament-Kosten-Rechner". */
  title: string;
  /** Kurzer Titel für Karten/Navigation. */
  shortTitle?: string;
  /** Meta-Description + Intro-Teaser (1–2 Sätze, ~150 Zeichen). */
  description: string;
  /** Such-Keywords (für interne Verlinkung & Relevanz). */
  keywords: string[];
  inputs: ToolInput[];
  compute: (v: InputValues) => ToolResult[];
  /** Längere Einleitung (HTML erlaubt) – erscheint über/unter dem Rechner. */
  intro?: string;
  /** Schritt-für-Schritt Anleitung (HowTo-Schema). */
  howto?: string[];
  /** Formel-Hinweis (Mono dargestellt). */
  formula?: string;
  faq?: FaqItem[];
  /** Verwandte Tools (Slugs) für interne Verlinkung. */
  related?: string[];
  /** Testfälle (werden automatisch geprüft). */
  examples?: ToolExample[];
  /** ISO-Datum der letzten Aktualisierung. */
  updated?: string;
}

/** Hilfsfunktion für saubere number-Inputs in compute. */
export function num(v: number | string, fallback = 0): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : fallback;
}

/** ISO-String/Date -> Date (Mitternacht UTC, stabil & deterministisch). Ungültig -> null. */
export function toDate(v: number | string): Date | null {
  if (v instanceof Date) return v;
  const s = String(v).trim();
  if (!s) return null;
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? s + 'T00:00:00Z' : s);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Ganze Tage zwischen a und b (b - a). Ungültige Daten -> 0. */
export function daysBetween(a: number | string, b: number | string): number {
  const da = toDate(a);
  const db = toDate(b);
  if (!da || !db) return 0;
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

/** Differenz als {years, months, days} (immer >= 0, Reihenfolge egal). Für Alter, Zeitspannen. */
export function diffYMD(
  a: number | string,
  b: number | string,
): { years: number; months: number; days: number } {
  let da = toDate(a);
  let db = toDate(b);
  if (!da || !db) return { years: 0, months: 0, days: 0 };
  if (db < da) [da, db] = [db, da];
  let years = db.getUTCFullYear() - da.getUTCFullYear();
  let months = db.getUTCMonth() - da.getUTCMonth();
  let days = db.getUTCDate() - da.getUTCDate();
  if (days < 0) {
    months -= 1;
    days += new Date(Date.UTC(db.getUTCFullYear(), db.getUTCMonth(), 0)).getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}
