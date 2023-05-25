import { RoutePath } from '@/shared/config/routeConfig/routePath'
import type { PageSchema } from '../types/PageSchema'
import { pageActions, pageReducer } from './pageSlice'

describe('pageSlice', () => {
  test('setScrollPosition', () => {
    const state: DeepPartial<PageSchema> = {
      scrollPosition: {
        [RoutePath.articles]: 250,
        [RoutePath.article_details]: 0,
      },
    }
    expect(
      pageReducer(
        state as PageSchema,
        pageActions.setScrollPosition({
          path: RoutePath.articles,
          position: 100,
        })
      )
    ).toEqual({
      scrollPosition: {
        [RoutePath.articles]: 100,
        [RoutePath.article_details]: 0,
      },
    })
  })
})
