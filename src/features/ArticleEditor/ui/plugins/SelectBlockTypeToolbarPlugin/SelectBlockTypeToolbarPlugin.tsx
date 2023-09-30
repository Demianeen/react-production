import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { Select } from '@/shared/ui/redesigned/Popups'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { SelectOption } from '@/shared/ui/redesigned/Popups'
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from '@lexical/list'
import type { LexicalCommand } from 'lexical'
import { INSERT_PARAGRAPH_COMMAND } from 'lexical'
import { useCallback } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { toggleFeature } from '@/shared/lib/features'
import {
  CodeBlockPlugin,
  INSERT_CODE_BLOCK_COMMAND,
} from '../CodeBlockPlugin/CodeBlockPlugin'
import { BlockType } from '../../../model/types/articleEditorSchema'
import { useArticleEditorActions } from '../../../model/slice/articleEditorSlice'
import { useArticleEditorSelectionBlockType } from '../../../model/selectors/articleEditorSelectionSelectors'
import {
  HeadingPlugin,
  INSERT_HEADING1_COMMAND,
  INSERT_HEADING2_COMMAND,
} from '../HeadingPlugin/HeadingPlugin'

export interface SelectBlockTypeToolbarPluginProps {
  className?: string
}

const mapValueToCommandMap: Record<
  BlockType,
  LexicalCommand<void>
> = {
  paragraph: INSERT_PARAGRAPH_COMMAND,
  h1: INSERT_HEADING1_COMMAND,
  h2: INSERT_HEADING2_COMMAND,
  ul: INSERT_UNORDERED_LIST_COMMAND,
  ol: INSERT_ORDERED_LIST_COMMAND,
  code: INSERT_CODE_BLOCK_COMMAND,
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
  {
    label: 'Code',
    value: BlockType.CODE,
  },
]

export const SelectBlockTypeToolbarPlugin = typedMemo(
  ({ className }: SelectBlockTypeToolbarPluginProps) => {
    const [editor] = useLexicalComposerContext()

    const blockType = useArticleEditorSelectionBlockType()
    const { setSelectionBlockType } = useArticleEditorActions()

    const onChangeBlockType = useCallback(
      (newBlockType: BlockType) => {
        editor.dispatchCommand(
          mapValueToCommandMap[newBlockType],
          undefined,
        )
        setSelectionBlockType(newBlockType)
      },
      [editor, setSelectionBlockType],
    )

    const SelectComponent = toggleFeature({
      name: 'isAppRedesigned',
      on: () => Select,
      off: () => SelectDeprecated,
    })

    return (
      <>
        <SelectComponent
          className={className}
          options={selectOptions}
          onChange={onChangeBlockType}
          direction='down-right'
          value={blockType}
        />
        <HeadingPlugin />
        <ListPlugin />
        <CodeBlockPlugin />
      </>
    )
  },
)
