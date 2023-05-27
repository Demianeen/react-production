import { capitalize } from '../../../../../utils/capitalize'
import type { Layer } from '../../../types/createSlice'

export const modelExportTemplate = (
  layer: Layer,
  modelName: string,
  reduxSchemaName: string
) => {
  const capitalizedSchemaName = capitalize(reduxSchemaName)
  return `export type { ${capitalizedSchemaName} } from './model/types/${reduxSchemaName}'
export { ${modelName}Slice } from './model/slice/${modelName}Slice'\n`
}
