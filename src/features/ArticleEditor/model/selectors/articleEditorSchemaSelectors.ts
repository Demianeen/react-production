import type { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'

export const getArticleEditorState = (state: StateSchema) =>
  state.articleEditor

export const [useArticleEditorBlockType, getArticleEditorBlockType] =
  buildSelector(getArticleEditorState, (state) => state?.blockType)
