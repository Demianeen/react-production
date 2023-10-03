import type { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import { BlockType, type EditorSchema } from '../types/editorSchema'

const initialState: EditorSchema = {
  // TODO: Put selection logic in SelectBlockTypeToolbarPlugin
  selection: {
    blockType: BlockType.P,
    nodeKey: null,
    selectedNodeKey: null,
  },
  mouse: {
    topLevelNodeKey: null,
  },
}

export const editorSlice = buildSlice({
  name: 'editor',
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
  actions: editorActions,
  reducer: editorReducer,
  useActions: useEditorActions,
} = editorSlice
