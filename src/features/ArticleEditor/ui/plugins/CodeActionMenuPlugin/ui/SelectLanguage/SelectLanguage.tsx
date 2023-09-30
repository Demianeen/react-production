import {
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
} from '@lexical/code'
import type { SelectOption } from '@/shared/ui/deprecated/Popups'
import { Select } from '@/shared/ui/redesigned/Popups'
import { Select as SelectDeprecated } from '@/shared/ui/deprecated/Popups'
import type { MouseEventHandler } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getNodeByKey,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND,
} from 'lexical'
import { toggleFeature } from '@/shared/lib/features'
import { useArticleEditorSelectionNodeKey } from '../../../../../model/selectors/articleEditorSelectionSelectors'

export interface SelectLanguageProps {
  className?: string
  language: string
  setLanguage: (language: string) => void
}

const selectLanguageOptions: SelectOption<
  keyof typeof CODE_LANGUAGE_FRIENDLY_NAME_MAP
>[] = Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP).map(
  ([value, name]) => ({
    value,
    label: name,
  }),
)

export const SelectLanguage = ({
  className,
  language,
  setLanguage,
}: SelectLanguageProps) => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)

  const nodeKey = useArticleEditorSelectionNodeKey()

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor])

  const changeLanguage = useCallback(
    (newLanguage: string) => {
      activeEditor.update(() => {
        if (!nodeKey) return

        const node = $getNodeByKey(nodeKey)
        if (!$isCodeNode(node)) return

        node.setLanguage(newLanguage)
      })
      setLanguage(newLanguage)
    },
    [activeEditor, setLanguage, nodeKey],
  )

  const handleChildMouseMove: MouseEventHandler<HTMLUListElement> =
    useCallback((event) => {
      event.stopPropagation()
    }, [])

  const SelectComponent = toggleFeature({
    name: 'isAppRedesigned',
    on: () => Select,
    off: () => SelectDeprecated,
  })

  return (
    <SelectComponent
      className={className}
      options={selectLanguageOptions}
      value={language}
      onChange={changeLanguage}
      clear
      listProps={{
        onMouseMove: handleChildMouseMove,
      }}
    />
  )
}
