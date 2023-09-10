import { typedForwardRef } from '@/shared/lib/react/typedForwardRef/typedForwardRef'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type {
  ForwardedRef,
  ImgHTMLAttributes,
  ReactElement,
} from 'react'
import { useLayoutEffect, useState } from 'react'

interface AppImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  className?: string
  alt: string
  fallback?: ReactElement
  errorFallback?: ReactElement
  onLoad?: (isLoaded: boolean) => void
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
        onLoad,
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
          onLoad?.(true)
        }
        image.onerror = () => {
          setIsLoading(false)
          setHasError(true)
        }
      }, [onLoad, src])

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
