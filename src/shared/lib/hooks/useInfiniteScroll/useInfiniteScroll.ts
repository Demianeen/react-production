import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

interface UseInfiniteScrollProps {
  wrapperRef: MutableRefObject<HTMLElement | null>
  triggerRef: MutableRefObject<HTMLElement | null>
  callback?: () => void
}

export const useInfiniteScroll = ({
  callback,
  wrapperRef,
  triggerRef,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    if (callback !== undefined) {
      const options = {
        root: wrapperRef?.current,
        rootMargin: '100px',
        threshold: 1.0,
      }

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)

      if (triggerRef?.current) {
        observer.observe(triggerRef?.current)
      }
    }

    return () => {
      if (observer !== null) {
        observer.disconnect()
      }
    }
  }, [callback, triggerRef, wrapperRef])
}
