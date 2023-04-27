import type { PageSchema } from 'widgets/Page'
import { pageReducer } from 'widgets/Page'
import { pageActions } from 'widgets/Page/model/slice/pageSlice'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

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
