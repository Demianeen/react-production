/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { $isCodeNode } from '@lexical/code'
import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $setSelection,
} from 'lexical'
import * as React from 'react'
import { useState } from 'react'
// import CopyIcon from '@/shared/assets/icons/redesigned/copy.svg'
import CopyIconDeprecated from '@/shared/assets/icons/deprecated/copy-22-22.svg'
import { Icon, IconType } from '@/shared/ui/deprecated/Icon'
import TickIcon from '@/shared/assets/icons/deprecated/tick-20-20.svg'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

interface Props {
  getCodeElem: () => HTMLElement | null
}

export const CopyButton = ({ getCodeElem }: Props) => {
  const [editor] = useLexicalComposerContext()
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false)

  const handleClick = async (): Promise<void> => {
    const codeElem = getCodeElem()

    if (!codeElem) {
      return
    }

    let content = ''

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeElem)

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent()
      }

      const selection = $getSelection()
      $setSelection(selection)
    })

    try {
      await navigator.clipboard.writeText(content)
      setCopyCompleted(true)
      setTimeout(() => setCopyCompleted(false), 1000)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <Button
      type='button'
      onClick={handleClick}
      aria-label='copy'
      theme={ButtonTheme.CLEAR_INVERTED}
    >
      <Icon
        Svg={isCopyCompleted ? TickIcon : CopyIconDeprecated}
        color='primary'
        type={IconType.STROKE}
        width={22}
        height={22}
      />
    </Button>
  )
}