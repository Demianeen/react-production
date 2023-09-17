import type {
  DOMExportOutput,
  EditorConfig,
  LexicalEditor,
  NodeKey,
  RangeSelection,
  SerializedEditor,
  SerializedLexicalNode,
  Spread,
} from 'lexical'
import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  DecoratorNode,
  createEditor,
} from 'lexical'
import {
  ImageBlockComponent,
  captionClassnames,
  captionWrapperClassnames,
  imageClassnames,
  imageWrapperClassnames,
} from '../ui/ImageBlockComponent/ImageBlockComponent'

export interface ImageBlockPayload {
  src: string
  altText: string
  anchorElem: HTMLElement
  caption?: LexicalEditor
  key?: NodeKey
}

export type SerializedImageNode = Spread<
  {
    altText: string
    caption: SerializedEditor
    src: string
    anchorElem: HTMLElement
  },
  SerializedLexicalNode
>

export class ImageBlockNode extends DecoratorNode<JSX.Element> {
  private __src: string

  private __altText: string

  private __caption: LexicalEditor

  private __anchorElem: HTMLElement

  constructor({
    src,
    key,
    altText,
    caption,
    anchorElem,
  }: ImageBlockPayload) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__anchorElem = anchorElem
    this.__caption = caption || createEditor()
  }

  static getType() {
    return 'imageBlock' as const
  }

  static clone(node: ImageBlockNode): ImageBlockNode {
    return new ImageBlockNode({
      src: node.getSrc(),
      altText: node.getAltText(),
      caption: node.__caption,
      key: node.__key,
      anchorElem: node.__anchorElem,
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

  static importJSON(
    serializedNode: SerializedImageNode
  ): ImageBlockNode {
    const { altText, caption, src, anchorElem } = serializedNode
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const node = $createImageBlockNode({
      altText,
      src,
      anchorElem,
    })
    const nestedEditor = node.__caption
    const editorState = nestedEditor.parseEditorState(
      caption.editorState
    )
    if (!editorState.isEmpty()) {
      nestedEditor.setEditorState(editorState)
    }
    return node
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.getAltText(),
      caption: this.__caption.toJSON(),
      src: this.getSrc(),
      type: this.getType(),
      anchorElem: this.__anchorElem,
      version: 1,
    }
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
    _articleEditor: LexicalEditor,
    _config: EditorConfig
  ): JSX.Element {
    return (
      <ImageBlockComponent
        altText={this.getAltText()}
        caption={this.__caption}
        src={this.getSrc()}
        nodeKey={this.__key}
        anchorElem={this.__anchorElem}
      />
    )
  }

  getData(): ImageBlockPayload {
    return {
      altText: this.getAltText(),
      caption: this.__caption,
      src: this.getSrc(),
      key: this.getKey(),
      anchorElem: this.__anchorElem,
    }
  }

  getSrc(): string {
    return this.__src
  }

  getAltText(): string {
    return this.__altText
  }

  exportDOM(): DOMExportOutput {
    const figure = document.createElement('figure')
    figure.className = imageWrapperClassnames

    const image = document.createElement('img')
    image.className = imageClassnames
    image.src = this.getSrc()
    image.alt = this.getAltText()
    figure.appendChild(image)

    let captionText: string | undefined
    this.__caption.getEditorState().read(() => {
      const keys = $getRoot().getChildrenKeys()
      const captionNode = $getNodeByKey(keys[0])
      captionText = captionNode?.getTextContent()
    })
    if (captionText === undefined) {
      return {
        element: figure,
      }
    }

    const captionWrapper = document.createElement('div')
    captionWrapper.className = captionWrapperClassnames

    const caption = document.createElement('figure')
    caption.className = captionClassnames
    caption.textContent = captionText

    captionWrapper.appendChild(caption)
    figure.appendChild(captionWrapper)

    return {
      element: figure,
    }
  }
}

export const $createImageBlockNode = (
  node: ImageBlockPayload
): ImageBlockNode => new ImageBlockNode(node)

export const $isImageBlockNode = (
  node: unknown
): node is ImageBlockNode => node instanceof ImageBlockNode
