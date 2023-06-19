import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import CopyIcon from '@/shared/assets/icons/copy-22-22.svg'
import type { TestProps } from '@/shared/types/tests'
import { Button, ButtonTheme } from '../Button/Button'
import { Icon, IconType } from '../Icon/Icon'
import styles from './Code.module.scss'

interface CodeProps extends TestProps {
  className?: string
  text: string
}

export const Code = memo(
  ({ className, text, 'data-testid': dataTestId }: CodeProps) => {
    const onCopy = useCallback(() => {
      navigator.clipboard.writeText(text)
    }, [text])

    return (
      <pre className={classNames(styles.code, {}, [className])}>
        <Button
          type='button'
          className={styles.copyBtn}
          theme={ButtonTheme.CLEAR}
          onClick={onCopy}
          data-testid={`${dataTestId}.CopyBtn`}
        >
          <Icon Svg={CopyIcon} type={IconType.STROKE} />
        </Button>
        <code data-testid={`${dataTestId}.Code`}>{text}</code>
      </pre>
    )
  }
)

Code.displayName = 'Code'
