import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_LOW,
  KEY_BACKSPACE_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

interface DeleteEditorPluginProps {
  onDelete: () => void
}

export const DeleteEditorPlugin = ({
  onDelete,
}: DeleteEditorPluginProps) => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    editor.registerCommand(
      KEY_BACKSPACE_COMMAND,
      () => {
        const selection = $getSelection()
        if (!$isRangeSelection(selection)) {
          return false
        }

        // if we are at the beginning of the articleEditor
        if (selection.anchor.offset === 0) {
          onDelete()
        }

        return false
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor, onDelete])

  return null
}
