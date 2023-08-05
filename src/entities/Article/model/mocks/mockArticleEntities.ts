import { getMockEntityAdapterData } from '@/shared/lib/tests/getMockEntityAdapterData/getMockEntityAdapterData'
import { mockArticle } from './mockArticle'

export const {
  array: mockArticles,
  entities: mockArticleEntities,
  ids: mockArticleIds,
} = getMockEntityAdapterData(mockArticle, 12)

export const {
  array: anotherMockArticles,
  entities: anotherMockArticleEntities,
  ids: anotherMockArticleIds,
} = getMockEntityAdapterData(mockArticle, 12, 2)
