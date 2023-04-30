import type { StateSchema } from 'app/providers/StoreProvider'
import { View } from 'entities/View'
import { INITIAL_ARTICLE_VIEW } from 'features/SortedArticlesList/model/const/view'
import { getSortedArticleListView } from './getSortedArticleListView'

describe('getSortedArticleListView', () => {
  it('should return the view', () => {
    const state: DeepPartial<StateSchema> = {
      sortedArticleList: {
        view: View.LIST,
      },
    }
    expect(
      getSortedArticleListView(state as StateSchema)
    ).toEqual(View.LIST)
  })

  it('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}

    expect(
      getSortedArticleListView(state as StateSchema)
    ).toEqual(INITIAL_ARTICLE_VIEW)
  })
})
