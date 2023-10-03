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
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import LinkIcon from '@/shared/assets/icons/redesigned/textEditor/link.svg'
import { ToggleFeature } from '@/shared/lib/features'
import { useEditorSelectionSelectedNodeKey } from '@/entities/Editor'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import type { LinkPromptValues } from '../LinkPrompt/LinkPrompt'
import { LinkPrompt } from '../LinkPrompt/LinkPrompt'

export interface LinkToolbarPluginProps {
  className?: string
}

export const LinkToolbarPlugin = ({
  className,
}: LinkToolbarPluginProps) => {
  const [editor] = useLexicalComposerContext()
  const [isPromptOpen, setIsPromptOpen] = useState(false)

  const selectedNodeKey = useEditorSelectionSelectedNodeKey()

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

  const onOpenPrompt = useCallback(() => {
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

          const sanitizedUrl = sanitizeUrl(url)

          if (nodeText?.length === 0) {
            const selection = $getSelection()
            if (selection) {
              selection.insertText(sanitizedUrl)
            }
          }

          editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizedUrl)
          setLinkNodeUrl(sanitizedUrl)
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
          onOpenPrompt()
        }
        return false
      },
      COMMAND_PRIORITY_NORMAL,
    )
  }, [editor, onOpenPrompt])

  const linkShortcut = IS_APPLE ? '⌘K' : 'Ctrl+K'
  const linkTooltip = `Link (${linkShortcut})`
  const linkAriaLabel = `Insert a link. Shortcut: ${linkShortcut}`

  return (
    <>
      <ToggleFeature
        name='isAppRedesigned'
        on={
          <Icon
            Svg={LinkIcon}
            width={24}
            height={24}
            onClick={onOpenPrompt}
            tooltipText={linkTooltip}
            aria-label={linkAriaLabel}
            className={className}
          />
        }
        off={
          <Button
            type='button'
            theme={ButtonTheme.CLEAR}
            onClick={onOpenPrompt}
            title={linkTooltip}
            aria-label={linkAriaLabel}
            className={className}
            style={{
              height: 24,
              width: 24,
            }}
          >
            <IconDeprecated Svg={LinkIcon} height={24} width={24} />
          </Button>
        }
      />
      <LinkPlugin />
      {isPromptOpen && (
        <LinkPrompt
          initialUrl={linkNodeUrl}
          onClose={onClosePrompt}
          onSubmit={insertLink}
        />
      )}
    </>
  )
}
