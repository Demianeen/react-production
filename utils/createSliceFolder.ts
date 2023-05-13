import fs from 'fs'
import { resolveRoot } from './resolveRoot'
import { isErrorWithCode } from './errorWithCode'
import type { Layer } from '../types/featureSlicedDesign'
import { capitalize } from './capitalize'

export const createSliceFolder = (
  layer: Layer,
  sliceName: string
) => {
  try {
    fs.mkdirSync(
      resolveRoot('src', layer, capitalize(sliceName))
    )
  } catch (error) {
    if (error instanceof Error) {
      if (isErrorWithCode(error)) {
        if (error.code === 'EEXIST') {
          throw new Error(
            `Slice ${sliceName} already exists.`
          )
        }
      }
      throw new Error(
        `Failed to create slice: ${error.message}`
      )
    }
    throw new Error('Unexpected error')
  }
}
