import minimist from 'minimist'
import type { CreateSliceOptions, Layer } from './types/createSlice'
import { createSlice } from './generators'

const argv = minimist(process.argv.slice(2))
// eslint-disable-next-line prefer-const
let [layer, sliceName] = argv._

const options: CreateSliceOptions = {
  model: argv.model === true ? sliceName : argv.model,
  api: argv.api === true ? sliceName : argv.api,
  dryRun: argv['dry-run'] === true,
}

const layers: Layer[] = ['pages', 'widgets', 'features', 'entities']

const isLayer = (value: string): value is Layer =>
  layers.includes(value as Layer)

if (layer === undefined || sliceName === undefined) {
  throw new Error(
    'Layer and slice name are required.\n Example: npm run createSlice features users'
  )
}

if (sliceName[0] === sliceName[0].toUpperCase()) {
  throw new Error('Slice name must start with a lowercase letter.')
}

if (!isLayer(layer)) {
  throw new Error(`Layer must be one of ${layers.join(', ')}.`)
}

if (layer === 'entities') {
  if (sliceName.slice(-1) === 's') {
    console.warn('Slice name should be singular for entities layer.')
    sliceName = sliceName.slice(0, -1)
  }
}

if (layer === 'pages') {
  // if slice name don't end with Page, add it
  if (sliceName.slice(-4) !== 'Page') {
    sliceName = `${sliceName}Page`
  }
}

createSlice(layer, sliceName, options)
