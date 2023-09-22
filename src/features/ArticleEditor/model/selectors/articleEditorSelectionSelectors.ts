import { buildSelector } from '@/shared/lib/store'
import { getArticleEditorState } from './getArticleEditorState'

export const [useArticleEditorSelection, getArticleEditorSelection] =
  buildSelector(getArticleEditorState, (state) => state?.selection)

export const [
  useArticleEditorSelectionBlockType,
  getArticleEditorSelectionBlockType,
] = buildSelector(
  getArticleEditorSelection,
  (state) => state?.blockType
)
