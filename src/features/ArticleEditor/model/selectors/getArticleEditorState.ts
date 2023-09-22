import type { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleEditorState = (state: StateSchema) =>
  state.articleEditor
