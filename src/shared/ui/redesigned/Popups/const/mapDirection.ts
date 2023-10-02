import type { DiagonalDirection } from '@/shared/types/position'
import styles from '../styles/Popup.module.scss'

export const mapDirection: Record<DiagonalDirection, string> = {
  'up-right': `${styles.up}`,
  'up-left': `${styles.up} ${styles.left}`,
  'down-right': `${styles.down}`,
  'down-left': `${styles.down} ${styles.left}`,
}
