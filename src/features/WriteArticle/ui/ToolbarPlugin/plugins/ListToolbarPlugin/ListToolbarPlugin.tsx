import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Button } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useCallback } from 'react'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'

export interface ListToolbarPluginProps {
  className?: string
}

type ListType = 'ul' | 'ol'

export const ListToolbarPlugin = typedMemo(
  ({ className }: ListToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const headingList: ListType[] = ['ul', 'ol']

    const onClick = useCallback(
      (listType: ListType) => (_: React.MouseEvent) => {
        if (listType === 'ol') {
          editor.dispatchCommand(
            INSERT_ORDERED_LIST_COMMAND,
            undefined
          )
          return
        }

        editor.dispatchCommand(
          INSERT_UNORDERED_LIST_COMMAND,
          undefined
        )
      },
      [editor]
    )

    return (
      <div className={className}>
        {headingList.map((listType) => (
          <Button
            key={listType}
            type='button'
            onClick={onClick(listType)}
          >
            {listType.toUpperCase()}
          </Button>
        ))}
        <ListPlugin />
      </div>
    )
  }
)
