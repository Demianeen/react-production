import type {
  EditorConfig,
  LexicalEditor,
  NodeKey,
  RangeSelection,
} from 'lexical'
import { $createParagraphNode, ElementNode } from 'lexical'

export interface ImageBlockPayload {
  src: string
  key?: NodeKey
}

export class ImageBlockNode extends ElementNode {
  private __src: string

  private __hasCaption: boolean

  constructor({ src, key }: ImageBlockPayload) {
    super(key)
    this.__src = src
    this.__hasCaption = false
  }

  static getType(): string {
    return 'imageBlock'
  }

  static clone(node: ImageBlockNode): ImageBlockNode {
    return new ImageBlockNode({
      src: node.__src,
      key: node.__key,
    })
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

    const img = document.createElement('img')
    img.src = this.__src
    container.appendChild(img)

    const caption = document.createElement('figcaption')
    container.appendChild(caption)

    return container
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

export const $createImageBlockNode = (
  node: ImageBlockPayload
): ImageBlockNode => new ImageBlockNode(node)

export const $isImageBlockNode = (
  node: unknown
): node is ImageBlockNode => node instanceof ImageBlockNode
