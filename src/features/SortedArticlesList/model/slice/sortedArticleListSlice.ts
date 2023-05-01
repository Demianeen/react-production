import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { SortOrder } from 'shared/types/sort'
import type { View } from 'entities/View'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import type { ArticleType } from 'entities/Article'
import type { SortedArticleListSchema } from '../types/sortedArticleListSchema'
import { ArticleSortField } from '../types/sortedArticleListSchema'
import { INITIAL_ARTICLE_VIEW } from '../const/view'

const initialState: SortedArticleListSchema = {
  view: INITIAL_ARTICLE_VIEW,
  order: SortOrder.ASC,
  search: '',
  sort: ArticleSortField.CREATED_AT,
  // FIXME: resolve dependency cycle
  type: 'all' as ArticleType.ALL,
}

export const sortedArticleListSlice = createSlice({
  name: 'sortedArticleList',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSortField: (
      state,
      action: PayloadAction<ArticleSortField>
    ) => {
      state.sort = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setView: (state, action: PayloadAction<View>) => {
      state.view = action.payload
      localStorage.setItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY,
        action.payload
      )
    },
    setType: (
      state,
      action: PayloadAction<ArticleType>
    ) => {
      state.type = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as View
      state.view = view ?? INITIAL_ARTICLE_VIEW
    },
  },
})

export const { actions: sortedArticleListActions } =
  sortedArticleListSlice
export const { reducer: sortedArticleListReducer } =
  sortedArticleListSlice
