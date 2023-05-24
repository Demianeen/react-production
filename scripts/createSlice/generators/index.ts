import { createSliceFolder } from '../../../utils/createSliceFolder'
import { createModel } from './createModel/createModel'
import { createUi } from './createUi/createUi'
import { createPublicApi } from './createPublicApi/createPublicApi'
import type {
  CreateSliceOptions,
  Layer,
} from '../types/createSlice'
import { createApi } from './createApi/createApi'

export const createSlice = (
  layer: Layer,
  name: string,
  options: CreateSliceOptions
) => {
  createSliceFolder(layer, name)

  if (options.model) {
    createModel(layer, name)
  }

  if (options.api !== undefined) {
    createApi(layer, name, options.api)
  }

  createUi(layer, name)
  createPublicApi(layer, name, options)
}
