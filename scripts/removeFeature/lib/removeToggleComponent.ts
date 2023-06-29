import type {
  Expression,
  JsxSelfClosingElement,
  Node,
} from 'ts-morph'
import { SyntaxKind } from 'ts-morph'

const toggleComponentName = 'ToggleFeature'

export const isToggleComponent = (
  node: Node
): node is JsxSelfClosingElement => {
  if (node.isKind(SyntaxKind.JsxSelfClosingElement)) {
    const componentName = node
      .getFirstChildByKind(SyntaxKind.Identifier)
      ?.getText()

    if (componentName === toggleComponentName) {
      return true
    }
  }

  return false
}

const replaceComponent = (
  node: JsxSelfClosingElement,
  newNode: Expression
) => {
  let newNodeExpression = newNode
  if (newNodeExpression.isKind(SyntaxKind.ParenthesizedExpression)) {
    newNodeExpression = newNodeExpression.getExpression()
  }
  if (newNodeExpression.isKind(SyntaxKind.NullKeyword)) {
    node.replaceWithText('')
  } else {
    node.replaceWithText(newNodeExpression.getText())
  }
}

export const removeToggleComponent = (
  node: JsxSelfClosingElement,
  featureState: 'on' | 'off',
  featureNameToRemove: string
) => {
  const featureNameProperty = node.getAttributeOrThrow('name')
  const featureName = featureNameProperty
    .getFirstChildByKindOrThrow(SyntaxKind.StringLiteral)
    .getLiteralText()

  if (featureName !== featureNameToRemove) {
    return
  }

  const onProperty = node.getAttributeOrThrow('on')
  const offProperty = node.getAttributeOrThrow('off')

  const onComponent = onProperty
    .getFirstChildByKindOrThrow(SyntaxKind.JsxExpression)
    .getExpressionOrThrow()
  const offComponent = offProperty
    .getFirstChildByKindOrThrow(SyntaxKind.JsxExpression)
    .getExpressionOrThrow()

  if (featureState === 'on') {
    replaceComponent(node, onComponent)
  } else {
    replaceComponent(node, offComponent)
  }
}
