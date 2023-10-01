import { buildSelector } from '@/shared/lib/store'
import { getEditorState } from './getEditorState'

export const [useEditorSelection, getEditorSelection] = buildSelector(
  getEditorState,
  (state) => state?.selection,
)

export const [
  useEditorSelectionBlockType,
  getEditorSelectionBlockType,
] = buildSelector(getEditorSelection, (state) => state?.blockType)

export const [useEditorSelectionNodeKey, getEditorSelectionNodeKey] =
  buildSelector(getEditorSelection, (state) => state?.nodeKey)

export const [
  useEditorSelectionSelectedNodeKey,
  getEditorSelectionSelectedNodeKey,
] = buildSelector(
  getEditorSelection,
  (state) => state?.selectedNodeKey,
)
