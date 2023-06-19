import type { StateSchema } from '@/app/providers/StoreProvider'
import { mockArticle } from '../../mocks/mockArticle'
import { getArticleDetailsData } from './getArticleDetailsData'

describe('getArticleDetailsData', () => {
  it('should return the data', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: mockArticle,
      },
    }
    expect(getArticleDetailsData(state as StateSchema)).toEqual(
      mockArticle
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getArticleDetailsData(state as StateSchema)).toEqual(
      undefined
    )
  })
})
