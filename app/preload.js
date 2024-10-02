const { contextBridge, ipcRenderer } = require('electron');
const {
   copyFileSync,
   existsSync,
   mkdirSync,
   readdirSync,
   readFileSync,
   renameSync,
   rmSync,
   statSync,
   writeFileSync
} = require('fs');
const { join } = require('path');
const { mods, spacetime, universe, universe_backup } = require('./spacetime.js');

mkdirSync(mods, { recursive: true });

((input, loop) => loop(input, loop))('code', (input, loop) => {
   const path = `${__dirname}/${input}`;
   const stat = statSync(path);
   if (stat.isFile()) {
      copyFileSync(path, join(spacetime, input));
   } else if (stat.isDirectory()) {
      mkdirSync(join(spacetime, input), { recursive: true });
      for (const name of readdirSync(path)) {
         loop(`${input}/${name}`, loop);
      }
   }
});

contextBridge.exposeInMainWorld('___spacetime___', {
   data () {
      if (existsSync(universe) && statSync(universe).isFile()) {
         const contents = readFileSync(universe).toString();
         if (contents.length !== 0) {
            try {
               void JSON.parse(contents);
               return contents;
            } catch {}
         }
      }
      if (existsSync(universe_backup) && statSync(universe_backup).isFile()) {
         const contents = readFileSync(universe_backup).toString();
         if (contents.length !== 0) {
            try {
               void JSON.parse(contents);
               return contents;
            } catch {}
         }
      }
      return null;
   },
   exec (...args) {
      return ipcRenderer.invoke(...args);
   },
   mods () {
      if (existsSync(mods) && statSync(mods).isDirectory()) {
         return readdirSync(mods).filter(name => {
            const path = join(mods, name, 'index.js');
            return existsSync(path) && statSync(path).isFile();
         });
      } else {
         return null;
      }
   },
   writeSave (data) {
      try {
         if (existsSync(universe) && statSync(universe).isFile()) {
            if (existsSync(universe_backup) && statSync(universe_backup).isFile()) {
               rmSync(universe_backup);
            }
            renameSync(universe, universe_backup);
         }
         writeFileSync(universe, data);
         return true;
      } catch {
         return false;
      }
   },
   writeRoom (name, data) {
      if (existsSync('../rooms')) {
         try {
            writeFileSync(`../rooms/${name}.json`, data);
            return true;
         } catch {
            return false;
         }
      } else {
         return false;
      }
   }
});
