import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import {
  BlockType,
  type ArticleEditorSchema,
} from '../types/articleEditorSchema'

const initialState: ArticleEditorSchema = {
  blockType: BlockType.P,
}

export const articleEditorSlice = buildSlice({
  name: 'articleEditor',
  initialState,
  reducers: {
    setBlockType: (state, action: PayloadAction<BlockType>) => {
      state.blockType = action.payload
    },
  },
})

export const {
  actions: articleEditorActions,
  reducer: articleEditorReducer,
  useActions: useArticleEditorActions,
} = articleEditorSlice
