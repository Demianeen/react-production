import fs from 'fs'
import { renameFilesAndDirectories } from './generators'
import { resolveRoot } from '../../utils/resolveRoot'
import type { Layer } from './types/createSlice'

const layer = process.argv[2]
const sliceName = process.argv[3]
const newSliceName = process.argv[4]

const layers: Layer[] = ['pages', 'widgets', 'features', 'entities']

const isLayer = (value: string): value is Layer =>
  layers.includes(value as Layer)

if (
  layer === undefined ||
  sliceName === undefined ||
  newSliceName === undefined
) {
  throw new Error(
    'Layer, slice name and new slice name are required.\n Example: npm run createSlice features oldName newName'
  )
}

if (!isLayer(layer)) {
  throw new Error(`Layer must be one of ${layers.join(', ')}.`)
}

const layerPath = resolveRoot('src', layer, sliceName)

if (!fs.existsSync(layerPath)) {
  throw new Error(`Slice ${sliceName} does not exist.`)
}
if (fs.existsSync(resolveRoot('src', layer, newSliceName))) {
  throw new Error(`Slice ${newSliceName} already exists.`)
}

renameFilesAndDirectories(layerPath, sliceName, newSliceName)
