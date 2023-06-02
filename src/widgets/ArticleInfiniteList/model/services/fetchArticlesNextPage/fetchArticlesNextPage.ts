import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleInfiniteListPage } from '../../selectors/getArticleInfiniteListPage/getArticleInfiniteListPage'
import { getArticleInfiniteListHasMore } from '../../selectors/getArticleInfiniteListHasMore/getArticleInfiniteListHasMore'
import { articleInfiniteListActions } from '../../slice/articleInfiniteListSlice'
import { fetchArticles } from '../fetchArticles/fetchArticles'
import { getArticleInfiniteListIsLoading } from '../../selectors/getArticleInfiniteListIsLoading/getArticleInfiniteListIsLoading'

export const fetchArticlesNextPage = createAsyncThunk<
  void,
  void,
  ThunkConfig<string>
>(
  'articleInfiniteList/fetchArticlesNextPage',
  (_, { getState, dispatch }) => {
    const page = getArticleInfiniteListPage(getState())
    const hasMore = getArticleInfiniteListHasMore(
      getState()
    )
    const isLoading = getArticleInfiniteListIsLoading(
      getState()
    )

    if (hasMore && !isLoading) {
      dispatch(articleInfiniteListActions.setPage(page + 1))
      dispatch(fetchArticles())
    }
  }
)
