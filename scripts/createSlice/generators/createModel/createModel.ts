import fs from 'fs'
import { resolveRoot } from '../../../../utils/resolveRoot'
import { reduxSliceTemplate } from './templates/reduxSlice.template'
import { capitalize } from '../../../../utils/capitalize'
import { reduxSchemaTemplate } from './templates/reduxSchema.template'
import type { Layer } from '../../types/createSlice'

export const createModel = (
  layer: Layer,
  sliceName: string
) => {
  const resolveModelPath = (...segments: string[]) =>
    resolveRoot(
      'src',
      layer,
      capitalize(sliceName),
      'model',
      ...segments
    )

  const createModelStructure = () => {
    try {
      fs.mkdirSync(resolveModelPath())
      fs.mkdirSync(resolveModelPath('types'))
      fs.mkdirSync(resolveModelPath('slice'))
      fs.mkdirSync(resolveModelPath('selectors'))
      fs.mkdirSync(resolveModelPath('services'))
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create model structure: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  const createReduxSlice = () => {
    try {
      fs.writeFileSync(
        resolveModelPath('slice', `${sliceName}Slice.ts`),
        reduxSliceTemplate(sliceName)
      )
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create redux slice: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  const createReduxSchema = () => {
    try {
      fs.writeFileSync(
        resolveModelPath('types', `${sliceName}Schema.ts`),
        reduxSchemaTemplate(sliceName)
      )
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create redux slice schema: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  createModelStructure()
  createReduxSlice()
  createReduxSchema()
}
