import { translatorImages } from '../../code/systems/translator';
import coloredassets from './sources';

const COLORMODE = 'colored';
translatorImages.content.addLanguage(COLORMODE, coloredassets);
translatorImages.modes.push(COLORMODE);
