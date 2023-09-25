import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import {
  BlockType,
  type ArticleEditorSchema,
} from '../types/articleEditorSchema'

const initialState: ArticleEditorSchema = {
  selection: {
    blockType: BlockType.P,
    nodeKey: null,
    selectedNodeKey: null,
  },
  mouse: {
    topLevelNodeKey: null,
  },
}

export const articleEditorSlice = buildSlice({
  name: 'articleEditor',
  initialState,
  reducers: {
    setSelectionBlockType: (
      state,
      action: PayloadAction<BlockType>,
    ) => {
      state.selection.blockType = action.payload
    },
    setSelectionNodeKey: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.selection.nodeKey = action.payload
    },
    setSelectionSelectedNodeKey: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.selection.selectedNodeKey = action.payload
    },
    setMouseTopLevelNodeKey: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.mouse.topLevelNodeKey = action.payload
    },
  },
})

export const {
  actions: articleEditorActions,
  reducer: articleEditorReducer,
  useActions: useArticleEditorActions,
} = articleEditorSlice
