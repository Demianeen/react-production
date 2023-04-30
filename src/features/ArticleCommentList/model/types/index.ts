import type { ArticleDetailsRecommendationsSchema } from './articleDetailsRecommendationsSchema'
import type { ArticleCommentListSliceSchema } from './articleCommentListSliceSchema'

export interface ArticleDetailsFooterSchema {
  comments: ArticleCommentListSliceSchema
  recommendations: ArticleDetailsRecommendationsSchema
}
