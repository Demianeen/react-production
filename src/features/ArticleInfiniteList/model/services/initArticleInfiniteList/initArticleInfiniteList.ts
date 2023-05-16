import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import { initQueryParams } from 'shared/lib/url/initQueryParams/initQueryParams'
import type { SortOrder } from 'shared/types/sort'
import type { ArticleType } from 'entities/Article/model/types/article'
import type { SortField } from 'entities/ListFilters'
import { articleInfiniteListActions } from '../../slice/articleInfiniteListSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { getArticleInfiniteListIsInitialized } from '../../selectors/getArticleInfiniteListIsInitialized/getArticleInfiniteListIsInitialized'

export const initArticleInfiniteList = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articleInfiniteList/initArticleInfiniteList',
  async (_, { dispatch, getState }) => {
    const isInitialized =
      getArticleInfiniteListIsInitialized(getState())

    if (!isInitialized) {
      initQueryParams({
        sortField: (param: SortField) =>
          dispatch(
            articleInfiniteListActions.setSortField(param)
          ),
        order: (param: SortOrder) =>
          dispatch(
            articleInfiniteListActions.setOrder(param)
          ),
        search: (param: string) =>
          dispatch(
            articleInfiniteListActions.setSearch(param)
          ),
        type: (param: ArticleType) =>
          dispatch(
            articleInfiniteListActions.setType(param)
          ),
      })

      dispatch(articleInfiniteListActions.initState())
      dispatch(fetchArticles())
    }
  }
)
