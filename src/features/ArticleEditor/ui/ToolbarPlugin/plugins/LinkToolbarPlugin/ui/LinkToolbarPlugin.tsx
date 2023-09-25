import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import type { LinkNode } from '@lexical/link'
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link'
import {
  KEY_MODIFIER_COMMAND,
  COMMAND_PRIORITY_NORMAL,
  $getNodeByKey,
  $getSelection,
} from 'lexical'
import { useCallback, useEffect, useState } from 'react'
import { sanitizeUrl } from '@/shared/lib/url/sanitizeUrl/sanitizeUrl'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { IS_APPLE } from '@/shared/const/platform'
import { Icon } from '@/shared/ui/deprecated/Icon'
import { getHStackClassName } from '@/shared/ui/redesigned/Stack'
import LinkIcon from '@/shared/assets/icons/redesigned/textEditor/link.svg'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useArticleEditorSelectionSelectedNodeKey } from '../../../../../model/selectors/articleEditorSelectionSelectors'
import { LinkPrompt, type LinkPromptValues } from './LinkPrompt'
import { LinkPlugin } from '../../../../plugins/LinkPlugin/ui/LinkPlugin'

export interface LinkToolbarPluginProps {
  className?: string
}

export const LinkToolbarPlugin = ({
  className,
}: LinkToolbarPluginProps) => {
  const [editor] = useLexicalComposerContext()
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  const selectedNodeKey = useArticleEditorSelectionSelectedNodeKey()

  const [linkNode, setLinkNode] = useState<LinkNode | null>(null)
  const [linkNodeUrl, setLinkNodeUrl] = useState<string | undefined>(
    undefined,
  )

  useEffect(() => {
    editor.getEditorState().read(() => {
      const node = selectedNodeKey
        ? $getNodeByKey(selectedNodeKey)
        : null
      const parent = node ? node.getParent() : null
      if (node && $isLinkNode(node)) {
        setLinkNode(node)
        setLinkNodeUrl(node.getURL())
      } else if (parent && $isLinkNode(parent)) {
        setLinkNode(parent)
        setLinkNodeUrl(parent.getURL())
      } else {
        setLinkNode(null)
        setLinkNodeUrl(undefined)
      }
    })
  }, [editor, selectedNodeKey])

  const onOpenPrompt = useCallback((_: React.MouseEvent) => {
    setIsPromptOpen(true)
  }, [])

  const onClosePrompt = useCallback(() => {
    setIsPromptOpen(false)
  }, [])

  const insertLink = useCallback(
    ({ url }: LinkPromptValues) => {
      editor.update(() => {
        if (linkNode !== null) {
          linkNode.setURL(url)
          onClosePrompt()
          return
        }

        editor.update(() => {
          if (!selectedNodeKey) return
          const node = $getNodeByKey(selectedNodeKey)
          const nodeText = node?.getTextContent()

          const newUrl = sanitizeUrl(url)

          if (nodeText?.length === 0) {
            const selection = $getSelection()
            if (selection) {
              selection.insertText(newUrl)
            }
          }

          editor.dispatchCommand(TOGGLE_LINK_COMMAND, newUrl)
          setLinkNodeUrl(newUrl)
        })

        onClosePrompt()
      })
    },
    [editor, linkNode, onClosePrompt, selectedNodeKey],
  )

  useEffect(() => {
    return editor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload

        if (
          event.code === 'KeyK' &&
          (event.ctrlKey || event.metaKey)
        ) {
          event.preventDefault()
          return editor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl('https://'),
          )
        }
        return false
      },
      COMMAND_PRIORITY_NORMAL,
    )
  }, [editor])

  return (
    <Button
      type='button'
      theme={ButtonTheme.CLEAR}
      className={classNamesNew(
        getHStackClassName({
          maxHeight: true,
        }),
        className,
      )}
      onClick={onOpenPrompt}
      title={IS_APPLE ? 'Italic (⌘I)' : 'Italic (Ctrl+I)'}
      aria-label={`Format text as italics. Shortcut: ${
        IS_APPLE ? '⌘I' : 'Ctrl+I'
      }`}
    >
      <Icon Svg={LinkIcon} height={24} width={24} />
      <LinkPlugin />
      {isPromptOpen && (
        <LinkPrompt
          initialUrl={linkNodeUrl}
          onClose={onClosePrompt}
          onSubmit={insertLink}
        />
      )}
    </Button>
  )
}
