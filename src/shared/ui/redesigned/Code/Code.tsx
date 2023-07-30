import { memo, useCallback } from 'react'
import CopyIcon from '@/shared/assets/icons/redesigned/copy.svg'
import type { TestProps } from '@/shared/types/tests'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { Card } from '../Card'
import { Icon } from '../Icon/Icon'
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
      <Card
        className={classNamesNew(styles.code, className)}
        background='light'
        maxWidth
      >
        <pre>
          <Icon
            Svg={CopyIcon}
            onClick={onCopy}
            data-testid={`${dataTestId}.CopyBtn`}
            className={styles.copyBtn}
            tooltipText='Copy code'
          />
          <code data-testid={`${dataTestId}.Code`}>{text}</code>
        </pre>
      </Card>
    )
  }
)

Code.displayName = 'Code'
