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
import type { ImagePayload } from '../../lib/ImageNode/ImageNode'
import {
  $createImageNode,
  $isImageNode,
  ImageNode,
} from '../../lib/ImageNode/ImageNode'

export const INSERT_IMAGE_BLOCK_COMMAND = createCommand<ImagePayload>(
  'INSERT_IMAGE_COMMAND',
)

export const ImagePlugin = typedMemo(() => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageNode])) {
      throw new Error(
        'ImagePlugin: ImageNode not registered on articleEditor',
      )
    }

    return mergeRegister(
      editor.registerCommand<ImagePayload>(
        INSERT_IMAGE_BLOCK_COMMAND,
        (payload) => {
          editor.update(() => {
            const selection = $getSelection()
            const node = selection?.getNodes()[0]
            const imageNode = $createImageNode(payload)
            node?.replace(imageNode)
          })

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        KEY_ENTER_COMMAND,
        () => {
          const selection = $getSelection()
          const node = selection?.getNodes()[0]

          if ($isImageNode(node)) {
            const paragraphNode = $createParagraphNode()
            node.insertBefore(paragraphNode)
            paragraphNode.select()

            return true
          }

          return false
        },
        COMMAND_PRIORITY_NORMAL,
      ),
    )
  }, [editor])

  return null
})
