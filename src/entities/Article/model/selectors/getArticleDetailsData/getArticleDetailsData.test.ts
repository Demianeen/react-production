import type { StateSchema } from 'app/providers/StoreProvider'
import { article } from '../../mocks/data'
import { getArticleDetailsData } from './getArticleDetailsData'

describe('getArticleDetailsData', () => {
  it('should return the data', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: article,
      },
    }
    expect(
      getArticleDetailsData(state as StateSchema)
    ).toEqual(article)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsData(state as StateSchema)
    ).toEqual(undefined)
  })
})
