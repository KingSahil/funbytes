const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const { escapeStringRegexp } = require('metro-config/src/defaults/validConfig');

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

// ─── 3. Block the ROOT node_modules copies of singleton packages ───────────
//    This forces Metro to use ONLY the app-local versions of these packages,
//    fixing the "Unable to resolve ../../App from AppEntry.js" error that
//    occurs when the monorepo root's expo is picked up instead of the app's.
const rootNodeModules = path.resolve(monorepoRoot, 'node_modules');
const packagesToBlock = [
  'expo',
  'expo-router',
  'react',
  'react-native',
  'react-native-web',
];

const blockListPatterns = packagesToBlock.map(
  (pkg) =>
    new RegExp(
      `^${rootNodeModules.replace(/\\/g, '\\\\').replace(/\//g, '/')}[\\\\/]${pkg}[\\\\/]`
    )
);

config.resolver.blockList = blockListPatterns;

module.exports = config;
