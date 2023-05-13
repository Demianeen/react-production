import fs from 'fs'
import { resolveRoot } from '../utils/resolveRoot'
import { isErrorWithCode } from '../utils/errorWithCode'
import type { Layer } from '../types/createSlice'
import { createModel } from './createModel/createModel'
import { createUi } from './createUi/createUi'
import { createPublicApi } from './createPublicApi/createPublicApi'
import { capitalize } from '../utils/capitalize'

export const createSlice = (layer: Layer, name: string) => {
  try {
    fs.mkdirSync(
      resolveRoot('src', layer, capitalize(name))
    )
  } catch (error) {
    if (error instanceof Error) {
      if (isErrorWithCode(error)) {
        if (error.code === 'EEXIST') {
          throw new Error(`Slice ${name} already exists.`)
        }
      }
      throw new Error(
        `Failed to create slice: ${error.message}`
      )
    }
    throw new Error('Unexpected error')
  }

  createModel(layer, name)
  createUi(layer, name)
  createPublicApi(layer, name)
}
