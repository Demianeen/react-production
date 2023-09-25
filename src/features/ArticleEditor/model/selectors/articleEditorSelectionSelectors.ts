import { buildSelector } from '@/shared/lib/store'
import { getArticleEditorState } from './getArticleEditorState'

export const [useArticleEditorSelection, getArticleEditorSelection] =
  buildSelector(getArticleEditorState, (state) => state?.selection)

export const [
  useArticleEditorSelectionBlockType,
  getArticleEditorSelectionBlockType,
] = buildSelector(
  getArticleEditorSelection,
  (state) => state?.blockType,
)

export const [
  useArticleEditorSelectionNodeKey,
  getArticleEditorSelectionNodeKey,
] = buildSelector(
  getArticleEditorSelection,
  (state) => state?.nodeKey,
)

export const [
  useArticleEditorSelectionSelectedNodeKey,
  getArticleEditorSelectionSelectedNodeKey,
] = buildSelector(
  getArticleEditorSelection,
  (state) => state?.selectedNodeKey,
)
