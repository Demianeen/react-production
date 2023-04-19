import type { StateSchema } from 'app/providers/StoreProvider'
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from 'entities/Article/model/selectors/articleDetails'
import { article } from '../const/tests'

describe('articleDetails', () => {
  it('should return the article details data', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data: article,
      },
    }
    expect(
      getArticleDetailsData(state as StateSchema)
    ).toEqual(article)
  })

  it('should work with empty state data', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsData(state as StateSchema)
    ).toEqual(undefined)
  })

  it('should return the article details is loading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true,
      },
    }
    expect(
      getArticleDetailsIsLoading(state as StateSchema)
    ).toEqual(true)
  })

  it('should work with empty state isLoading', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsIsLoading(state as StateSchema)
    ).toEqual(false)
  })

  it('should return the article details error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error',
      },
    }
    expect(
      getArticleDetailsError(state as StateSchema)
    ).toEqual('error')
  })

  it('should work with empty state error', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsError(state as StateSchema)
    ).toEqual(undefined)
  })
})
