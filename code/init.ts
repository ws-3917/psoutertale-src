import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { BaseTexture, Filter, MIPMAP_MODES, MSAA_QUALITY, PRECISION, Program, SCALE_MODES, settings } from 'pixi.js';

settings.RESOLUTION = 1;
settings.ROUND_PIXELS = true;

BaseTexture.defaultOptions.anisotropicLevel = 0;
BaseTexture.defaultOptions.mipmap = MIPMAP_MODES.OFF;
BaseTexture.defaultOptions.multisample = MSAA_QUALITY.NONE;
BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;

Filter.defaultMultisample = MSAA_QUALITY.NONE;

Program.defaultFragmentPrecision = PRECISION.LOW;
Program.defaultVertexPrecision = PRECISION.LOW;

AdvancedBloomFilter.defaults.blur = 4;
