import { memo, useCallback, useState } from 'react'
import { Toggle } from '@/shared/ui/redesigned/Toggle'
import { useTranslation } from 'react-i18next'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { useUserId } from '@/entities/User'
import { useUpdateFeatureFlagsMutation } from '@/shared/lib/features/api/featureFlagsApi'
import { getFeatureFlag } from '@/shared/lib/features'

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
    const userId = useUserId()

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
        <Toggle
          className={className}
          enabled={isNewDesign}
          setEnabled={handleToggle}
          screenReaderText={t('Enable new design')}
          label={t('Enable new design')}
          isLoading={isUpdatingFeatureFlags}
        />
      </HStack>
    )
  }
)

ToggleDesign.displayName = 'ToggleDesign'
