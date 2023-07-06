import { memo, useCallback, useState } from 'react'
import { Toggle } from '@/shared/ui/redesigned/Toggle'
import { getFeatureFlag } from '@/shared/lib/features'
import { useTranslation } from 'react-i18next'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { useSelector } from 'react-redux'
import { getUserId } from '@/entities/User'
import { useUpdateFeatureFlagsMutation } from '@/shared/lib/features/api/featureFlagsApi'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface ToggleDesignProps {
  className?: string
}

export const ToggleDesign = memo(
  ({ className }: ToggleDesignProps) => {
    const { t } = useTranslation('settings')
    const isAppRedesigned = getFeatureFlag('isAppRedesigned')
    const [isNewDesign, setIsNewDesign] = useState(isAppRedesigned)
    const [
      updateFeatureFlags,
      { isLoading: isUpdatingFeatureFlags },
    ] = useUpdateFeatureFlagsMutation()
    const userId = useSelector(getUserId)

    const handleToggle = useCallback(
      (newValue: boolean) => {
        if (userId !== undefined) {
          setIsNewDesign(newValue)
          updateFeatureFlags({
            userId,
            featureFlags: { isAppRedesigned: newValue },
          })
        }
      },
      [updateFeatureFlags, userId]
    )

    return (
      <HStack gap={0.5}>
        {t('Enable new design')}:{' '}
        {isUpdatingFeatureFlags ? (
          <Skeleton width='5rem' />
        ) : (
          <Toggle
            className={className}
            enabled={isNewDesign}
            setEnabled={handleToggle}
            screenReaderText={t('Enable new design')}
          />
        )}
      </HStack>
    )
  }
)

ToggleDesign.displayName = 'ToggleDesign'
