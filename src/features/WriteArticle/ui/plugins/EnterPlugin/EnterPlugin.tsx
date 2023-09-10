import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $getSelection,
  COMMAND_PRIORITY_LOW,
  KEY_ENTER_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

/**
 * Modifies enter functionality for editor.
 */
export const EnterPlugin = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          if (!event?.shiftKey) {
            return false
          }
          event.preventDefault()
          editor?.update(() => {
            const selection = $getSelection()
            const node = selection?.getNodes()[0]
            const paragraphNode = $createParagraphNode()
            node?.insertBefore(paragraphNode)
            paragraphNode.select()
          })
          return true
        },
        COMMAND_PRIORITY_LOW
      )
    )
  }, [editor])

  return null
}
