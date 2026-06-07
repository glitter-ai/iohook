'use strict';

// Downloads the prebuilt N-API addon for this platform/arch from the matching GitHub
// release and extracts it into builds/<platform>-<arch>/. The binary is ABI-stable, so a
// single prebuild per platform/arch serves every Node/Electron version with N-API >= 9.

const os = require('os');
const fs = require('fs');
const path = require('path');
const nugget = require('nugget');
const rc = require('rc');
const tar = require('tar');
const pkg = require('./package.json');

const platformDir = `${process.platform}-${process.arch}`;
const tarName = `iohook-v${pkg.version}-${platformDir}.tar.gz`;
const url = `https://github.com/glitter-ai/iohook/releases/download/v${pkg.version}/${tarName}`;

const opts = { dir: os.tmpdir(), target: tarName, strictSSL: true };
const npmrc = {};
try {
  rc('npm', npmrc);
} catch (error) {
  console.warn(`Error reading npm configuration: ${error.message}`);
}
if (npmrc.proxy) opts.proxy = npmrc.proxy;
if (npmrc['https-proxy']) opts.proxy = npmrc['https-proxy'];
if (npmrc['strict-ssl'] === false) opts.strictSSL = false;

console.log(`Downloading iohook prebuild: ${tarName}`);
nugget(url, opts, (errors) => {
  if (errors) {
    // don't hard-fail the install; index.js surfaces a clear error if the binary is missing at runtime
    console.error(`Could not download iohook prebuild (${tarName}): ${errors[0].message}`);
    console.error('Build it locally with: cd node_modules/iohook && npm run build');
    return;
  }
  const buildsDir = path.join(__dirname, 'builds');
  fs.mkdirSync(buildsDir, { recursive: true });
  tar.x({ file: path.join(opts.dir, tarName), cwd: buildsDir, sync: true });
  console.log(`Installed iohook prebuild to builds/${platformDir}`);
});
