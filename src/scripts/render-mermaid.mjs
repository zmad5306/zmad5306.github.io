/**
 * Pre-renders src/diagrams/*.mmd to assets/images/diagrams/*.svg using
 * mermaid-cli, themed to the site palette. Run locally when a diagram
 * changes (`npm run mermaid`) and commit the SVGs — nothing renders at
 * runtime and the CI build doesn't need a browser.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, writeFileSync, rmSync } from 'node:fs';
import { join, basename } from 'node:path';

const SRC = 'src/diagrams';
const OUT = 'assets/images/diagrams';

const themeConfig = {
  theme: 'base',
  themeVariables: {
    background: '#13111c',
    primaryColor: '#1b1826',
    primaryTextColor: '#e6e3ee',
    primaryBorderColor: '#4b3a9e',
    lineColor: '#8e8aa0',
    secondaryColor: '#2e2456',
    tertiaryColor: '#201c2e',
    clusterBkg: '#0a0912',
    clusterBorder: '#2a2438',
    edgeLabelBackground: '#1b1826',
    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
    fontSize: '14px',
  },
};

mkdirSync(OUT, { recursive: true });
const configPath = join(SRC, '.mermaid-config.json');
writeFileSync(configPath, JSON.stringify(themeConfig));

try {
  const files = readdirSync(SRC).filter((f) => f.endsWith('.mmd'));
  if (files.length === 0) {
    console.log('No .mmd files in', SRC);
  }
  for (const file of files) {
    const out = join(OUT, basename(file, '.mmd') + '.svg');
    console.log(`${join(SRC, file)} -> ${out}`);
    execFileSync(
      'npx',
      ['-y', '@mermaid-js/mermaid-cli', '-i', join(SRC, file), '-o', out, '-c', configPath, '-b', 'transparent'],
      { stdio: 'inherit' }
    );
  }
} finally {
  rmSync(configPath, { force: true });
}
