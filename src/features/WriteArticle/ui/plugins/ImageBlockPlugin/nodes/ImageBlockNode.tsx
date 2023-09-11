import type {
  EditorConfig,
  LexicalEditor,
  NodeKey,
  RangeSelection,
} from 'lexical'
import {
  $createParagraphNode,
  DecoratorNode,
  createEditor,
} from 'lexical'
import { ImageBlockComponent } from '../ui/ImageBlockComponent/ImageBlockComponent'

export interface ImageBlockPayload {
  src: string
  altText: string
  caption?: LexicalEditor
  key?: NodeKey
}

export class ImageBlockNode extends DecoratorNode<JSX.Element> {
  private __src: string

  private __altText: string

  private __caption: LexicalEditor

  constructor({ src, key, altText, caption }: ImageBlockPayload) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__caption = caption || createEditor()
  }

  static getType() {
    return 'imageBlock' as const
  }

  static clone(node: ImageBlockNode): ImageBlockNode {
    return new ImageBlockNode({
      src: node.__src,
      altText: node.__altText,
      caption: node.__caption,
      key: node.__key,
    })
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement('div')
    const className = config.theme[this.getType()]
    if (className !== undefined) {
      dom.className = className
    }
    return dom
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false
  }

  insertNewAfter(_selection: RangeSelection) {
    const newBlock = $createParagraphNode()
    const direction = this.getDirection()
    newBlock.setDirection(direction)
    this.insertBefore(newBlock)
    return newBlock
  }

  collapseAtStart(_selection: RangeSelection): boolean {
    this.replace($createParagraphNode())
    return true
  }

  decorate(
    _editor: LexicalEditor,
    _config: EditorConfig
  ): JSX.Element {
    return (
      <ImageBlockComponent
        altText={this.__altText}
        caption={this.__caption}
        src={this.__src}
        nodeKey={this.__key}
      />
    )
  }
}

export const $createImageBlockNode = (
  node: ImageBlockPayload
): ImageBlockNode => new ImageBlockNode(node)

export const $isImageBlockNode = (
  node: unknown
): node is ImageBlockNode => node instanceof ImageBlockNode
