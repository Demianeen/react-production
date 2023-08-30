import { buildSlice } from '@/shared/lib/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CreateArticleSchema } from '../types/createArticleSchema'

const initialState: CreateArticleSchema = {
  form: {
    content: '',
    img: '',
    subtitle: '',
    title: '',
  },
}

export const createArticleSlice = buildSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    updateContent: (state, action: PayloadAction<string>) => {
      state.form.content = action.payload
    },
    updateImg: (state, action: PayloadAction<string>) => {
      state.form.img = action.payload
    },
    updateSubtitle: (state, action: PayloadAction<string>) => {
      state.form.subtitle = action.payload
    },
    updateTitle: (state, action: PayloadAction<string>) => {
      state.form.title = action.payload
    },
  },
})

export const {
  actions: createArticleActions,
  reducer: createArticleReducer,
  useActions: useCreateArticleActions,
} = createArticleSlice
