import { getMockArray } from '@/shared/lib/tests/entities/getMockArray'
import { getMockEntities } from '@/shared/lib/tests/entities/getMockEntities'
import { getMockIds } from '@/shared/lib/tests/entities/getMockIds'
import { mockArticle } from './mockArticle'

export const mockArticles = getMockArray(mockArticle, 12)
export const mockArticleEntities =
  getMockEntities(mockArticles)
export const mockArticleIds = getMockIds(mockArticles)

export const anotherMockArticles = getMockArray(
  mockArticle,
  12,
  12
)
export const anotherMockArticleEntities = getMockEntities(
  anotherMockArticles
)
export const anotherMockArticleIds = getMockIds(
  anotherMockArticles
)
