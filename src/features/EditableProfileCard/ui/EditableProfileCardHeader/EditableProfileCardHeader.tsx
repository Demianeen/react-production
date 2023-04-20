import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  Button,
  ButtonTheme,
} from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/profileSlice'
import styles from './EditableProfileCardHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = memo(
  ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile')

    const isReadonly = useSelector(getProfileIsReadonly)
    const dispatch = useAppDispatch()

    const onEdit = useCallback(() => {
      dispatch(profileActions.setIsReadonly(false))
    }, [dispatch])

    const onCancel = useCallback(
      () => dispatch(profileActions.cancelEdit()),
      [dispatch]
    )

    const onSave = useCallback(
      () => dispatch(updateProfileData()),
      [dispatch]
    )

    return (
      <div
        className={classNames(
          styles.profilePageHeader,
          {},
          [className]
        )}
      >
        <Text title={t('Profile')} />
        {isReadonly ? (
          <Button
            className={styles.editBtn}
            theme={ButtonTheme.OUTLINE}
            onClick={onEdit}
          >
            {t('Edit')}
          </Button>
        ) : (
          <>
            <Button
              className={styles.editBtn}
              theme={ButtonTheme.OUTLINE_RED}
              onClick={onCancel}
            >
              {t('Cancel')}
            </Button>
            <Button
              className={styles.editBtn}
              theme={ButtonTheme.OUTLINE}
              onClick={onSave}
            >
              {t('Save')}
            </Button>
          </>
        )}
      </div>
    )
  }
)

EditableProfileCardHeader.displayName =
  'EditableProfileCardHeader'