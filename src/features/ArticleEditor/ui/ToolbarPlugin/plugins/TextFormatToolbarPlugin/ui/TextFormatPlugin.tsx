import { HStack } from '@/shared/ui/redesigned/Stack'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'
import BoldIcon from '@/shared/assets/icons/redesigned/textEditor/bold.svg'
import ItalicIcon from '@/shared/assets/icons/redesigned/textEditor/italic.svg'
import UnderlineIcon from '@/shared/assets/icons/redesigned/textEditor/underline.svg'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import type { TextFormatType } from 'lexical'
import { FORMAT_TEXT_COMMAND } from 'lexical'
import { IS_APPLE } from '@/shared/const/platform'
import { ToggleFeature } from '@/shared/lib/features'

export interface TextFormatToolbarPluginProps {
  className?: string
}

export const TextFormatToolbarPlugin = ({
  className,
}: TextFormatToolbarPluginProps) => {
  const [editor] = useLexicalComposerContext()
  const formatText = useCallback(
    (format: TextFormatType) => () => {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
    },
    [editor],
  )

  const boldShortcut = IS_APPLE ? '⌘B' : 'Ctrl+B'
  const italicShortcut = IS_APPLE ? '⌘I' : 'Ctrl+I'
  const underlineShortcut = IS_APPLE ? '⌘U' : 'Ctrl+U'

  const boldTooltip = `Bold (${boldShortcut})`
  const italicTooltip = `Italic (${italicShortcut})`
  const underlineTooltip = `Underline (${underlineShortcut})`

  const boldAriaLabel = `Format text as bold. Shortcut: ${boldShortcut}`
  const italicAriaLabel = `Format text as italics. Shortcut: ${italicShortcut}`
  const underlineAriaLabel = `Format text to underlined. Shortcut: ${underlineShortcut}`

  return (
    <HStack className={className}>
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={BoldIcon}
            width={24}
            height={24}
            onClick={formatText('bold')}
            tooltipText={boldTooltip}
            aria-label={boldAriaLabel}
          />
        }
        off={
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={formatText('bold')}
            title={boldTooltip}
            aria-label={boldAriaLabel}
            style={{
              height: 24,
              width: 24,
            }}
          >
            <IconDeprecated Svg={BoldIcon} height={24} width={24} />
          </Button>
        }
      />

      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={ItalicIcon}
            width={24}
            height={24}
            onClick={formatText('italic')}
            tooltipText={italicTooltip}
            aria-label={italicAriaLabel}
          />
        }
        off={
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={formatText('italic')}
            title={italicTooltip}
            aria-label={italicAriaLabel}
            style={{
              height: 24,
              width: 24,
            }}
          >
            <IconDeprecated Svg={ItalicIcon} height={24} width={24} />
          </Button>
        }
      />

      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={UnderlineIcon}
            width={24}
            height={24}
            onClick={formatText('underline')}
            tooltipText={underlineTooltip}
            aria-label={underlineAriaLabel}
          />
        }
        off={
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={formatText('underline')}
            title={underlineTooltip}
            aria-label={underlineAriaLabel}
            style={{
              height: 24,
              width: 24,
            }}
          >
            <IconDeprecated
              Svg={UnderlineIcon}
              height={24}
              width={24}
            />
          </Button>
        }
      />
    </HStack>
  )
}
