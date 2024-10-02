declare module '*?url' {
   export default '' as string;
}

declare module '*?xxx' {
   export default {} as any;
}

declare const ___spacetime___: {
   data: () => string | null;
   exec: {
      (a: 'dialog.message', b: boolean, c: { buttons: string[]; message: string; title: string }): Promise<number>;
      (a: 'dialog.open', b: { buttonLabel: string; name: string; title: string }): Promise<string | null>;
      (a: 'dialog.save', b: string, c: { buttonLabel: string; name: string; title: string }): Promise<boolean>;
      (a: 'devtools', b?: boolean): Promise<void>;
      (a: 'f4'): Promise<void>;
      (a: 'mods'): Promise<void>;
      (a: 'pad', b: number): Promise<void>;
      (a: 'reload'): Promise<void>;
   };
   mods: () => string[] | null;
   writeRoom: (name: string, data: string) => boolean;
   writeSave: (data: string) => boolean;
};

interface ImportMeta {
   hot: any;
}
