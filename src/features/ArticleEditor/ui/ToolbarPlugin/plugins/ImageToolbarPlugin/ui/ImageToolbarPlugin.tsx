import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback, useState } from 'react'
import { Icon, IconType } from '@/shared/ui/deprecated/Icon'
import ImageIcon from '@/shared/assets/icons/redesigned/textEditor/image.svg'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'
import type { ImagePromptValues } from './ImagePrompt'
import { ImagePrompt } from './ImagePrompt'
import {
  INSERT_IMAGE_BLOCK_COMMAND,
  InsertImagePlugin,
} from '../../../../plugins/ImageBlockPlugin/plugins/ImageBlockPlugin/InsertImagePlugin'

export interface ImageToolbarPluginProps {
  className?: string
}

export const ImageToolbarPlugin = typedMemo(
  ({ className }: ImageToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()
    const [isPromptOpen, setIsPromptOpen] = useState(false)

    const onOpenPrompt = useCallback((_: React.MouseEvent) => {
      setIsPromptOpen(true)
    }, [])

    const onClosePrompt = useCallback(() => {
      setIsPromptOpen(false)
    }, [])

    const createImage = useCallback(
      ({ src, altText }: ImagePromptValues) => {
        editor.dispatchCommand(INSERT_IMAGE_BLOCK_COMMAND, {
          src,
          altText,
        })
        onClosePrompt()
      },
      [editor, onClosePrompt],
    )

    return (
      <div className={className}>
        <Button
          type='button'
          onClick={onOpenPrompt}
          theme={ButtonTheme.CLEAR}
          className={getHStackClassName({
            justify: 'center',
            align: 'center',
          })}
        >
          <Icon
            Svg={ImageIcon}
            type={IconType.STROKE}
            width={24}
            height={24}
          />
        </Button>
        <InsertImagePlugin />
        {isPromptOpen && (
          <ImagePrompt
            onSubmit={createImage}
            onClose={onClosePrompt}
          />
        )}
      </div>
    )
  },
)
