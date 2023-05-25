export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'

export type { Article } from './model/types/article'
export type { ArticleDetailsSchema } from './model/types/articleDetailsSchema'
export { getArticleDetailsData } from './model/selectors/getArticleDetailsData/getArticleDetailsData'

export { ArticleList } from './ui/ArticleList/ArticleList'
export { VirtualizedArticleList } from './ui/ArticleList/VirtualizedArticleList'
export type { OnOpenArticle } from './ui/ArticleList/VirtualizedArticleList'

export { articleHandlers } from './model/mocks/articleHandlers'
export { articleDetailsHandlers } from './model/mocks/articleDetailsHandlers'
export { ArticleType } from '@/entities/Article/model/const/articleType'
