import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useDraggableBlockMenu } from './lib/useDraggableBlockMenu/useDraggableBlockMenu'

interface DraggableBlockPluginProps {
  anchorElem?: HTMLElement
}

export const DraggableBlockPlugin = ({
  anchorElem = document.body,
}: DraggableBlockPluginProps): JSX.Element => {
  const [editor] = useLexicalComposerContext()
  return useDraggableBlockMenu(editor, anchorElem, editor._editable)
}
