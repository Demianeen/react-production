import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { memo } from 'react'
import CodeIcon from '@/shared/assets/icons/redesigned/textEditor/code.svg'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { INSERT_CODE_BLOCK_COMMAND } from '../../../plugins/CodeBlockPlugin/CodeBlockPlugin'

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
    >
      <Icon Svg={CodeIcon} />
    </Button>
  )
})

CodeBlockToolbarPlugin.displayName = 'CodeBlockToolbarPlugin'
