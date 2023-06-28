import minimist from 'minimist'
import type { Node } from 'ts-morph'
import { Project, SyntaxKind } from 'ts-morph'

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

project.addSourceFilesAtPaths('src/**/*.{ts,tsx}')

const isToggleFeatures = (node: Node) => {
  if (node.isKind(SyntaxKind.CallExpression)) {
    const funcName = node
      .getFirstChildByKind(SyntaxKind.Identifier)
      ?.getText()

    if (funcName === 'toggleFeature') {
      return true
    }
  }

  return false
}

project.getSourceFiles().forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (isToggleFeatures(node)) {
      const options = node.getFirstDescendantByKindOrThrow(
        SyntaxKind.ObjectLiteralExpression
      )

      const featureNameProperty = options.getPropertyOrThrow('name')
      const featureName = featureNameProperty
        .getFirstChildByKindOrThrow(SyntaxKind.StringLiteral)
        .getLiteralText()

      if (featureName !== featureNameToRemove) {
        return
      }

      // because on/off properties are optional, we need to check if they exist
      const onProperty = options.getProperty('on')
      const offProperty = options.getProperty('off')

      const onFunction = onProperty?.getFirstChildByKindOrThrow(
        SyntaxKind.ArrowFunction
      )
      const offFunction = offProperty?.getFirstChildByKindOrThrow(
        SyntaxKind.ArrowFunction
      )

      const nodePath = node.getSourceFile().getFilePath()

      if (featureState === 'on') {
        if (onFunction?.getBody?.().isKind(SyntaxKind.Block)) {
          throw new Error(
            `'on' property must be an arrow function without curly braces, but instead it is:\n${onFunction?.getText()}\nat ${nodePath}`
          )
        }
      } else {
        if (onFunction?.getBody?.().isKind(SyntaxKind.Block)) {
          throw new Error(
            `'off' property must be an arrow function without curly braces, but instead it is:\n${offFunction?.getText()}\nat ${nodePath}`
          )
        }
        node.replaceWithText(offFunction?.getBodyText() ?? '')
      }
    }
  })
})

project.saveSync()
