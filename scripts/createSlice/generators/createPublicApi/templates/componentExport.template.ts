import type { Layer } from '../../../types/createSlice'

export const componentExportTemplate = (
  componentName: string,
  layer: Layer
) => {
  if (layer === 'pages') {
    return `export { ${componentName}Async as ${componentName} } from './ui/${componentName}/${componentName}.async'\n`
  }

  return `export { ${componentName} } from './ui/${componentName}'/${componentName}\n`
}
