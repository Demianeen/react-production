export enum BlockType {
  P = 'paragraph',
  H1 = 'h1',
  H2 = 'h2',
  UL = 'ul',
  OL = 'ol',
}

export interface ArticleEditorSchema {
  blockType: BlockType
}
