import { buildSlice } from '@/shared/lib/store'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ArticleType } from '@/entities/Article'
import type { CreateArticleSchema } from '../types/createArticleSchema'

const initialState: CreateArticleSchema = {
  form: {
    img: '',
    subtitle: '',
    title: '',
    types: [],
  },
}

export const createArticleSlice = buildSlice({
  name: 'createArticle',
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.form.title = action.payload
    },
    updateSubtitle: (state, action: PayloadAction<string>) => {
      state.form.subtitle = action.payload
    },
    updateImg: (state, action: PayloadAction<string>) => {
      state.form.img = action.payload
    },
    updateTypes: (state, action: PayloadAction<ArticleType[]>) => {
      state.form.types = action.payload
    },
  },
})

export const {
  actions: createArticleActions,
  reducer: createArticleReducer,
  useActions: useCreateArticleActions,
} = createArticleSlice
