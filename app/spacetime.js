const { homedir } = require('os');
const { join } = require('path');

const spacetime = join(
   homedir(),
   process.platform === 'darwin'
      ? 'Library/Preferences/spacetime'
      : process.platform === 'win32'
      ? 'AppData/Roaming/spacetime'
      : '.config/spacetime'
);

module.exports = {
   open: process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer' : 'xdg-open',
   spacetime,
   mods: join(spacetime, 'mods'),
   universe: join(spacetime, 'universe.json'),
   universe_backup: join(spacetime, 'universe.backup.json')
};
