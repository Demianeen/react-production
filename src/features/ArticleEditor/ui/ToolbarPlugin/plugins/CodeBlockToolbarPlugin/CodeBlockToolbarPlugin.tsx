import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { memo } from 'react'
import CodeIcon from '@/shared/assets/icons/redesigned/textEditor/code.svg'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'
import { ToggleFeature } from '@/shared/lib/features'
import {
  CodeBlockPlugin,
  INSERT_CODE_BLOCK_COMMAND,
} from '../../../plugins/CodeBlockPlugin/CodeBlockPlugin'

export const CodeBlockToolbarPlugin = memo(() => {
  const [editor] = useLexicalComposerContext()

  const formatCode = () => {
    editor.dispatchCommand(INSERT_CODE_BLOCK_COMMAND, undefined)
  }

  return (
    <>
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={CodeIcon}
            width={24}
            height={24}
            onClick={formatCode}
            tooltipText='Insert code block'
          />
        }
        off={
          <Button
            type='button'
            onClick={formatCode}
            theme={ButtonTheme.CLEAR}
            className={getHStackClassName({
              justify: 'center',
              align: 'center',
            })}
          >
            <IconDeprecated Svg={CodeIcon} height={24} width={24} />
          </Button>
        }
      />
      <CodeBlockPlugin />
    </>
  )
})

CodeBlockToolbarPlugin.displayName = 'CodeBlockToolbarPlugin'
