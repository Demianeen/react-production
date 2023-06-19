import type { StateSchema } from '@/app/providers/StoreProvider'
import { getArticleCommentListError } from './getArticleCommentListError'

describe('getArticleCommentsError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      articleCommentList: {
        error: 'error',
      },
    }
    expect(getArticleCommentListError(state as StateSchema)).toEqual(
      'error'
    )
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(getArticleCommentListError(state as StateSchema)).toEqual(
      undefined
    )
  })
})
