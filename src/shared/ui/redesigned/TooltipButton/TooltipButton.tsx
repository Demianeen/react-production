import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useCallback } from 'react'
import type { MouseEvent, ForwardedRef } from 'react'
import type { Position } from '@/shared/types/position'
import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { DesktopView } from '@/shared/lib/components/UserAgent/DesktopView'
import { Button } from '../Button'
import type {
  ButtonProps,
  ButtonTags,
  WithDefaultButtonTag,
  DEFAULT_BUTTON_TAG,
} from '../Button'
import styles from './TooltipButton.module.scss'

export type TooltipButtonProps<TTag extends ButtonTags> = {
  /**
   * Tooltip position
   * @default bottom
   */
  tooltipPosition?: Position
  /**
   * Tooltip text. If undefined, tooltip will not be rendered.
   */
  tooltipText?: string
  /**
   * Disables tooltip
   * @default false
   */
  disableTooltip?: boolean
  tooltipClassName?: string
} & ButtonProps<TTag>

// TODO: Fix z-index for tooltip. Article list shows over tooltip.
export const TooltipButton = typedForwardRef(
  function TooltipButtonInside<
    TTag extends ButtonTags = typeof DEFAULT_BUTTON_TAG
  >(
    {
      className,
      children,
      tooltipPosition = 'bottom',
      tooltipText,
      disableTooltip = false,
      tooltipClassName,
      type,
      ...props
    }: TooltipButtonProps<TTag>,
    ref: ForwardedRef<WithDefaultButtonTag<TTag>>
  ) {
    // const [isButtonFocused, bindFocus] = useFocus()
    // const { isTabLastKey } = useTab()

    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        // setWasButtonClicked(true)
        if (
          'onClick' in props &&
          typeof props.onClick === 'function'
        ) {
          props.onClick(e)
        }
      },
      [props]
    )

    const hideTooltip = disableTooltip || tooltipText === undefined

    return (
      <Button
        type={type}
        className={classNamesNew(styles.tooltipWrapper, className)}
        ref={ref}
        {...props}
        // {...bindFocus}
        onClick={handleClick}
      >
        {children}
        <DesktopView>
          {!hideTooltip && (
            <span
              className={classNamesNew(
                styles.tooltip,
                styles[tooltipPosition],
                tooltipClassName
              )}
            >
              {tooltipText}
            </span>
          )}
        </DesktopView>
      </Button>
    )
  }
)
