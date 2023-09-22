import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { useEffect } from 'react'
import { useUpdateSelectionBlockType } from '../../../model/services/updateSelectionBlockType'

export const UpdateSelectionBlockTypePlugin = () => {
  const [editor] = useLexicalComposerContext()

  const updateBlockType = useUpdateSelectionBlockType()

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
