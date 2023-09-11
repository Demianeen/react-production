import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Select } from '@/shared/ui/deprecated/Popups'
import type { SelectOption } from '@/shared/ui/redesigned/Popups'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import { INSERT_PARAGRAPH_COMMAND } from 'lexical'
import { useCallback } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { BlockType } from '../../../../model/types/articleEditorSchema'
import { useArticleEditorActions } from '../../../../model/slice/articleEditorSlice'
import { useArticleEditorBlockType } from '../../../../model/selectors/articleEditorSchemaSelectors'
import {
  HeadingPlugin,
  INSERT_HEADING1_COMMAND,
  INSERT_HEADING2_COMMAND,
} from '../../../plugins/HeadingPlugin/HeadingPlugin'

export interface SelectBlockTypeToolbarPluginProps {
  className?: string
}

const mapValueToCommandMap = {
  paragraph: INSERT_PARAGRAPH_COMMAND,
  h1: INSERT_HEADING1_COMMAND,
  h2: INSERT_HEADING2_COMMAND,
  ul: INSERT_UNORDERED_LIST_COMMAND,
  ol: INSERT_ORDERED_LIST_COMMAND,
}

const selectOptions: SelectOption<BlockType>[] = [
  {
    label: 'Normal',
    value: BlockType.P,
  },
  {
    label: 'Heading 1',
    value: BlockType.H1,
  },
  {
    label: 'Heading 2',
    value: BlockType.H2,
  },
  {
    label: 'Unordered List',
    value: BlockType.UL,
  },
  {
    label: 'Ordered List',
    value: BlockType.OL,
  },
]

export const SelectBlockTypeToolbarPlugin = typedMemo(
  ({ className }: SelectBlockTypeToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const blockType = useArticleEditorBlockType()
    const { setBlockType } = useArticleEditorActions()

    const onChangeBlockType = useCallback(
      (newBlockType: BlockType) => {
        editor.dispatchCommand(
          mapValueToCommandMap[newBlockType],
          undefined
        )
        setBlockType(newBlockType)
      },
      [editor, setBlockType]
    )

    return (
      <>
        <Select
          className={className}
          options={selectOptions}
          onChange={onChangeBlockType}
          direction='down-right'
          value={blockType}
        />
        <HeadingPlugin />
        <ListPlugin />
      </>
    )
  }
)
