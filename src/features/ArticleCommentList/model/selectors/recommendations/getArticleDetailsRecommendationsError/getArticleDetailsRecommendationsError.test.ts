import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsRecommendationsError } from './getArticleDetailsRecommendationsError'

// describe('getArticleDetailsRecommendationsError', () => {
//   it('should return the error', () => {
//     const state: DeepPartial<StateSchema> = {
//       articleDetailsRecommendations: {
//         error: 'error',
//       },
//     }
//     expect(
//       getArticleDetailsRecommendationsError(
//         state as StateSchema
//       )
//     ).toEqual('error')
//   })
//
//   it('should work with empty state', () => {
//     const state: DeepPartial<StateSchema> = {}
//
//     expect(
//       getArticleDetailsRecommendationsError(
//         state as StateSchema
//       )
//     ).toEqual(undefined)
//   })
// })

describe('getArticleDetailsRecommendationsError', () => {
  it('should return the error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsFooter: {
        recommendations: {
          error: 'error',
        },
      },
    }
    expect(
      getArticleDetailsRecommendationsError(
        state as StateSchema
      )
    ).toEqual('error')
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsRecommendationsError(
        state as StateSchema
      )
    ).toEqual(undefined)
  })
})
