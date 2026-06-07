const path = require('path');

function printManualBuildParams() {
  const platformDir = `${process.platform}-${process.arch}`;
  const modulePath = path.join(__dirname, 'builds', platformDir, 'iohook.node');
  console.info(`Platform: ${process.platform} ARCH: ${process.arch}`);
  console.info('The path is:', modulePath);
}

module.exports = { printManualBuildParams };
