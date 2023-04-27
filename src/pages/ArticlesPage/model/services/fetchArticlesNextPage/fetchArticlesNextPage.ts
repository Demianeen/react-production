import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPagePage } from '../../selectors/getArticlesPagePage/getArticlesPagePage'
import { getArticlesPageHasMore } from '../../selectors/getArticlesPageHasMore/getArticlesPageHasMore'
import { articlesPageActions } from '../../slice/articlesPageSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { getArticlesPageIsLoading } from '../../selectors/getArticlesPageIsLoading/getArticlesPageIsLoading'

export const fetchArticlesNextPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticlesNextPage',
  (_, { getState, dispatch }) => {
    const page = getArticlesPagePage(getState())
    const hasMore = getArticlesPageHasMore(getState())
    const isLoading = getArticlesPageIsLoading(getState())

    if (hasMore && !isLoading) {
      dispatch(articlesPageActions.setPage(page + 1))
      dispatch(fetchArticles())
    }
  }
)
