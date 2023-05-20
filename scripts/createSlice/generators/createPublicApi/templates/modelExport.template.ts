import { capitalize } from '../../../../../utils/capitalize'
import type { Layer } from '../../../types/createSlice'

export const modelExportTemplate = (
  layer: Layer,
  sliceName: string,
  reduxSchemaName: string
) => {
  const capitalizedSchemaName = capitalize(reduxSchemaName)
  return `export type { ${capitalizedSchemaName} } from './model/types/${reduxSchemaName}'
export { ${sliceName}Slice } from './model/slice/${sliceName}Slice'\n`
}
