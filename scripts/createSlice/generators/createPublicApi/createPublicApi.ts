import fs from 'fs'
import type { Layer } from '../../types/createSlice'
import { resolveRoot } from '../../utils/resolveRoot'
import { capitalize } from '../../utils/capitalize'

export const createPublicApi = (
  layer: Layer,
  sliceName: string
) => {
  const componentName = capitalize(sliceName)
  const reduxSchemaName = `${sliceName}Schema`
  const capitalizedSchemaName = capitalize(reduxSchemaName)

  try {
    fs.writeFileSync(
      resolveRoot(
        'src',
        layer,
        capitalize(sliceName),
        'index.ts'
      ),
      `export { ${componentName} } from './ui/${componentName}/${componentName}'
export type { ${capitalizedSchemaName} } from './model/types/${reduxSchemaName}'
export { ${sliceName}Slice } from './model/slice/${sliceName}Slice'`
    )
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(
        `Failed to create public api: ${e.message}`
      )
    }
    throw new Error('Unexpected error')
  }
}
