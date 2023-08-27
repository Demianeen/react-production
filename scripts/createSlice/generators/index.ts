import { createSliceFolder } from 'utils/createSliceFolder'
import { updateGlobalReadme } from './updateGlobalReadme/updateGlobalReadme'
import { createReadme } from './createReadme/createReadme'
import { createModel } from './createModel/createModel'
import { createUi } from './createUi/createUi'
import { createPublicApi } from './createPublicApi/createPublicApi'
import type { CreateSliceOptions, Layer } from '../types/createSlice'
import { createApi } from './createApi/createApi'

export const createSlice = (
  layer: Layer,
  name: string,
  options: CreateSliceOptions
) => {
  createSliceFolder(layer, name)

  if (options.model !== undefined) {
    createModel(layer, name, options.model)
  }

  if (options.api !== undefined) {
    createApi(layer, name, options.api)
  }

  if (!options.dryRun) {
    updateGlobalReadme(layer, name)
  }

  createUi(layer, name)
  createPublicApi(layer, name, options)
  createReadme(layer, name, options)
}
