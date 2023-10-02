import { capitalize } from 'utils/capitalize'
import type { Layer } from '../../../types/createSlice'

export const componentReadme = (
  componentName: string,
  layer: Layer
) => {
  // capitalize and remove s - like pages -> Page
  const formattedLayer = capitalize(layer).slice(0, -1)

  return `### ${formattedLayer} ${componentName}
  
Description:

#### Public API

- Components
`
}
