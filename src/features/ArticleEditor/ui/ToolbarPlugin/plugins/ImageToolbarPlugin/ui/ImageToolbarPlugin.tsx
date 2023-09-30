import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback, useState } from 'react'
import {
  Icon as IconDeprecated,
  IconType,
} from '@/shared/ui/deprecated/Icon'
import ImageIcon from '@/shared/assets/icons/redesigned/textEditor/image.svg'
import { ToggleFeature } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
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

    const onOpenPrompt = useCallback(() => {
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
      <>
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <Icon
              Svg={ImageIcon}
              width={24}
              height={24}
              onClick={onOpenPrompt}
              tooltipText='Insert Image'
              className={className}
            />
          }
          off={
            <ButtonDeprecated
              type='button'
              onClick={onOpenPrompt}
              theme={ButtonTheme.CLEAR}
              style={{
                width: 24,
                height: 24,
              }}
              className={className}
            >
              <IconDeprecated
                Svg={ImageIcon}
                type={IconType.STROKE}
                width={24}
                height={24}
              />
            </ButtonDeprecated>
          }
        />

        <InsertImagePlugin />
        {isPromptOpen && (
          <ImagePrompt
            onSubmit={createImage}
            onClose={onClosePrompt}
          />
        )}
      </>
    )
  },
)
