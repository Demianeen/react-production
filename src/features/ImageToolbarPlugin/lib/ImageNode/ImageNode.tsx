import type {
  DOMConversionMap,
  DOMConversionOutput,
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
  $createTextNode,
  $getNodeByKey,
  $getRoot,
  DecoratorNode,
  createEditor,
} from 'lexical'
import { isUrl } from '@/shared/lib/url/findUrl/isUrl'
import {
  ImageComponent,
  captionClassnames,
  captionWrapperClassnames,
  imageClassnames,
  imageWrapperClassnames,
} from '../../ui/ImageComponent/ImageComponent'

export interface ImagePayload {
  src: string
  altText: string
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

export class ImageNode extends DecoratorNode<JSX.Element> {
  private __src: string

  private __altText: string

  private __caption: LexicalEditor

  constructor({ src, key, altText, caption }: ImagePayload) {
    super(key)
    this.__src = src
    this.__altText = altText
    this.__caption = caption || createEditor()
  }

  setCaptionText(text: string) {
    this.__caption.update(() => {
      const root = $getRoot()
      root.append(
        $createParagraphNode().append($createTextNode(text)),
      )
    })
  }

  static getType() {
    return 'image' as const
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({
      src: node.getSrc(),
      altText: node.getAltText(),
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

  static importDOM(): DOMConversionMap | null {
    return {
      img: (_: Node) => ({
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        conversion: convertImageNode,
        priority: 0,
      }),
      figure: (_: Node) => ({
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        conversion: convertImageNode,
        priority: 0,
      }),
    }
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { altText, caption, src } = serializedNode
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const node = $createImageNode({
      altText,
      src,
    })
    const nestedEditor = node.__caption
    const editorState = nestedEditor.parseEditorState(
      caption.editorState,
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
    _config: EditorConfig,
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
    _config: EditorConfig,
  ): JSX.Element {
    return (
      <ImageComponent
        altText={this.getAltText()}
        caption={this.__caption}
        src={this.getSrc()}
        nodeKey={this.__key}
      />
    )
  }

  getData(): ImagePayload {
    return {
      altText: this.getAltText(),
      caption: this.__caption,
      src: this.getSrc(),
      key: this.getKey(),
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

    const caption = document.createElement('figcaption')
    caption.className = captionClassnames
    caption.textContent = captionText

    captionWrapper.appendChild(caption)
    figure.appendChild(captionWrapper)

    return {
      element: figure,
    }
  }
}

export const $createImageNode = (node: ImagePayload): ImageNode => {
  return new ImageNode(node)
}

export const $isImageNode = (node: unknown): node is ImageNode =>
  node instanceof ImageNode

const getImageNodeFromImgElement = (
  imageNode: HTMLImageElement,
): null | ImageNode => {
  const { alt: altText, src } = imageNode
  if (!isUrl(src)) {
    return null
  }
  const node = $createImageNode({
    altText,
    src,
  })
  return node
}

const isFigureElement = (node: Node): node is HTMLElement =>
  node.nodeName.toLowerCase() === 'figure'

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function convertImageNode(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const node = getImageNodeFromImgElement(domNode)
    return { node }
  }

  if (isFigureElement(domNode)) {
    const img = domNode.querySelector('img')
    if (img === null) {
      return null
    }
    const node = getImageNodeFromImgElement(img)
    const caption = domNode.querySelector('figcaption')
    if (
      caption !== null &&
      caption.textContent !== null &&
      node !== null
    ) {
      node.setCaptionText(caption.textContent)
    }

    return { node }
  }

  return null
}
