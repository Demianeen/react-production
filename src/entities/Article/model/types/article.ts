import type { User } from 'entities/User'

export enum ArticleBlockType {
  CODE = 'CODE',
  IMAGE = 'IMAGE',
  TEXT = 'TEXT',
}

export interface ArticleBlockBase {
  id: number
  type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export interface ArticleImageBlock
  extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE
  src: string
  title?: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
  type: ArticleBlockType.TEXT
  title?: string
  paragraphs: string[]
}

export type ArticleBlock =
  | ArticleCodeBlock
  | ArticleImageBlock
  | ArticleTextBlock

export enum ArticleType {
  ALL = 'ALL',
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
}

export interface Article {
  id: number
  user: User
  title: string
  subtitle: string
  img: string
  views: 1022
  createdAt: string
  types: ArticleType[]
  blocks: ArticleBlock[]
}

export enum ArticleSortField {
  VIEWS = 'views',
  TITLE = 'title',
  CREATED_AT = 'createdAt',
}
