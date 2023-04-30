import { View } from 'entities/View'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { SortedArticleListSchema } from '../types/sortedArticleListSchema'
import {
  sortedArticleListActions,
  sortedArticleListReducer,
} from './sortedArticleListSlice'

describe('sortedArticleList', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('setView', () => {
    const state: DeepPartial<SortedArticleListSchema> = {
      view: View.GRID,
    }
    expect(
      sortedArticleListReducer(
        state as SortedArticleListSchema,
        sortedArticleListActions.setView(View.LIST)
      )
    ).toEqual({
      view: View.LIST,
    })
  })

  test('initState with localstorage view value empty', () => {
    const state: DeepPartial<SortedArticleListSchema> = {}
    expect(
      sortedArticleListReducer(
        state as SortedArticleListSchema,
        sortedArticleListActions.initState()
      )
    ).toEqual({
      view: View.GRID,
    })
  })

  test('initState with localstorage view value', () => {
    const state: DeepPartial<SortedArticleListSchema> = {}
    localStorage.setItem(
      ARTICLE_VIEW_LOCALSTORAGE_KEY,
      View.LIST
    )
    expect(
      sortedArticleListReducer(
        state as SortedArticleListSchema,
        sortedArticleListActions.initState()
      )
    ).toEqual({
      view: View.LIST,
    })
  })
})
