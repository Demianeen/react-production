import { classNames } from '@/shared/lib/classNames/classNames'
import AppLogoIcon from '@/shared/assets/icons/redesigned/appLogo.svg'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { HStack } from '../Stack'
import styles from './AppLogo.module.scss'

export interface AppLogoProps {
  className?: string
  size?: string
  showGradientSmall?: boolean
  showGradientBig?: boolean
}

export const AppLogo = typedMemo(
  ({
    className,
    size = '3rem',
    showGradientSmall = true,
    showGradientBig = true,
  }: AppLogoProps) => {
    return (
      <HStack
        maxWidth
        justify='center'
        className={classNames(styles.appLogo, {}, [className])}
      >
        {showGradientSmall && (
          <div className={styles.gradientSmall} />
        )}
        {showGradientBig && <div className={styles.gradientBig} />}
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
