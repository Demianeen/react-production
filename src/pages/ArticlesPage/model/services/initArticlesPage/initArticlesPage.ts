import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import { sortedArticleListActions } from 'features/SortedArticlesList'
import { initQueryParams } from 'shared/lib/url/initQueryParams/initQueryParams'
import type { SortOrder } from 'shared/types/sort'
import type {
  ArticleSortField,
  ArticleType,
} from 'entities/Article/model/types/article'
import { articlesPageActions } from '../../slice/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { getArticlesPageIsInitialized } from '../../selectors/getArticlesPageIsInitialized/getArticlesPageIsInitialized'

export const initArticlesPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/initArticlesPage',
  async (_, { dispatch, getState }) => {
    const isInitialized = getArticlesPageIsInitialized(
      getState()
    )

    if (!isInitialized) {
      initQueryParams({
        sortField: (param: ArticleSortField) =>
          dispatch(
            sortedArticleListActions.setSortField(param)
          ),
        order: (param: SortOrder) =>
          dispatch(
            sortedArticleListActions.setOrder(param)
          ),
        search: (param: string) =>
          dispatch(
            sortedArticleListActions.setSearch(param)
          ),
        type: (param: ArticleType) =>
          dispatch(sortedArticleListActions.setType(param)),
      })

      dispatch(articlesPageActions.initState())
      dispatch(fetchArticles())
    }
  }
)
