import { CosmosFont, CosmosKeyed, CosmosPointSimple, CosmosWritingMode } from '../../../code/systems/storyteller';
import values from '../../en_US/text/values';
export default values as {
   cellInventoryX: number;
   cellBoxX: number;
   cellFinishX: number;
   footerX: number;
   itemEquipX: number;
   itemUseX: number;
   itemInfoX_equip: number;
   itemInfoX_use: number;
   itemDropX_equip: number;
   itemDropX_use: number;
   loadContinueX: number;
   loadLVX: number;
   loadObserveX: number;
   loadResetX: number;
   loadSettingsX: number;
   loadTimeX: number;
   loadTrueResetX: number;
   nameChoiceCameos: CosmosKeyed<string>;
   nameChoiceFonts: Partial<CosmosKeyed<[CosmosFont, number]>>;
   nameChoiceRestrictions: string[];
   namePromptX: number;
   nameValueY: number;
   nameLetterMap: string[][];
   nameLetterPosition: (index: number) => CosmosPointSimple;
   nameLetterValidation: (char: string) => boolean;
   nameValueTranslator: (value: string) => string;
   nameQuitX: number;
   nameBackspaceX: number;
   nameDoneX: number;
   nameConfirmX: number;
   nameNoX: number;
   nameYesX: number;
   nameGoBackX: number;
   papyrusStyle: () => {
      fontSize1: number;
      writingMode: CosmosWritingMode;
   };
   saveLVX: number;
   saveReturnX: number;
   saveSaveX: number;
   settingsHeaderX: number;
   statBoxSizeX: number;
   textFormat: (text: string, length?: number, plain?: boolean) => string;
   textLength: (text: string) => number;
   textLengthPrecise: (text: string) => number;
   textPunctuation: (char: string) => boolean;
};
