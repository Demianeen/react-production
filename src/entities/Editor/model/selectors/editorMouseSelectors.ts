import { buildSelector } from '@/shared/lib/store'
import { getEditorState } from './getEditorState'

export const [useEditorMouse, getEditorMouse] = buildSelector(
  getEditorState,
  (state) => state?.mouse,
)

export const [
  useEditorMouseTopLevelNodeKey,
  getEditorMouseTopLevelNodeKey,
] = buildSelector(getEditorMouse, (state) => state?.topLevelNodeKey)
