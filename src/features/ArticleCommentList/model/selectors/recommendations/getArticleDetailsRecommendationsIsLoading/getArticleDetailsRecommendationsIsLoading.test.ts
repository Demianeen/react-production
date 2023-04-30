import type { StateSchema } from 'app/providers/StoreProvider'
import { getArticleDetailsRecommendationsIsLoading } from './getArticleDetailsRecommendationsIsLoading'

// describe('getArticleDetailsRecommendationsIsLoading', () => {
//   it('should return the isLoading', () => {
//     const state: DeepPartial<StateSchema> = {
//       articleDetailsRecommendations: {
//         isLoading: true,
//       },
//     }
//     expect(
//       getArticleDetailsRecommendationsIsLoading(
//         state as StateSchema
//       )
//     ).toEqual(true)
//   })
//
//   it('should work with empty state', () => {
//     const state: DeepPartial<StateSchema> = {}
//
//     expect(
//       getArticleDetailsRecommendationsIsLoading(
//         state as StateSchema
//       )
//     ).toEqual(false)
//   })
// })

describe('getArticleDetailsRecommendationsIsLoading', () => {
  it('should return the isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetailsFooter: {
        recommendations: {
          isLoading: true,
        },
      },
    }
    expect(
      getArticleDetailsRecommendationsIsLoading(
        state as StateSchema
      )
    ).toEqual(true)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleDetailsRecommendationsIsLoading(
        state as StateSchema
      )
    ).toEqual(false)
  })
})
