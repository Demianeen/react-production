import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  $createParagraphNode,
  $getSelection,
  $insertNodes,
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

export const ImageBlockPlugin = typedMemo(() => {
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
          const imageNode = $createImageBlockNode(payload)
          const paragraphNode = $createParagraphNode()
          $insertNodes([imageNode, paragraphNode])

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
      // articleEditor.registerCommand<DragEvent>(
      //   DRAGSTART_COMMAND,
      //   (event) => {
      //     return onDragStart(event)
      //   },
      //   COMMAND_PRIORITY_HIGH
      // ),
      // articleEditor.registerCommand<DragEvent>(
      //   DRAGOVER_COMMAND,
      //   (event) => {
      //     return onDragover(event)
      //   },
      //   COMMAND_PRIORITY_LOW
      // ),
      // articleEditor.registerCommand<DragEvent>(
      //   DROP_COMMAND,
      //   (event) => {
      //     return onDrop(event, articleEditor)
      //   },
      //   COMMAND_PRIORITY_HIGH
      // )
    )
  }, [editor])

  return null
})
