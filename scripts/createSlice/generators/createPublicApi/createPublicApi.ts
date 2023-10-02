import fs from 'fs'
import { capitalize } from 'utils/capitalize'
import { resolveRoot } from 'utils/resolveRoot'
import type {
  CreateSliceOptions,
  Layer,
} from '../../types/createSlice'
import { componentExportTemplate } from './templates/componentExport.template'
import { modelExportTemplate } from './templates/modelExport.template'

export const createPublicApi = (
  layer: Layer,
  sliceName: string,
  options: CreateSliceOptions
) => {
  const componentName = capitalize(sliceName)
  const reduxSchemaName = `${options.model}Schema`

  try {
    const publicApiPath = resolveRoot(
      'src',
      layer,
      capitalize(sliceName),
      'index.ts'
    )

    fs.writeFileSync(
      publicApiPath,
      componentExportTemplate(componentName, layer)
    )

    if (options.model) {
      fs.appendFileSync(
        publicApiPath,
        modelExportTemplate(layer, options.model, reduxSchemaName)
      )
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to create public api: ${e.message}`)
    }
    throw new Error('Unexpected error')
  }
}
