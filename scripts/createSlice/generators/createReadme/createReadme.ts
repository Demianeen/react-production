import fs from 'fs'
import { capitalize } from 'utils/capitalize'
import { resolveRoot } from 'utils/resolveRoot'
import type {
  CreateSliceOptions,
  Layer,
} from '../../types/createSlice'
import { componentReadme } from './templates/componentReadme.template'

export const createReadme = (
  layer: Layer,
  sliceName: string,
  _options: CreateSliceOptions
) => {
  const capitalizedSliceName = capitalize(sliceName)

  try {
    const readmePath = resolveRoot(
      'src',
      layer,
      capitalizedSliceName,
      'README.md'
    )

    fs.writeFileSync(
      readmePath,
      componentReadme(capitalizedSliceName, layer)
    )
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Failed to create public api: ${e.message}`)
    }
    throw new Error('Unexpected error')
  }
}
