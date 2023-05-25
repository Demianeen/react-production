import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/StoreProvider'
import type { Article } from '../../types/article'

export const fetchArticleById = createAsyncThunk<
  Article,
  number,
  ThunkConfig<string>
>(
  'article-details.json/fetchArticleById',
  async (id, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get(
        `/articles/${id}`,
        {
          params: {
            _expand: 'user',
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
