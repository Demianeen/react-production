import type { Direction } from '../../../types/ui'
import styles from '../styles/Popup.module.scss'

/* eslint-disable @typescript-eslint/naming-convention */
export const mapDirection: Record<Direction, string> = {
  'up-right': `${styles.up}`,
  'up-left': `${styles.up} ${styles.left}`,
  'down-right': `${styles.down}`,
  'down-left': `${styles.down} ${styles.left}`,
}
