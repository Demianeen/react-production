import { routes } from '@/shared/lib/router/routes'
import type { PageSchema } from '../types/PageSchema'
import { pageActions, pageReducer } from './pageSlice'

describe('pageSlice', () => {
  test('setScrollPosition', () => {
    const state: DeepPartial<PageSchema> = {
      scrollPosition: {
        [routes.articles()]: 250,
        [routes.articleDetails({ id: '1' })]: 0,
      },
    }
    expect(
      pageReducer(
        state as PageSchema,
        pageActions.setScrollPosition({
          path: routes.articles(),
          position: 100,
        })
      )
    ).toEqual({
      scrollPosition: {
        [routes.articles()]: 100,
        [routes.articleDetails({ id: '1' })]: 0,
      },
    })
  })
})
