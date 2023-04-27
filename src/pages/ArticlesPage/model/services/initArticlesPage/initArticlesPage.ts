import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
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
      dispatch(articlesPageActions.initState())
      dispatch(fetchArticles())
    }
  }
)
