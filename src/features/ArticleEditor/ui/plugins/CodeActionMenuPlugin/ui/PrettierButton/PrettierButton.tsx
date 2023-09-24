import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { $isCodeNode } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getNearestNodeFromDOMNode } from 'lexical'
import { useState } from 'react'
import PrettierIcon from '@/shared/assets/icons/redesigned/textEditor/prettier.svg'
import { Icon } from '@/shared/ui/deprecated/Icon'
import {
  usePrettier,
  type LanguagesType,
  PrettierProvider,
} from '@/shared/lib/components/PrettierProvider'
import { withProvider } from '@/shared/lib/react/withProvider/withProvider'

interface PrettierButtonProps {
  lang: LanguagesType
  getCodeElem: () => HTMLElement | null
}

const PrettierButtonInside = ({
  lang,
  getCodeElem,
}: PrettierButtonProps) => {
  const [editor] = useLexicalComposerContext()
  const [syntaxError, setSyntaxError] = useState<string>('')
  // TODO: add tips
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tipsVisible, setTipsVisible] = useState<boolean>(false)

  const { Prettier, getPrettierOptions } = usePrettier()

  const setError = (error: unknown) => {
    if (error instanceof Error) {
      setSyntaxError(error.message)
      setTipsVisible(true)
    }
  }

  const handleClick = async (): Promise<void> => {
    const codeElem = getCodeElem()

    try {
      const options = await getPrettierOptions(lang)

      if (!codeElem) {
        return
      }

      editor.update(async () => {
        const codeNode = $getNearestNodeFromDOMNode(codeElem)

        if (!$isCodeNode(codeNode)) return

        const content = codeNode.getTextContent()

        let parsed = ''

        try {
          parsed = await Prettier.format(content, options)
        } catch (error: unknown) {
          setError(error)
        }

        if (parsed === '') return

        editor.update(() => {
          const selection = codeNode.select(0)
          selection.insertText(parsed)
          setSyntaxError('')
          setTipsVisible(false)
        })
      })
    } catch (error: unknown) {
      setError(error)
    }
  }

  const handleMouseEnter = () => {
    if (syntaxError !== '') {
      setTipsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (syntaxError !== '') {
      setTipsVisible(false)
    }
  }

  return (
    <Button
      type='button'
      className='menu-item'
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label='prettier'
      theme={ButtonTheme.CLEAR}
    >
      <Icon
        Svg={PrettierIcon}
        color={syntaxError ? 'error' : undefined}
        width={22}
        height={22}
      />
    </Button>
    // {tipsVisible ? (
    //   <pre className='code-error-tips'>{syntaxError}</pre>
    // ) : null}
  )
}

export const PrettierButton = withProvider(
  PrettierButtonInside,
  PrettierProvider,
)
