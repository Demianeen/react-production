import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  $createParagraphNode,
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  COMMAND_PRIORITY_NORMAL,
  KEY_ENTER_COMMAND,
  createCommand,
} from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { mergeRegister } from '@lexical/utils'
import type { ImageBlockPayload } from '../../nodes/ImageBlockNode'
import {
  $createImageBlockNode,
  $isImageBlockNode,
  ImageBlockNode,
} from '../../nodes/ImageBlockNode'

export const INSERT_IMAGE_BLOCK_COMMAND =
  createCommand<ImageBlockPayload>('INSERT_IMAGE_COMMAND')

export const InsertImagePlugin = typedMemo(() => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageBlockNode])) {
      throw new Error(
        'ImageBlockPlugin: ImageNode not registered on articleEditor'
      )
    }

    return mergeRegister(
      editor.registerCommand<ImageBlockPayload>(
        INSERT_IMAGE_BLOCK_COMMAND,
        (payload) => {
          editor.update(() => {
            const selection = $getSelection()
            const node = selection?.getNodes()[0]
            const imageNode = $createImageBlockNode(payload)
            node?.replace(imageNode)
          })

          return true
        },
        COMMAND_PRIORITY_EDITOR
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          const selection = $getSelection()
          const node = selection?.getNodes()[0]

          if ($isImageBlockNode(node)) {
            const paragraphNode = $createParagraphNode()
            node.insertBefore(paragraphNode)
            paragraphNode.select()

            return true
          }

          return false
        },
        COMMAND_PRIORITY_NORMAL
      )
    )
  }, [editor])

  return null
})
