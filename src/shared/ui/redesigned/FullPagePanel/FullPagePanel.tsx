import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import CloseIcon from '@/shared/assets/icons/redesigned/close.svg'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import type { ReactNode } from 'react'
import { ToggleFeature, toggleFeature } from '@/shared/lib/features'
import { Button, ButtonTheme } from '../../deprecated/Button'
import { Br } from '../Br'
import { HStack } from '../Stack'
import { Icon } from '../Icon'
import styles from './FullPagePanel.module.scss'
import { Icon as IconDeprecated } from '../../deprecated/Icon'

export interface FullPagePanelProps {
  className?: string
  onClose?: () => void
  children?: ReactNode
}

export const FullPagePanel = typedMemo(
  ({ className, onClose, children }: FullPagePanelProps) => {
    return (
      <div
        className={classNamesNew(
          toggleFeature({
            name: 'isAppRedesigned',
            on: () => styles.fullPagePanel,
            off: () => styles.fullPagePanelDeprecated,
          }),
          {},
          className
        )}
      >
        <HStack maxWidth justify='end'>
          <ToggleFeature
            name='isAppRedesigned'
            on={
              <Icon
                Svg={CloseIcon}
                onClick={onClose}
                tooltipText='Close'
                tooltipPosition='left'
              />
            }
            off={
              <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                type='button'
                onClick={onClose}
              >
                <IconDeprecated
                  Svg={CloseIcon}
                  height={24}
                  width={24}
                />
              </Button>
            }
          />
        </HStack>
        <Br />
        {children}
      </div>
    )
  }
)
