import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextTheme } from '@/shared/ui/Text'
import { HStack } from '@/shared/ui/Stack'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useTranslation } from 'react-i18next'
import styles from './Navbar.module.scss'

interface NavbarSkeletonProps {
  className?: string
}

export const NavbarSkeleton = memo(
  ({ className }: NavbarSkeletonProps) => {
    const { t } = useTranslation()

    return (
      <HStack
        as='header'
        gap={1}
        className={classNames(styles.navbar, {}, [className])}
        maxWidth
      >
        <Text
          className={styles.appName}
          theme={TextTheme.INVERTED}
          title={t('Netliukh Demian')}
        />
        <HStack gap={1} className={styles.actions}>
          <Skeleton width='2rem' height='2rem' borderRadius='50%' />
          <Skeleton width='2rem' height='2rem' borderRadius='50%' />
        </HStack>
      </HStack>
    )
  }
)

NavbarSkeleton.displayName = 'Navbar'
