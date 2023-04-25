import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageIsLoading } from './getArticlesPageIsLoading'

describe('getArticlesPageIsLoading', () => {
  it('should return the isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        isLoading: true,
      },
    }
    expect(
      getArticlesPageIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
