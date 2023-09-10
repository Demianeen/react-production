import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { mergeRegister } from '@lexical/utils'
import {
  $createParagraphNode,
  $getNodeByKey,
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  INSERT_LINE_BREAK_COMMAND,
  INSERT_PARAGRAPH_COMMAND,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ENTER_COMMAND,
} from 'lexical'
import { useEffect } from 'react'

interface OneLinePluginProps {
  nodeKey: string
}

/**
 * Makes editor to be one line editor. Any other action will be initiated in parentEditor
 * Prevent to enter new paragraph node in editor
 */
export const OneLinePlugin = ({ nodeKey }: OneLinePluginProps) => {
  const [editor] = useLexicalComposerContext()
  const parentEditor = editor._parentEditor

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        INSERT_PARAGRAPH_COMMAND,
        () => {
          parentEditor?.update(() => {
            const imageNode = $getNodeByKey(nodeKey)
            const paragraphNode = $createParagraphNode()
            imageNode?.getLatest().insertAfter(paragraphNode)
            paragraphNode.select()
          })
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        INSERT_LINE_BREAK_COMMAND,
        () => {
          parentEditor?.update(() => {
            const imageNode = $getNodeByKey(nodeKey)
            const paragraphNode = $createParagraphNode()
            imageNode?.getLatest().insertAfter(paragraphNode)
            paragraphNode.select()
          })
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ARROW_DOWN_COMMAND,
        () => {
          parentEditor?.update(() => {
            const imageNode = $getNodeByKey(nodeKey)
            imageNode?.getLatest().selectNext()
          })
          return true
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        (event) => {
          if (event?.shiftKey) {
            parentEditor?.update(() => {
              const imageNode = $getNodeByKey(nodeKey)
              const paragraphNode = $createParagraphNode()
              imageNode?.getLatest().insertBefore(paragraphNode)
              paragraphNode.select()
            })
            return true
          }
          return false
        },
        COMMAND_PRIORITY_NORMAL
      )
    )
  }, [editor, nodeKey, parentEditor])

  return null
}
