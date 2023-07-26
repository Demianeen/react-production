import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { toggleFeature } from '@/shared/lib/features'
import styles from './Br.module.scss'

export interface BrProps {
  className?: string
}

export const Br = typedMemo(({ className }: BrProps) => {
  return (
    <div
      className={classNamesNew(
        toggleFeature({
          name: 'isAppRedesigned',
          on: () => styles.br,
          off: () => styles.brDeprecated,
        }),
        className
      )}
    />
  )
})
