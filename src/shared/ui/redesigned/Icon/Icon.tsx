import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import styles from './Icon.module.scss'

type SVGProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>

interface IconBaseProps extends SVGProps {
  className?: string
  /**
   * @description Icon component
   */
  Svg: Svg
}

interface NonClickableIconProps extends IconBaseProps {
  onClick?: never
}

interface ClickableIconProps extends IconBaseProps {
  onClick: () => void
}

export type IconProps = NonClickableIconProps | ClickableIconProps

export const Icon = typedMemo(
  ({
    className,
    Svg,
    width = '2rem',
    height = '2rem',
    onClick,
    ...props
  }: IconProps) => {
    if (onClick) {
      return (
        <button
          onClick={onClick}
          className={styles.button}
          style={{
            width,
            height,
          }}
        >
          <Svg
            className={classNames(styles.icon, {}, [className])}
            width={width}
            height={height}
            {...props}
          />
        </button>
      )
    }

    return (
      <Svg
        className={classNames(styles.icon, {}, [className])}
        width={width}
        height={height}
        {...props}
      />
    )
  }
)
