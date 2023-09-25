import {
  HStack,
  getHStackClassName,
} from '@/shared/ui/redesigned/Stack'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Icon } from '@/shared/ui/deprecated/Icon'
import BoldIcon from '@/shared/assets/icons/redesigned/textEditor/bold.svg'
import ItalicIcon from '@/shared/assets/icons/redesigned/textEditor/italic.svg'
import UnderlineIcon from '@/shared/assets/icons/redesigned/textEditor/underline.svg'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import type { TextFormatType } from 'lexical'
import { FORMAT_TEXT_COMMAND } from 'lexical'
import { IS_APPLE } from '@/shared/const/platform'

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

  return (
    <HStack className={className}>
      <Button
        type='button'
        theme={ButtonTheme.CLEAR}
        className={getHStackClassName({
          maxHeight: true,
        })}
        onClick={formatText('bold')}
        title={IS_APPLE ? 'Bold (⌘B)' : 'Bold (Ctrl+B)'}
        aria-label={`Format text as bold. Shortcut: ${
          IS_APPLE ? '⌘B' : 'Ctrl+B'
        }`}
      >
        <Icon Svg={BoldIcon} height={24} width={24} />
      </Button>
      <Button
        type='button'
        theme={ButtonTheme.CLEAR}
        className={getHStackClassName({
          maxHeight: true,
        })}
        onClick={formatText('italic')}
        title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
        aria-label={`Format text as italics. Shortcut: ${
          IS_APPLE ? '⌘I' : 'Ctrl+I'
        }`}
      >
        <Icon Svg={ItalicIcon} height={24} width={24} />
      </Button>
      <Button
        type='button'
        theme={ButtonTheme.CLEAR}
        className={getHStackClassName({
          maxHeight: true,
        })}
        onClick={formatText('underline')}
        title={IS_APPLE ? 'Underline (⌘U)' : 'Underline (Ctrl+U)'}
        aria-label={`Format text to underlined. Shortcut: ${
          IS_APPLE ? '⌘U' : 'Ctrl+U'
        }`}
      >
        <Icon Svg={UnderlineIcon} height={24} width={24} />
      </Button>
    </HStack>
  )
}
