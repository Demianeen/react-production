import type {
  EditorConfig,
  LexicalEditor,
  NodeKey,
  RangeSelection,
} from 'lexical'
import { $createParagraphNode, ElementNode } from 'lexical'

export interface ImagePayload {
  src: string
  key?: NodeKey
}

export class ImageNodeOld2 extends ElementNode {
  private __src: string

  private __hasCaption: boolean

  constructor({ src, key }: ImagePayload) {
    super(key)
    this.__src = src
    this.__hasCaption = false
  }

  static getType(): string {
    return 'image'
  }

  static clone(node: ImageNodeOld2): ImageNodeOld2 {
    return new ImageNodeOld2({
      src: node.__src,
      key: node.__key,
    })
  }

  // eslint-disable-next-line class-methods-use-this
  createDOM(
    config: EditorConfig,
    _editor: LexicalEditor
  ): HTMLElement {
    const img = document.createElement('img')
    img.src = this.__src

    const className = config.theme.image
    if (className) {
      img.classList.add(className)
    }

    return img
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOM(
    _prevNode: unknown,
    dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    const text = this.getTextContent()

    const caption = dom.querySelector('figcaption')
    if (!caption) return true

    if (text !== '') {
      caption.textContent = 'Image caption'
    } else {
      caption.textContent = 'Image caption'
    }
    return true
  }

  // canInsertAfter(node: LexicalNode): boolean {
  //   return false
  // }

  // canInsertTextAfter(): boolean {
  //   console.log('canInsertTextAfter')
  //   return false
  // }

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

export const $createImageNode = (node: ImagePayload): ImageNodeOld2 =>
  new ImageNodeOld2(node)

export const $isImageNode = (node: unknown): node is ImageNodeOld2 =>
  node instanceof ImageNodeOld2
