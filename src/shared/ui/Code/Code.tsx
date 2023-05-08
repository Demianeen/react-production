import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import CopyIcon from 'shared/assets/icons/copy-22-22.svg'
import { Button, ButtonTheme } from '../Button/Button'
import { Icon, IconType } from '../Icon/Icon'
import styles from './Code.module.scss'

interface CodeProps {
  className?: string
  text: string
}

export const Code = memo(
  ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
      navigator.clipboard.writeText(text)
    }, [text])

    return (
      <pre
        className={classNames(styles.code, {}, [className])}
      >
        <Button
          type='button'
          className={styles.copyBtn}
          theme={ButtonTheme.CLEAR}
          onClick={onCopy}
        >
          <Icon Svg={CopyIcon} type={IconType.STROKE} />
        </Button>
        <code>{text}</code>
      </pre>
    )
  }
)

Code.displayName = 'Code'
