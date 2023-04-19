import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsIsLoading } from './getArticleDetailsIsLoading'

describe('getArticleDetailsIsLoading', () => {
  it('should return the isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    }
    expect(
      getArticleDetailsIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
