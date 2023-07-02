import { getUserAuthData } from '@/entities/User'
import HomeIcon from '@/shared/assets/icons/deprecated/home-20-20.svg'
import AboutIcon from '@/shared/assets/icons/deprecated/about-us-20-20.svg'
import ProfileIcon from '@/shared/assets/icons/deprecated/profile-17-20.svg'
import ArticlesIcon from '@/shared/assets/icons/deprecated/articles-20-20.svg'
import { routes } from '@/shared/lib/router/routes'
import { buildSelector } from '@/shared/ui/deprecated/store'
import type { SidebarItemArgs } from '../../types/sidebar'

export const [useSidebarItems, getSidebarItems] = buildSelector(
  getUserAuthData,
  (authData) => {
    const items: SidebarItemArgs[] = [
      {
        path: routes.home(),
        text: 'Home',
        Icon: HomeIcon,
      },
      {
        path: routes.about(),
        text: 'About us',
        Icon: AboutIcon,
      },
      {
        path: routes.profile({
          id: String(authData?.id ?? ''),
        }),
        text: 'Profile',
        Icon: ProfileIcon,
        authOnly: true,
      },
      {
        path: routes.articles(),
        text: 'Articles',
        Icon: ArticlesIcon,
        authOnly: true,
      },
    ]
    return items
  }
)
