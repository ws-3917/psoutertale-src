const { spawn } = require('child_process');
const { app, BrowserWindow, dialog, ipcMain, Menu, protocol } = require('electron');
const { existsSync, readdirSync, statSync } = require('fs');
const { readFile, writeFile } = require('fs/promises');
const { join } = require('path');
const { mods, open } = require('./spacetime.js');

const state = {
   f4 () {
      state.window.setFullScreen((state.fullscreen = !state.fullscreen));
      if (state.pad !== void 0) {
         state.restore(state.pad);
         state.pad = void 0;
      }
   },
   fullscreen: false,
   init () {
      state.window = new BrowserWindow({
         height: 480,
         icon: './icon.png',
         title: 'OUTERTALE',
         useContentSize: process.platform === 'win32',
         webPreferences: {
            disableDialogs: true,
            disableHtmlFullscreenWindowResize: true,
            enableWebSQL: false,
            nodeIntegration: true,
            preload: `${__dirname}/preload.js`,
            spellcheck: false
         },
         width: 640,
         x: state.position?.[0],
         y: state.position?.[1]
      });
      state.window.on('closed', () => {
         state.window = null;
      });
      state.window?.webContents.on('before-input-event', (_, { key, type }) => {
         state.window && type === 'keyDown' && (key === 'F4' || key === 'F11') && state.f4();
      });
      state.window.webContents.on('will-navigate', event => {
         event.preventDefault();
      });
      const port = process.argv.find(arg => arg.length !== 0 && !Number.isNaN(+arg));
      const page = process.argv.includes('dialoguer')
         ? 'dialoguer'
         : process.argv.includes('editor')
         ? 'editor'
         : process.argv.includes('soundtest')
         ? 'soundtest'
         : 'index';
      if (port === void 0) {
         state.window.loadFile(`./assets/${page}.html`);
      } else {
         state.window.loadURL(`http://localhost:${port}/${page}.html`);
      }
      state.size = state.window.getSize();
      process.argv.includes('devtools') && state.window.webContents.openDevTools();
   },
   /** @type {number | void} */
   pad: 0,
   /** @type {number[] | void} */
   position: void 0,
   reload: false,
   respawn: false,
   /** @param {number} pad */
   restore (pad) {
      if (state.fullscreen) {
         state.pad = pad;
      } else {
         state.window?.setSize(state.size[0] + pad, state.size[1], true);
      }
   },
   /** @type {number[]} */
   size: [],
   /** @type {BrowserWindow | void} */
   window: void 0
};

app.on('ready', () => {
   protocol.registerFileProtocol('mods', (request, callback) => {
      try {
         if (existsSync(mods)) {
            let path = mods;
            for (const name of new URL(request.url).pathname.split('/')) {
               if (readdirSync(path).includes(name)) {
                  path = join(path, name);
                  if (existsSync(path)) {
                     const stat = statSync(path);
                     if (stat.isDirectory()) {
                        continue;
                     } else if (stat.isFile()) {
                        callback(path);
                        return;
                     }
                  }
               }
               break;
            }
         }
      } catch {}
      callback({});
   });
   state.init();
});

app.on('activate', () => {
   state.window ? state.window.focus() : state.init();
});

app.on('window-all-closed', () => {
   state.reload || app.exit();
});

ipcMain.handle('dialog.message', async (_, error, { buttons, message, title }) => {
   return (await dialog.showMessageBox(state.window, { buttons, title, message, type: error ? 'error' : 'question' }))
      .response;
});

ipcMain.handle('dialog.open', async (_, { buttonLabel, name, title }) => {
   const { filePaths } = await dialog.showOpenDialog(state.window, {
      buttonLabel,
      defaultPath: 'universe.json',
      filters: [ { name, extensions: [ 'json' ] } ],
      properties: [ 'createDirectory', 'showHiddenFiles', 'openFile' ],
      title
   });
   if (filePaths.length > 0) {
      try {
         return (await readFile(filePaths[0])).toString();
      } catch {
         return null;
      }
   } else {
      return null;
   }
});

ipcMain.handle('dialog.save', async (_, data, { buttonLabel, name, title }) => {
   const { filePath } = await dialog.showSaveDialog(state.window, {
      buttonLabel,
      defaultPath: 'universe.json',
      filters: [ { name, extensions: [ 'json' ] } ],
      properties: [ 'createDirectory', 'showHiddenFiles', 'showOverwriteConfirmation' ],
      title
   });
   if (filePath) {
      await writeFile(filePath, data);
      return true;
   } else {
      return false;
   }
});

ipcMain.handle('devtools', (_, value) => {
   switch (value) {
      case true:
         state.window.webContents.openDevTools();
         break;
      case false:
         state.window.webContents.closeDevTools();
         break;
      default:
         state.window.webContents.toggleDevTools();
   }
});

ipcMain.handle('f4', () => {
   state.f4();
});

ipcMain.handle('mods', () => {
   spawn(open, [ mods ], { detached: true }).unref();
});

ipcMain.handle('pad', (_, value) => {
   state.restore(value);
});

ipcMain.handle('reload', () => {
   state.window?.reload();
});

Menu.setApplicationMenu(null);

protocol.registerSchemesAsPrivileged([ { scheme: 'mods', privileges: { supportFetchAPI: true } } ]);
