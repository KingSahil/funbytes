const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// ─── 1. Watch the whole monorepo ───────────────────────────────────────────
config.watchFolders = [monorepoRoot];

// ─── 2. Resolve order: app node_modules FIRST, then monorepo root ──────────
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;

