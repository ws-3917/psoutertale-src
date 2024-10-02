import { CosmosInstance } from '../systems/storyteller';

export const cw_state = { s1: false, s2: false, s3: false };

export const cf1_state = {
   pylonA: { x: 0, y: 0 },
   pylonB: { x: 0, y: 0 },
   pylonC: { x: 0, y: 0 },
   pylonD: { x: 0, y: 0 },
   pylonE: { x: 0, y: 0 },
   pylonF: { x: 0, y: 0 },
   pylonG: { x: 0, y: 0 }
};

export const cf2_state = {
   time: 0,
   bench: false,
   key: false
};

export const ca_state = {
   last_elevated: null as string | null,
   floor: 0,
   floartex: -1,
   wind: null as CosmosInstance | null
};
