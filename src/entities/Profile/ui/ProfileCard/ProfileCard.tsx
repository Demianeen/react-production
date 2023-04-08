import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getProfileData } from 'entities/Profile/model/selectors/getProfileData/getProfileData'
import { getProfileIsLoading } from 'entities/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileError } from 'entities/Profile/model/selectors/getProfileError/getProfileError'
import { Text } from 'shared/ui/Text/Text'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import styles from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({
  className,
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')
  const data = useSelector(getProfileData)
  const isLoading = useSelector(getProfileIsLoading)
  const error = useSelector(getProfileError)

  return (
    <div
      className={classNames(styles.profileCard, {}, [
        className,
      ])}
    >
      <div className={styles.header}>
        <Text title={t('Profile')} />
        <Button
          className={styles.editBtn}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Edit')}
        </Button>
      </div>
      <div className={styles.content}>
        <Input
          value={data?.firstName}
          placeholder={t('First name')}
          className={styles.input}
        />
        <Input
          value={data?.lastName}
          placeholder={t('Last name')}
          className={styles.input}
        />
      </div>
    </div>
  )
}
