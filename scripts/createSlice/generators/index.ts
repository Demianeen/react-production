import { createModel } from './createModel/createModel'
import { createUi } from './createUi/createUi'
import { createPublicApi } from './createPublicApi/createPublicApi'
import type { Layer } from '../../../types/featureSlicedDesign'
import { createSliceFolder } from '../../../utils/createSliceFolder'

export const createSlice = (layer: Layer, name: string) => {
  createSliceFolder(layer, name)

  createModel(layer, name)
  createUi(layer, name)
  createPublicApi(layer, name)
}
