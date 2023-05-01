import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsAuthor } from './getArticleDetailsAuthor'

describe('getArticleDetailsAuthor', () => {
  it('should return the author', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: {
          user: {
            id: 1,
          },
        },
      },
    }
    expect(
      getArticleDetailsAuthor(state as StateSchema)
    ).toEqual({ id: 1 })
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsAuthor(state as StateSchema)
    ).toEqual(undefined)
  })
})
