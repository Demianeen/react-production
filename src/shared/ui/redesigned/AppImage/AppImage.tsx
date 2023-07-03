import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type {
  ForwardedRef,
  ImgHTMLAttributes,
  ReactElement,
} from 'react'
import { useLayoutEffect, useState } from 'react'

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  alt: string
  fallback?: ReactElement
  errorFallback?: ReactElement
}

// TODO: Add ui kit
export const AppImage = typedMemo(
  typedForwardRef(
    (
      {
        className,
        src,
        alt,
        fallback,
        errorFallback,
        ...props
      }: AppImageProps,
      ref: ForwardedRef<HTMLImageElement>
    ) => {
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
        <img
          ref={ref}
          src={src}
          alt={alt}
          className={className}
          {...props}
        />
      )
    }
  )
)
