import { createSlice } from './generators'
import type { Layer } from './types/createSlice'

const layer = process.argv[2]
const sliceName = process.argv[3]

const layers: Layer[] = [
  'pages',
  'widgets',
  'features',
  'entities',
]

const isLayer = (value: string): value is Layer =>
  layers.includes(value as Layer)

if (layer === undefined || sliceName === undefined) {
  throw new Error(
    'Layer and slice name are required.\n Example: npm run createSlice features users'
  )
}

if (sliceName[0] === sliceName[0].toUpperCase()) {
  throw new Error(
    'Slice name must start with a lowercase letter.'
  )
}

if (!isLayer(layer)) {
  throw new Error(
    `Layer must be one of ${layers.join(', ')}.`
  )
}

createSlice(layer, sliceName)
