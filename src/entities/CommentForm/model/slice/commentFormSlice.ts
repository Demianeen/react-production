import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { CommentFormSchema } from '../types/commentFormSchema'

const initialState: CommentFormSchema = {
  body: '',
}

export const commentFormSlice = createSlice({
  name: 'commentForm',
  initialState,
  reducers: {
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload
    },
  },
})

export const { actions: commentFormActions } = commentFormSlice
export const { reducer: commentFormReducer } = commentFormSlice
