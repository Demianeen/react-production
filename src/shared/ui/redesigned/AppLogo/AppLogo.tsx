import { classNames } from '@/shared/lib/classNames/classNames'
import AppLogoIcon from '@/shared/assets/icons/redesigned/appLogo.svg'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HStack } from '../../Stack'
import styles from './AppLogo.module.scss'

export interface AppLogoProps {
  className?: string
  size?: string
}

export const AppLogo = typedMemo(
  ({ className, size = '3rem' }: AppLogoProps) => {
    return (
      <HStack
        maxWidth
        justify='center'
        className={classNames(styles.appLogo, {}, [className])}
      >
        <div className={styles.gradientSmall} />
        <div className={styles.gradientBig} />
        <AppLogoIcon
          className={styles.logo}
          width={size}
          height={size}
          color='black'
        />
      </HStack>
    )
  }
)
