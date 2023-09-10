import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { ImageNodeOld2 } from '../../nodes/ImageNode'
import { insertImageBlock } from '../../nodes/insertImageBlock'
import { ImageBlockNodeOld2 } from '../../nodes/ImageBlockNode'

export interface ImageBlockPluginProps {
  className?: string
}

export const INSERT_IMAGE_BLOCK_COMMAND = createCommand<string>(
  'INSERT_IMAGE_COMMAND'
)

export const ImageBlockPluginOld2 = typedMemo(() => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([ImageBlockNodeOld2, ImageNodeOld2])) {
      throw new Error(
        'ImageBlockPlugin: ImageNode and ImageNodeBlock not registered on editor'
      )
    }

    editor.registerCommand(
      INSERT_IMAGE_BLOCK_COMMAND,
      (payload) => {
        insertImageBlock(editor, payload)
        return true
      },
      COMMAND_PRIORITY_EDITOR
    )
  }, [editor])

  return null
})
