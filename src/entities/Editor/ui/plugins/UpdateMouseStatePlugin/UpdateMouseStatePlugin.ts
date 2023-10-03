import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { useEffect } from 'react'
import { isSVG } from '@/shared/lib/html/isSvg'
import { isHTMLElement } from '@/shared/lib/html/isHTMLElement'
import { $getNearestNodeFromDOMNode } from 'lexical'
import { getBlockElement } from '../../../lib/drag'
import { getEditorAnchor } from '../../../lib/getEditorAnchor/getEditorAnchor'
import { useEditorMouseTopLevelNodeKey } from '../../../model/selectors/editorMouseSelectors'
import { useEditorActions } from '../../../model/slice/editorSlice'

export const UpdateMouseBlockTypePlugin = () => {
  const [editor] = useLexicalComposerContext()
  const { setMouseTopLevelNodeKey } = useEditorActions()

  const editorNodes = editor._nodes
  const topLevelNodeKey = useEditorMouseTopLevelNodeKey()

  useEffect(() => {
    const anchorElem = getEditorAnchor()
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

  useEffect(() => {
    editorNodes.forEach((node) => {
      editor.registerMutationListener(node.klass, (nodes) => {
        if (!topLevelNodeKey) return

        if (nodes.get(topLevelNodeKey) === 'destroyed') {
          setMouseTopLevelNodeKey(null)
        }
      })
    })
  })

  return null
}
