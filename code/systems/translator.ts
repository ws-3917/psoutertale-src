import { OutertaleTranslatable } from './outertale';
import {
   CosmosAudio,
   CosmosData,
   CosmosFont,
   CosmosImage,
   CosmosKeyed,
   CosmosRegistry,
   CosmosText,
   CosmosUtils
} from './storyteller';

export const translator = {
   assets: [] as [string, CosmosAudio | CosmosData | CosmosImage][],
   content: new OutertaleTranslatable<CosmosKeyed<string>>({}),
   controls: [] as [string, (value: any) => void][],
   fonts: [] as CosmosFont[],
   langs: [ 'default' ] as string[],
   registry: new CosmosRegistry<string, OutertaleTranslatable<CosmosKeyed>>(new OutertaleTranslatable({})),
   texts: [] as [string, CosmosKeyed, string[]][],
   values: new OutertaleTranslatable<CosmosKeyed<any>>({}),
   addAsset (key: string, asset: CosmosAudio | CosmosData | CosmosImage) {
      translator.assets.push([ key, asset ]);
      translator.content.defaults[key] = asset.source;
   },
   addControl (key: string, updater: (value: any) => void, value: any) {
      translator.controls.push([ key, updater ]);
      translator.values.defaults[key] = value;
   },
   addText (key: string, text: CosmosKeyed) {
      translator.texts.push([ key, text, Object.keys(text) ]);
      translator.registry.register(key, new OutertaleTranslatable(translator.cascadeClone(text)));
   },
   cascadeClone (target: any): any {
      return Object.fromEntries(
         Object.entries(target).map(([ key, value ]) => [
            key,
            typeof value === 'object' && !(value instanceof Array) ? translator.cascadeClone(value) : value
         ])
      );
   },
   cascadeReplace (target: any, source: any, placeh: any) {
      placeh ??= target;
      source ??= placeh;
      for (const key in target) {
         const value = target[key];
         if (typeof value === 'object' && !(value instanceof Array)) {
            translator.cascadeReplace(value, source[key], placeh[key]);
         } else {
            target[key] = source[key] ?? placeh[key] ?? value;
         }
      }
   },
   async updateLanguage (lang: string) {
      for (const font of translator.fonts) {
         font.reset();
      }
      const content = translator.content.getLanguage(lang);
      const values = translator.values.getLanguage(lang);
      for (const [ key, value ] of translator.assets) {
         value.source = content[key] ?? translator.content.defaults[key];
      }
      for (const [ key, value, subkeys ] of translator.texts) {
         const sources = translator.registry.of(key);
         const source = sources.getLanguage(lang);
         for (const key of subkeys) {
            translator.cascadeReplace(value[key], source[key], sources.defaults[key]);
         }
      }
      for (const [ key, value ] of translator.controls) {
         value(values[key] ?? translator.values.defaults[key]);
      }
      CosmosText.state++;
   }
};

CosmosUtils.status(`LOAD MODULE: TRANSLATOR (${Math.floor(performance.now()) / 1000})`, { color: '#07f' });
