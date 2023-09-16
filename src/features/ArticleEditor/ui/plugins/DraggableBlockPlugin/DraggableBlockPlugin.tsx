import { useDraggableBlockMenu } from './lib/useDraggableBlockMenu/useDraggableBlockMenu'

interface DraggableBlockPluginProps {
  anchorElem?: HTMLElement
}

export const DraggableBlockPlugin = ({
  anchorElem = document.body,
}: DraggableBlockPluginProps): JSX.Element => {
  return useDraggableBlockMenu(anchorElem)
}
