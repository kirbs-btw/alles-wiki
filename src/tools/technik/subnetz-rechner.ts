import type { Tool } from '../../lib/types';
import { num } from '../../lib/types';

// Wandelt eine CIDR-Präfixlänge in die punktierte Subnetzmaske um.
function maskeAusCidr(cidr: number): string {
  const bits = Math.max(0, Math.min(32, Math.round(cidr)));
  // 32-Bit-Maske als vorzeichenlose Zahl, dann in vier Oktette zerlegen.
  const maske = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
  const o1 = (maske >>> 24) & 0xff;
  const o2 = (maske >>> 16) & 0xff;
  const o3 = (maske >>> 8) & 0xff;
  const o4 = maske & 0xff;
  return `${o1}.${o2}.${o3}.${o4}`;
}

export const tool: Tool = {
  slug: 'subnetz-rechner',
  category: 'technik',
  title: 'Subnetz-Rechner (CIDR)',
  shortTitle: 'Subnetz',
  description:
    'Berechne aus der CIDR-Präfixlänge die Subnetzmaske, die Gesamtzahl der IP-Adressen und die Anzahl nutzbarer Hosts pro Netz.',
  keywords: [
    'subnetz rechner',
    'cidr rechner',
    'subnetzmaske berechnen',
    'nutzbare hosts berechnen',
    'ip adressen pro subnetz',
    'netzmaske cidr',
  ],
  formula:
    'Hostbits = 32 - CIDR; Adressen = 2^Hostbits; nutzbare Hosts = Adressen - 2 (Netz- und Broadcast-Adresse)',
  inputs: [
    {
      type: 'number',
      id: 'cidr',
      label: 'CIDR-Präfix',
      unit: '/',
      default: 24,
      min: 0,
      max: 32,
      step: 1,
      help: 'Anzahl der für das Netz reservierten Bits, z. B. 24 für /24.',
    },
  ],
  compute: (v) => {
    const cidr = Math.max(0, Math.min(32, Math.round(num(v.cidr))));
    const hostbits = 32 - cidr;
    const adressen = Math.pow(2, hostbits);
    // Bei /31 und /32 gibt es keine klassisch nutzbaren Hosts.
    const nutzbar = hostbits >= 2 ? adressen - 2 : 0;
    return [
      { label: 'Nutzbare Hosts', value: nutzbar, digits: 0, primary: true },
      { label: 'IP-Adressen gesamt', value: adressen, digits: 0 },
      { label: 'Host-Bits', value: hostbits, digits: 0 },
      { label: 'Subnetzmaske', value: maskeAusCidr(cidr) },
    ];
  },
  intro:
    'Die CIDR-Notation (z. B. 192.168.0.0/24) gibt mit der Präfixlänge an, wie viele führende Bits einer IPv4-Adresse das Netz bestimmen. Die restlichen Bits adressieren die einzelnen Hosts. Dieser Rechner zeigt die zugehörige Subnetzmaske, die Gesamtzahl der Adressen sowie die Hosts, die tatsächlich für Geräte genutzt werden können – Netz- und Broadcast-Adresse zählen dabei nicht mit.',
  howto: [
    'Die CIDR-Präfixlänge eingeben (0 bis 32), z. B. 24 für ein typisches Heimnetz.',
    'Die Anzahl nutzbarer Hosts als Hauptergebnis ablesen.',
    'Subnetzmaske und Gesamtzahl der Adressen zur Kontrolle prüfen.',
  ],
  faq: [
    {
      q: 'Warum werden zwei Adressen abgezogen?',
      a: 'Pro Subnetz sind die erste Adresse (Netzadresse) und die letzte Adresse (Broadcast) reserviert und können nicht an einzelne Geräte vergeben werden. Daher gilt nutzbare Hosts = 2^Hostbits − 2.',
    },
    {
      q: 'Was bedeutet /24?',
      a: '/24 heißt, dass 24 der 32 Bit das Netz festlegen. Es bleiben 8 Hostbits, also 256 Adressen und 254 nutzbare Hosts. Die Maske lautet 255.255.255.0.',
    },
    {
      q: 'Was gilt bei /31 und /32?',
      a: 'Ein /32 beschreibt eine einzelne Host-Route, ein /31 wird für Punkt-zu-Punkt-Verbindungen genutzt. Klassisch nutzbare Hosts im Sinne der Formel gibt es dort nicht, daher wird hier 0 ausgegeben.',
    },
  ],
  related: ['bit-byte-umrechner', 'zahlensystem-umrechner', 'datenrate-umrechner'],
  updated: '2026-06-18',
  examples: [
    {
      values: { cidr: 24 },
      expect: [
        { label: 'Nutzbare Hosts', value: 254, tolerance: 0 },
        { label: 'IP-Adressen gesamt', value: 256, tolerance: 0 },
      ],
    },
    {
      values: { cidr: 30 },
      expect: [{ label: 'Nutzbare Hosts', value: 2, tolerance: 0 }],
    },
  ],
};
