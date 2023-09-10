import type { EditorConfig, LexicalEditor } from 'lexical'
import { ElementNode } from 'lexical'

export class BannerNode extends ElementNode {
  static getType(): string {
    return 'banner'
  }

  static clone(node: BannerNode): BannerNode {
    return new BannerNode(node.__key)
  }

  // eslint-disable-next-line class-methods-use-this
  createDOM(
    config: EditorConfig,
    _editor: LexicalEditor
  ): HTMLElement {
    const node = document.createElement('div')
    node.classList.add(config.theme.banner)
    return node
  }

  // eslint-disable-next-line class-methods-use-this
  updateDOM(
    _prevNode: unknown,
    _dom: HTMLElement,
    _config: EditorConfig
  ): boolean {
    return false
  }
}

export const $createBannerNode = (): BannerNode => new BannerNode()

export const $isBannerNode = (node: unknown): node is BannerNode =>
  node instanceof BannerNode
