import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsError } from './getArticleDetailsError'

describe('getArticleDetailsError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error',
      },
    }
    expect(
      getArticleDetailsError(state as StateSchema)
    ).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsError(state as StateSchema)
    ).toEqual(undefined)
  })
})
