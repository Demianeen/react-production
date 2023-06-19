import type { ImgHTMLAttributes, ReactElement } from 'react'
import { memo, useLayoutEffect, useState } from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  alt: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

// TODO: Add ui kit
export const AppImage = memo(
  ({
    className,
    src,
    alt,
    fallback,
    errorFallback,
    ...props
  }: AppImageProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useLayoutEffect(() => {
      const image = new Image()

      image.src = src ?? ''
      image.onload = () => {
        setIsLoading(false)
      }
      image.onerror = () => {
        setIsLoading(false)
        setHasError(true)
      }
    }, [src])

    if (isLoading && fallback) {
      return fallback
    }

    if (hasError && errorFallback) {
      return errorFallback
    }

    return (
      <img src={src} alt={alt} className={className} {...props} />
    )
  }
)

AppImage.displayName = 'AppImage'
