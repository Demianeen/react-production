import fs from 'fs'
import { resolveRoot } from '../../../../utils/resolveRoot'
import { capitalize } from '../../../../utils/capitalize'
import { componentTemplate } from './templates/component.template'
import { styleTemplate } from './templates/style.template'
import { storiesTemplate } from './templates/stories.template'
import type { Layer } from '../../types/createSlice'
import { componentAsyncTemplate } from './templates/componentAsync.template'

export const createUi = (
  layer: Layer,
  sliceName: string
) => {
  const componentName = capitalize(sliceName)
  const resolveUiPath = (...segments: string[]) =>
    resolveRoot(
      'src',
      layer,
      capitalize(sliceName),
      'ui',
      ...segments
    )

  const createUiStructure = () => {
    try {
      fs.mkdirSync(resolveUiPath())
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create ui structure: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  const createUiComponent = () => {
    const isDefaultExport = layer === 'pages'
    try {
      fs.mkdirSync(resolveUiPath(componentName))
      fs.writeFileSync(
        resolveUiPath(
          componentName,
          `${componentName}.tsx`
        ),
        componentTemplate(layer, sliceName, isDefaultExport)
      )
      fs.writeFileSync(
        resolveUiPath(
          componentName,
          `${componentName}.module.scss`
        ),
        styleTemplate(sliceName)
      )
      fs.writeFileSync(
        resolveUiPath(
          componentName,
          `${componentName}.stories.tsx`
        ),
        storiesTemplate(
          layer,
          componentName,
          isDefaultExport
        )
      )
      if (layer === 'pages') {
        fs.writeFileSync(
          resolveUiPath(
            componentName,
            `${componentName}.async.tsx`
          ),
          componentAsyncTemplate(componentName)
        )
      }
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(
          `Failed to create ui component: ${e.message}`
        )
      }
      throw new Error('Unexpected error')
    }
  }

  createUiStructure()
  createUiComponent()
}
