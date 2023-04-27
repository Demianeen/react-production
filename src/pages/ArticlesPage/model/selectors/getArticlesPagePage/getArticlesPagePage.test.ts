import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPagePage } from './getArticlesPagePage'

describe('getArticlesPagePage', () => {
  it('should return the page', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        page: 2,
      },
    }
    expect(
      getArticlesPagePage(state as StateSchema)
    ).toEqual(2)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPagePage(state as StateSchema)
    ).toEqual(1)
  })
})
