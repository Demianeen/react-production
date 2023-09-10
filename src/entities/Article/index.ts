export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'

export type { Article } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'

export {
  getArticleDetailsData,
  useArticleDetailsData,
} from './model/selectors/getArticleDetailsData/getArticleDetailsData'
export { useArticleDetailsError } from './model/selectors/getArticleDetailsError/getArticleDetailsError'
export { useArticleDetailsIsLoading } from './model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading'
export { useArticleDetailsCanEdit } from './model/selectors/getArticleDetailsCanEdit/getArticleDetailsCanEdit'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { VirtualizedArticleList } from './ui/ArticleList/VirtualizedArticleList'
export type { OnOpenArticle } from './ui/ArticleList/VirtualizedArticleList'

export { ArticleType } from '@/entities/Article/model/const/articleType'

export {
  useComputeListItemsLimit,
  computeListItemsLimit,
} from './model/lib/useComputeListItemsLimit'

export { ArticleImageBlockComponent } from './ui/ArticleImageBlockComponent/ArticleImageBlockComponent'
