import type {
  EditorConfig,
  LexicalEditor,
  RangeSelection,
} from 'lexical'
import { $createParagraphNode, ElementNode } from 'lexical'

export class ImageBlockNodeOld2 extends ElementNode {
  static getType(): string {
    return 'imageBlock'
  }

  static clone(): ImageBlockNodeOld2 {
    return new ImageBlockNodeOld2()
  }

  // eslint-disable-next-line class-methods-use-this
  createDOM(
    config: EditorConfig,
    _editor: LexicalEditor
  ): HTMLElement {
    const container = document.createElement('figure')

    const className = config.theme.imageBlock
    if (className) {
      container.classList.add(className)
    }

    return container
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return true
  }

  // append(...nodesToAppend: LexicalNode[]): this {
  //   console.log('append', nodesToAppend)
  //   nodesToAppend.forEach((node) => {
  //     this.insertAfter(node)
  //   })
  //   this.get
  //   return this
  // }

  // insertAfter(
  //   nodeToInsert: LexicalNode,
  //   restoreSelection?: boolean | undefined
  // ) {
  //   this.__parent.insertAfter(nodeToInsert)
  //   console.log(restoreSelection)
  // }

  insertNewAfter(_selection: RangeSelection) {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    this.insertAfter(newBlock)
    return newBlock
  }

  collapseAtStart(_selection: RangeSelection): boolean {
    this.replace($createParagraphNode())
    return true
  }
}

export const $createImageBlockNode = (): ImageBlockNodeOld2 =>
  new ImageBlockNodeOld2()

export const $isImageBlockNode = (
  node: unknown
): node is ImageBlockNodeOld2 => node instanceof ImageBlockNodeOld2
