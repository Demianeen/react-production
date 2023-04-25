import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticlesPageError } from './getArticlesPageError'

describe('getArticlesPageError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      articlesPage: {
        error: 'error',
      },
    }
    expect(
      getArticlesPageError(state as StateSchema)
    ).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticlesPageError(state as StateSchema)
    ).toEqual(undefined)
  })
})
