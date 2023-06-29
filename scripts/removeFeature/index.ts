import minimist from 'minimist'
import { Project } from 'ts-morph'
import {
  isToggleFunction,
  removeToggleFunction,
} from './lib/removeToggleFunction'
import {
  isToggleComponent,
  removeToggleComponent,
} from './lib/removeToggleComponent'

const project = new Project()

const argv = minimist(process.argv.slice(2))
const [featureNameToRemove, featureState] = argv._

if (featureNameToRemove === undefined) {
  throw new Error('Feature name is required.')
}

if (featureState === undefined) {
  throw new Error('Feature state is required (on/off).')
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Feature state must be on or off.')
}

project
  .addSourceFilesAtPaths('src/**/*.{ts,tsx}')
  .forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
      if (isToggleFunction(node)) {
        removeToggleFunction(node, featureState, featureNameToRemove)
      }
    })
  })

project
  .addSourceFilesAtPaths('src/**/*.tsx')
  .forEach((sourceFile) => {
    sourceFile.forEachDescendant((node) => {
      if (isToggleComponent(node)) {
        removeToggleComponent(node, featureState, featureNameToRemove)
      }
    })
  })

project.saveSync()
