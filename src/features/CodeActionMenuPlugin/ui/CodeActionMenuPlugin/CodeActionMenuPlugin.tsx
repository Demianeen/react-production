import { $isCodeNode, normalizeCodeLang } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getNodeByKey } from 'lexical'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Portal } from '@/shared/ui/redesigned/Portal'
import { canBePrettier } from '@/shared/lib/components/PrettierProvider/lib/canBePrettier'
import {
  useEditorMouseTopLevelNodeKey,
  getEditorAnchor,
} from '@/entities/Editor'
import { PrettierButton } from '../PrettierButton/PrettierButton'
import { SelectLanguage } from '../SelectLanguage/SelectLanguage'
import type { CodeActionMenuPosition } from '../CodeActionMenu/CodeActionMenu'
import { CodeActionMenu } from '../CodeActionMenu/CodeActionMenu'
import { CopyButton } from '../CopyButton/CopyButton'

const CODE_PADDING = 8

export const CodeActionMenuPlugin = () => {
  const [editor] = useLexicalComposerContext()

  const [language, setLanguage] = useState('')

  const [isShown, setIsShown] = useState<boolean>(false)
  const [position, setPosition] = useState<CodeActionMenuPosition>({
    right: 0,
    top: 0,
  })
  const codeElemRef = useRef<HTMLElement | null>(null)
  const getCodeElem = useCallback(() => codeElemRef.current, [])

  const topLevelNodeKey = useEditorMouseTopLevelNodeKey()

  useEffect(() => {
    editor.update(() => {
      if (!topLevelNodeKey) {
        setIsShown(false)
        return
      }

      const node = $getNodeByKey(topLevelNodeKey)
      if (!$isCodeNode(node)) return

      const anchorElem = getEditorAnchor()
      if (!anchorElem) return

      const codeElem = editor.getElementByKey(topLevelNodeKey)
      codeElemRef.current = codeElem
      if (!codeElem) return

      const { y: editorElemY, right: editorElemRight } =
        anchorElem.getBoundingClientRect()
      const { y, right } = codeElem.getBoundingClientRect()
      setIsShown(true)
      setLanguage(node.getLanguage() ?? '')
      setPosition({
        right: editorElemRight - right + CODE_PADDING,
        top: y - editorElemY,
      })
    })

    return () => {
      setIsShown(false)
    }
  }, [editor, topLevelNodeKey])

  const normalizedLang = normalizeCodeLang(language)

  if (!isShown) {
    return null
  }

  return (
    <Portal element={getEditorAnchor() ?? undefined}>
      <CodeActionMenu position={position}>
        <SelectLanguage
          language={normalizedLang}
          setLanguage={setLanguage}
        />
        <CopyButton getCodeElem={getCodeElem} />
        {canBePrettier(normalizedLang) && (
          <PrettierButton
            getCodeElem={getCodeElem}
            lang={normalizedLang}
          />
        )}
      </CodeActionMenu>
    </Portal>
  )
}
