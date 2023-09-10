import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Button } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import ImageIcon from '@/shared/assets/icons/redesigned/textEditor/image.svg'
import {
  INSERT_IMAGE_BLOCK_COMMAND,
  ImageBlockPlugin,
} from '../../../plugins/imageBlock/plugins/ImageBlockPlugin/ImageBlockPlugin'

export interface ImageToolbarPluginProps {
  className?: string
}

export const ImageToolbarPlugin = typedMemo(
  ({ className }: ImageToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const onClick = useCallback(
      (_: React.MouseEvent) => {
        editor.dispatchCommand(INSERT_IMAGE_BLOCK_COMMAND, {
          src: 'https://images.pexels.com/photos/5656637/pexels-photo-5656637.jpeg?auto=compress&cs=tinysrgb&w=200',
          altText: 'alt text',
        })
      },
      [editor]
    )

    return (
      <div className={className}>
        <Button type='button' onClick={onClick}>
          <ImageIcon />
        </Button>
        <ImageBlockPlugin />
      </div>
    )
  }
)
