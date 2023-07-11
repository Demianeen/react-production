import { useCurrentRoutePath } from '@/shared/lib/router/useCurrentRoutePath'
import { AppRoutes } from '@/shared/const/router/appRoutes'
import { ScrollToolbar } from '@/widgets/ScrollToolbar'
import type { ReactElement } from 'react'

/**
 * @returns Toolbar component or `undefined` if toolbar is not needed
 */
export const useAppToolbar = () => {
  const currentRoute = useCurrentRoutePath()

  const toolbarByRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  }

  return toolbarByRoute[currentRoute]
}
