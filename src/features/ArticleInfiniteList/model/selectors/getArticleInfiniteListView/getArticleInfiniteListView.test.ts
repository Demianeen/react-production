import type { StateSchema } from 'app/providers/StoreProvider'
import { View } from 'entities/ListFilters'
import { getArticleInfiniteListView } from './getArticleInfiniteListView'
import { INITIAL_ARTICLE_VIEW } from '../../const/view'

describe('getArticleInfiniteListView', () => {
  it('should return the view', () => {
    const state: DeepPartial<StateSchema> = {
      articleInfiniteList: {
        view: View.LIST,
      },
    }
    expect(
      getArticleInfiniteListView(state as StateSchema)
    ).toEqual(View.LIST)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getArticleInfiniteListView(state as StateSchema)
    ).toEqual(INITIAL_ARTICLE_VIEW)
  })
})
