#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const repoRoot = '/Users/titoespanolgamon/Documents/Vibe Coding/Grow';
const dsPath = `${repoRoot}/design/Grow Design System v0.2.html`;
const prototypePath = `${repoRoot}/prototype.html`;

const ds = readFileSync(dsPath, 'utf8');
const proto = readFileSync(prototypePath, 'utf8');

const requiredSelectors = [
  '.book-hero',
  '.chip',
  '.chip.active',
  '.chip.premium',
  '.phone-nav',
  '.module-section',
  '.module-status-card',
  '.module-plan-card',
];

const missingInDS = requiredSelectors.filter((selector) => !ds.includes(selector));
const missingInPrototype = requiredSelectors.filter((selector) => !proto.includes(selector));

const hasGlobalChipNth = /^\s*\.chip:nth-child\(/m.test(proto);
const legacyHeroSection = /<section class="(?:milestone|vaccine|pregnancy|sleep|food|lactation)-hero/.test(proto);

let hasError = false;

if (missingInDS.length > 0) {
  hasError = true;
  console.error(`ERROR: Selectores canon ausentes en DS: ${missingInDS.join(', ')}`);
}

if (missingInPrototype.length > 0) {
  hasError = true;
  console.error(`ERROR: Selectores canon ausentes en prototype: ${missingInPrototype.join(', ')}`);
}

if (hasGlobalChipNth) {
  hasError = true;
  console.error('ERROR: Detectado tilt global via `.chip:nth-child(...)`; usa scope de strip.');
}

if (legacyHeroSection) {
  console.warn('WARN: Hay `<section class=\"*-hero\">` legacy en markup; recomienda migrar a `.book-hero`.');
}

if (hasError) {
  process.exit(1);
}

console.log('OK: chequeo DS↔prototype sin drift bloqueante.');
