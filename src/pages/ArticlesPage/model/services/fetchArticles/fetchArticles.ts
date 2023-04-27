import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { Article } from 'entities/Article'
import { getArticlesPagePage } from 'pages/ArticlesPage/model/selectors/getArticlesPagePage/getArticlesPagePage'
import { getArticlesPageLimit } from 'pages/ArticlesPage/model/selectors/getArticlesPageLimit/getArticlesPageLimit'

export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticles',
  async (_, { extra, rejectWithValue, getState }) => {
    const page = getArticlesPagePage(getState())
    const limit = getArticlesPageLimit(getState())

    try {
      const response = await extra.api.get<Article[]>(
        '/articles',
        {
          params: {
            _expand: 'user',
            _page: page,
            _limit: limit,
          },
        }
      )

      if (!response.data) {
        return rejectWithValue('error')
      }

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
