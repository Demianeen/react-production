import type { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'

export const getArticleEditorState = (state: StateSchema) =>
  state.articleEditor

export const [useArticleEditorSelection, getArticleEditorSelection] =
  buildSelector(getArticleEditorState, (state) => state?.selection)

export const [useArticleEditorBlockType, getArticleEditorBlockType] =
  buildSelector(
    getArticleEditorSelection,
    (state) => state?.blockType
  )
