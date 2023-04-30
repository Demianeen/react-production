import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleCommentListIsLoading } from './getArticleCommentListIsLoading'

describe('getArticleCommentsIsLoading', () => {
  it('should return the isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsFooter: {
        comments: { isLoading: true },
      },
    }
    expect(
      getArticleCommentListIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleCommentListIsLoading(state as StateSchema)
    ).toEqual(false)
  })
})
