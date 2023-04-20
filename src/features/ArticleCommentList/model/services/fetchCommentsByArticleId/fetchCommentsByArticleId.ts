import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'app/providers/StoreProvider'
import type { Comment } from 'entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<
  Comment[],
  number,
  ThunkConfig<string>
>(
  'articleComments/fetchCommentsByArticleId',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      const response = await extra.api.get<Comment[]>(
        '/comments',
        {
          params: {
            articleId,
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
