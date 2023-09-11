import { memo, useEffect } from 'react'
import { Text } from '@/shared/ui/deprecated/Text'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './Placeholder.module.scss'

export interface PlaceholderProps {
  className?: string
  text: string
  onPlaceholderChange?: (isMounted: boolean) => void
}

export const Placeholder = memo(
  ({ className, text, onPlaceholderChange }: PlaceholderProps) => {
    useEffect(() => {
      onPlaceholderChange?.(true)
      return () => {
        onPlaceholderChange?.(false)
      }
    }, [onPlaceholderChange])
    return (
      <Text
        text={text}
        className={classNamesNew(styles.placeholder, className)}
      />
    )
  }
)

Placeholder.displayName = 'Placeholder'
