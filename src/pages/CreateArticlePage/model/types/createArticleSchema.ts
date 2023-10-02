import type { ArticleType } from '@/entities/Article'

export interface CreateArticleForm {
  title: string
  subtitle: string
  img: string
  types: ArticleType[]
}

export interface CreateArticleSchema {
  form: CreateArticleForm
}
