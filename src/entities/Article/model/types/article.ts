import type { User } from '@/entities/User'
import type { ArticleBlockType } from '../const/articleBlockType'
import type { ArticleType } from '../const/articleType'

export interface ArticleBlockBase {
  id: number
  type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
  type: ArticleBlockType.CODE
  code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
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
