import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { memo } from 'react'
import CodeIcon from '@/shared/assets/icons/redesigned/textEditor/code.svg'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'
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
    <Button
      type='button'
      onClick={formatCode}
      theme={ButtonTheme.CLEAR}
      className={getHStackClassName({
        justify: 'center',
        align: 'center',
      })}
    >
      <Icon Svg={CodeIcon} height={24} width={24} />
      <CodeBlockPlugin />
    </Button>
  )
})

CodeBlockToolbarPlugin.displayName = 'CodeBlockToolbarPlugin'
