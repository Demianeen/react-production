import { useEffect } from 'react'

/**
 * Asks the user to confirm before leaving the page
 *
 * @param show - whether to show the confirm before leave
 * @param func - the function to run before leave
 */
export const useConfirmBeforeLeave = (
  show = true,
  func: (event: BeforeUnloadEvent) => boolean = () => true,
) => {
  useEffect(() => {
    if (show) {
      window.onbeforeunload = func
    }
    return () => {
      window.onbeforeunload = null
    }
  }, [func, show])
}
