import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { isSVG } from '@/shared/lib/html/isSvg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { $getNearestNodeFromDOMNode } from 'lexical'
import { getBlockElement } from '../../../lib/drag/getBlockElement/getBlockElement'
import { getArticleEditorAnchor } from '../../../lib/getArticleEditorAnchor/getArticleEditorAnchor'
import { useArticleEditorActions } from '../../../model/slice/articleEditorSlice'

export const UpdateMouseBlockTypePlugin = () => {
  const [editor] = useLexicalComposerContext()
  const { setMouseTopLevelNodeKey } = useArticleEditorActions()

  useEffect(() => {
    const anchorElem = getArticleEditorAnchor()
    if (!anchorElem) return

    const onMouseMove = (event: MouseEvent) => {
      if (!isHTMLElement(event.target) && !isSVG(event.target)) {
        setMouseTopLevelNodeKey(null)
      }

      const hoveredElem = getBlockElement(anchorElem, editor, event)
      if (!hoveredElem) return

      editor.update(() => {
        const hoveredNode = $getNearestNodeFromDOMNode(hoveredElem)
        setMouseTopLevelNodeKey(hoveredNode?.__key ?? null)
      })
    }

    const onMouseLeave = () => {
      setMouseTopLevelNodeKey(null)
    }

    const scrollerElem = anchorElem.parentElement

    scrollerElem?.addEventListener('mousemove', onMouseMove)
    scrollerElem?.addEventListener('mouseleave', onMouseLeave)

    // eslint-disable-next-line consistent-return
    return () => {
      scrollerElem?.removeEventListener('mousemove', onMouseMove)
      scrollerElem?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [editor, setMouseTopLevelNodeKey])

  return null
}
