import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleInfiniteListError } from './getArticleInfiniteListError'

describe('getArticleInfiniteListError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        error: 'error',
      },
    }
    expect(
      getArticleInfiniteListError(state as StateSchema)
    ).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListError(state as StateSchema)
    ).toEqual(undefined)
  })
})
