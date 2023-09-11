import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useEffect } from 'react'
import { useUpdateBlockType } from '../../../model/services/updateBlockType'

export const UpdateEditorBlockTypePlugin = () => {
  const [editor] = useLexicalComposerContext()

  const updateBlockType = useUpdateBlockType()

  useEffect(
    () =>
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, activeArticleEditor) => {
          updateBlockType(activeArticleEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL
      ),
    [editor, updateBlockType]
  )

  return null
}
