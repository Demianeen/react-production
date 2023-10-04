export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export { ArticleThumbnail } from '@/entities/Article/ui/ArticleThumbnail/ArticleThumbnail'

export type { Article } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'

export {
  getArticleDetailsData,
  useArticleDetailsData,
} from './model/selectors/getArticleDetailsData/getArticleDetailsData'
export {
  getArticleDetailsAuthor,
  useArticleDetailsAuthor,
} from './model/selectors/getArticleDetailsAuthor/getArticleDetailsAuthor'
export { useArticleDetailsError } from './model/selectors/getArticleDetailsError/getArticleDetailsError'
export { useArticleDetailsIsLoading } from './model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
export { useArticleDetailsCanEdit } from './model/selectors/getArticleDetailsCanEdit/getArticleDetailsCanEdit'
export { useGetArticleDetailsQuery } from './model/api/articleDetailsApi'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { VirtualizedArticleList } from './ui/ArticleList/VirtualizedArticleList'
export type { OnOpenArticle } from './ui/ArticleList/VirtualizedArticleList'

export { ArticleType } from './model/const/articleType'
export { ArticleBlockType } from './model/const/articleBlockType'

export {
  useComputeListItemsLimit,
  computeListItemsLimit,
} from './model/lib/useComputeListItemsLimit'
