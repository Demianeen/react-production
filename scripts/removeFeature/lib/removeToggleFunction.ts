import type { ArrowFunction, CallExpression, Node } from 'ts-morph'
import { SyntaxKind } from 'ts-morph'

const toggleFunctionName = 'toggleFeature'

export const isToggleFunction = (
  node: Node
): node is CallExpression => {
  if (node.isKind(SyntaxKind.CallExpression)) {
    const funcName = node
      .getFirstChildByKind(SyntaxKind.Identifier)
      ?.getText()

    if (funcName === toggleFunctionName) {
      return true
    }
  }

  return false
}

const replaceFunction = (
  node: CallExpression,
  newNode: ArrowFunction
) => {
  const nodePath = node.getSourceFile().getFilePath()

  if (newNode?.getBody?.().isKind(SyntaxKind.Block)) {
    throw new Error(
      `on/off property must be an arrow function without curly braces, but instead it is:\n${newNode?.getText()}\nat ${nodePath}`
    )
  }
  node.replaceWithText(newNode.getBodyText())
}

export const removeToggleFunction = (
  node: CallExpression,
  featureState: 'on' | 'off',
  featureNameToRemove: string
) => {
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

  const onProperty = options.getPropertyOrThrow('on')
  const offProperty = options.getPropertyOrThrow('off')

  const onFunction = onProperty.getFirstChildByKindOrThrow(
    SyntaxKind.ArrowFunction
  )
  const offFunction = offProperty.getFirstChildByKindOrThrow(
    SyntaxKind.ArrowFunction
  )

  if (featureState === 'on') {
    replaceFunction(node, onFunction)
  } else {
    replaceFunction(node, offFunction)
  }
}
