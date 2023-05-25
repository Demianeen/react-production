import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from '@/app/providers/StoreProvider'
import type { Comment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { getArticleDetailsData } from '@/entities/Article'
import { articleCommentListActions } from '../../slice/articleCommentListSlice'

export const sendArticleComment = createAsyncThunk<
  Comment,
  string,
  ThunkConfig<string>
>(
  'articleCommentList/sendArticleComment',
  async (
    commentBody,
    { extra, rejectWithValue, getState, dispatch }
  ) => {
    const user = getUserAuthData(getState())
    const articleId = getArticleDetailsData(getState())?.id

    if (!user || !commentBody || !articleId) {
      return rejectWithValue('no data')
    }

    try {
      const response = await extra.api.post<Comment>(
        '/comments',
        {
          body: commentBody,
          articleId,
          userId: user.id,
        }
      )

      if (!response.data) {
        return rejectWithValue('error')
      }

      const newComment = { ...response.data, user }

      // update article comment list
      dispatch(
        articleCommentListActions.addComment(newComment)
      )

      return response.data
    } catch (error) {
      return rejectWithValue('error')
    }
  }
)
