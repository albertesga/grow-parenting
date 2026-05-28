#!/usr/bin/env node

import { execSync } from 'node:child_process';

const REPO_ROOT = '../../';
const SOURCE_SCOPE = 'apps/about-us';
const EXPORT_SCOPE = 'homepage/about-us';
const EXCLUDED_SOURCE_PATTERNS = [
  'apps/about-us/README.md',
  'apps/about-us/package-lock.json',
];

function getChangedFiles(scope) {
  try {
    const output = execSync(`git -C "${REPO_ROOT}" diff --name-only HEAD -- "${scope}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return output
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  } catch (error) {
    const stderr = String(error.stderr || '').trim();
    const message = stderr || 'No se pudo inspeccionar git diff.';
    console.error(`ERROR: ${message}`);
    process.exit(1);
  }
}

const changedSource = getChangedFiles(SOURCE_SCOPE).filter((file) => {
  return !EXCLUDED_SOURCE_PATTERNS.includes(file);
});
const changedExport = getChangedFiles(EXPORT_SCOPE);

if (changedSource.length > 0 && changedExport.length === 0) {
  console.error('ERROR: Cambiaste source de apps/about-us sin regenerar homepage/about-us.');
  console.error('Ejecuta: cd apps/about-us && npm run build');
  process.exit(1);
}

console.log('OK: source/export de about-us están sincronizados o sin cambios relevantes.');
