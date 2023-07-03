import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button'
import { Text } from '@/shared/ui/deprecated/Text'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { getProfileCanEdit } from '../../model/selectors/getProfileCanEdit/getProfileCanEdit'
import { getProfileIsReadonly } from '../../model/selectors/getProfileIsReadonly/getProfileIsReadonly'
import { profileActions } from '../../model/slice/profileSlice'

interface ProfilePageHeaderProps {
  className?: string
}

export const EditableProfileCardHeader = memo(
  ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile')

    const dispatch = useAppDispatch()
    const isReadonly = useSelector(getProfileIsReadonly)
    const canEdit = useSelector(getProfileCanEdit)

    const onEdit = useCallback(() => {
      dispatch(profileActions.setIsReadonly(false))
    }, [dispatch])

    const onCancel = useCallback(
      () => dispatch(profileActions.cancelEdit()),
      [dispatch]
    )

    return (
      <HStack justify='between' className={className} maxWidth>
        <Text title={t('Profile')} />
        {canEdit && (
          <>
            {isReadonly ? (
              <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEdit}
                type='button'
                data-testid='EditableProfileCardHeader.EditButton'
              >
                {t('Edit')}
              </Button>
            ) : (
              <HStack gap={1}>
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancel}
                  type='button'
                  data-testid='EditableProfileCardHeader.CancelButton'
                >
                  {t('Cancel')}
                </Button>
                <Button
                  form='editable-profile-card'
                  type='submit'
                  theme={ButtonTheme.OUTLINE}
                  data-testid='EditableProfileCardHeader.SubmitButton'
                >
                  {t('Save')}
                </Button>
              </HStack>
            )}
          </>
        )}
      </HStack>
    )
  }
)

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader'
