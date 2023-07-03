import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import styles from './Br.module.scss'

export interface BrProps {
  className?: string
}

export const Br = typedMemo(({ className }: BrProps) => {
  return <br className={classNames(styles.br, {}, [className])} />
})
