import { buildSelector } from '@/shared/lib/store'
import { getArticleEditorState } from './getArticleEditorState'

export const [useArticleEditorMouse, getArticleEditorMouse] =
  buildSelector(getArticleEditorState, (state) => state?.mouse)

export const [
  useArticleEditorMouseTopLevelNodeKey,
  getArticleEditorMouseTopLevelNodeKey,
] = buildSelector(
  getArticleEditorMouse,
  (state) => state?.topLevelNodeKey
)
