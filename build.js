// Builds the N-API addon for the host platform/arch and packages it as
// prebuilds/iohook-v<version>-<platform>-<arch>.tar.gz. The binary is ABI-stable
// (N-API), so one build per platform/arch works on every Node/Electron with N-API >= 9.
// CI uploads the tarball to the matching GitHub release; install.js downloads it.

const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const tar = require('tar');
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');

const platform = process.platform;
const arch = process.env.ARCH
  ? process.env.ARCH.replace('i686', 'ia32').replace('x86_64', 'x64')
  : process.arch;
const platformDir = `${platform}-${arch}`;

const SHARED_LIB = { darwin: 'uiohook.dylib', win32: 'uiohook.dll', linux: 'uiohook.so' };

// cpGyp: copy the platform-specific gyp files to the project root where node-gyp expects them
function copyGyp() {
  const src = path.join(__dirname, 'build_def', platform);
  fs.copySync(path.join(src, 'binding.gyp'), path.join(__dirname, 'binding.gyp'));
  fs.copySync(path.join(src, 'uiohook.gyp'), path.join(__dirname, 'uiohook.gyp'));
}

function build() {
  const gyp = path.join(__dirname, 'node_modules', '.bin', platform === 'win32' ? 'node-gyp.cmd' : 'node-gyp');
  const args = ['configure', 'rebuild', `--arch=${arch}`];
  if (platform === 'win32') {
    args.push(`--msvs_version=${argv.msvs_version || 2022}`);
  }
  console.log(`Building iohook (N-API) for ${platformDir}`);
  execSync(`${gyp} ${args.join(' ')}`, { stdio: 'inherit', env: process.env });
}

// stage the loadable module + its shared library side by side so the rpath (@loader_path / $ORIGIN) resolves
function stage() {
  const dest = path.join(__dirname, 'builds', platformDir);
  fs.emptyDirSync(dest);
  const release = path.join(__dirname, 'build', 'Release');
  fs.copySync(path.join(release, 'iohook.node'), path.join(dest, 'iohook.node'));
  fs.copySync(path.join(release, SHARED_LIB[platform]), path.join(dest, SHARED_LIB[platform]));
  return dest;
}

function pack() {
  const dir = path.join(__dirname, 'prebuilds');
  fs.ensureDirSync(dir);
  const file = path.join(dir, `iohook-v${pkg.version}-${platformDir}.tar.gz`);
  tar.c({ gzip: true, file, sync: true, cwd: path.join(__dirname, 'builds') }, [platformDir]);
  console.log(`Packaged ${file}`);
}

copyGyp();
build();
stage();
pack();
