import getOS from './getOS'

type KEY_TYPES =
  | 'LEFT'
  | 'RIGHT'
  | 'UP'
  | 'DOWN'
  | 'ENTER'
  | 'PLAY'
  | 'PAUSE'
  | 'STOP'
  | 'FAST-FORWARD'
  | 'REWIND'

const commonMappingKeys: Record<KEY_TYPES, number> = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  PLAY: 415,
  PAUSE: 19,
  STOP: 413,
  'FAST-FORWARD': 417,
  REWIND: 412,
}
const webOSMappingKeys: Record<KEY_TYPES | 'BACK', number> = {
  ...commonMappingKeys,
  BACK: 461,
}
const tizenMappingKeys: Record<KEY_TYPES | 'BACK', number> = {
  ...commonMappingKeys,
  BACK: 10009,
}
const browserMappingKeys: Record<KEY_TYPES | 'BACK', number> = {
  ...commonMappingKeys,
  BACK: 8, // backspace
}

const mappingKeys =
  process.env.NODE_ENV === 'development' || getOS() === 'browser'
    ? browserMappingKeys
    : getOS() === 'webOS'
      ? webOSMappingKeys
      : tizenMappingKeys

export default mappingKeys
