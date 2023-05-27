import type { Rating } from '@/entities/Rating'

export interface ArticleRating extends Rating {
  articleId: number
}
