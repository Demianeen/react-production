import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'
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
        <ToggleFeature
          name='isAppRedesigned'
          on={
            <>
              <Title>{t('Profile')}</Title>
              {canEdit && (
                <>
                  {isReadonly ? (
                    <Button
                      variant='outline'
                      onClick={onEdit}
                      type='button'
                      data-testid='EditableProfileCardHeader.EditButton'
                    >
                      {t('Edit')}
                    </Button>
                  ) : (
                    <HStack gap={1}>
                      <Button
                        variant='outline'
                        actionColor='danger'
                        onClick={onCancel}
                        type='button'
                        data-testid='EditableProfileCardHeader.CancelButton'
                      >
                        {t('Cancel')}
                      </Button>
                      <Button
                        form='editable-profile-card'
                        type='submit'
                        variant='outline'
                        actionColor='save'
                        data-testid='EditableProfileCardHeader.SubmitButton'
                      >
                        {t('Save')}
                      </Button>
                    </HStack>
                  )}
                </>
              )}
            </>
          }
          off={
            <>
              <TextDeprecated title={t('Profile')} />
              {canEdit && (
                <>
                  {isReadonly ? (
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onEdit}
                      type='button'
                      data-testid='EditableProfileCardHeader.EditButton'
                    >
                      {t('Edit')}
                    </ButtonDeprecated>
                  ) : (
                    <HStack gap={1}>
                      <ButtonDeprecated
                        theme={ButtonTheme.OUTLINE_RED}
                        onClick={onCancel}
                        type='button'
                        data-testid='EditableProfileCardHeader.CancelButton'
                      >
                        {t('Cancel')}
                      </ButtonDeprecated>
                      <ButtonDeprecated
                        form='editable-profile-card'
                        type='submit'
                        theme={ButtonTheme.OUTLINE}
                        data-testid='EditableProfileCardHeader.SubmitButton'
                      >
                        {t('Save')}
                      </ButtonDeprecated>
                    </HStack>
                  )}
                </>
              )}
            </>
          }
        />
      </HStack>
    )
  }
)

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader'

EditableProfileCardHeader.displayName = 'EditableProfileCardHeader'
