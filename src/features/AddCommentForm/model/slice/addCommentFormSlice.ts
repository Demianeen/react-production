import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AddCommentFormSchema } from '../types/addCommentFormSchema'

const initialState: AddCommentFormSchema = {
  body: '',
}

export const addCommentFormSlice = createSlice({
  name: 'addCommentForm',
  initialState,
  reducers: {
    setBody: (state, action: PayloadAction<string>) => {
      state.body = action.payload
    },
  },
})

export const { actions: addCommentFormActions } =
  addCommentFormSlice
export const { reducer: addCommentFormReducer } =
  addCommentFormSlice
