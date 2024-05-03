import getOS from './getOS'

type KeyTypes = 'LEFT' | 'RIGHT' | 'UP' | 'DOWN' | 'ENTER' | 'BACK'

const tvMappingKeys: Record<KeyTypes, number> = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  BACK: 461,
}

const browserMappingKeys: Record<KeyTypes, number> = {
  LEFT: 37,
  RIGHT: 39,
  UP: 38,
  DOWN: 40,
  ENTER: 13,
  BACK: 8, // backspace
}

const mappingKeys =
  process.env.NODE_ENV === 'development' || getOS() === 'browser'
    ? browserMappingKeys
    : tvMappingKeys

export default mappingKeys
