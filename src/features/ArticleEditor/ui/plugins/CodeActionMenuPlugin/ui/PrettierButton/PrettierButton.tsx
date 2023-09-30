import {
  ButtonTheme,
  Button as ButtonDeprecated,
} from '@/shared/ui/deprecated/Button'
import { ToggleFeature } from '@/shared/lib/features'
import {
  Icon as IconDeprecated,
  IconType,
} from '@/shared/ui/deprecated/Icon'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { $isCodeNode } from '@lexical/code'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $getNearestNodeFromDOMNode } from 'lexical'
import { useState } from 'react'
import {
  usePrettier,
  type LanguagesType,
  PrettierProvider,
} from '@/shared/lib/components/PrettierProvider'
import { withProvider } from '@/shared/lib/react/withProvider/withProvider'
import PrettierIcon from '@/shared/assets/icons/redesigned/prettier.svg'

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
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <Icon
          Svg={PrettierIcon}
          className='menu-item'
          tooltipText={tipsVisible ? syntaxError : 'Format code'}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-label='format code with prettier'
          color={syntaxError ? 'error' : 'default'}
          type='stroke'
          height={22}
          width={22}
        />
      }
      off={
        <ButtonDeprecated
          type='button'
          style={{
            width: 22,
            height: 22,
          }}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='menu-item'
          aria-label='copy'
          theme={ButtonTheme.CLEAR_INVERTED}
        >
          <IconDeprecated
            Svg={PrettierIcon}
            type={IconType.STROKE}
            width={22}
            height={22}
          />
        </ButtonDeprecated>
      }
    />
  )
}

export const PrettierButton = withProvider(
  PrettierButtonInside,
  PrettierProvider,
)
