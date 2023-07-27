import { getUserAuthData } from '@/entities/User'
import HomeIconDeprecated from '@/shared/assets/icons/deprecated/home-20-20.svg'
import AboutIconDeprecated from '@/shared/assets/icons/deprecated/about-us-20-20.svg'
import ProfileIconDeprecated from '@/shared/assets/icons/deprecated/profile-17-20.svg'
import ArticlesIconDeprecated from '@/shared/assets/icons/deprecated/articles-20-20.svg'
import { routes } from '@/shared/lib/router/routes'
import { buildSelector } from '@/shared/lib/store'
import HomeIcon from '@/shared/assets/icons/redesigned/home.svg'
import AboutIcon from '@/shared/assets/icons/redesigned/info.svg'
import ProfileIcon from '@/shared/assets/icons/redesigned/avatar.svg'
import ArticlesIcon from '@/shared/assets/icons/redesigned/articles.svg'
import { toggleFeature } from '@/shared/lib/features'
import type { SidebarItemArgs } from '../../types/userNavigation'

export const [useUserNavigationItems, getUserNavigationItems] =
  buildSelector(getUserAuthData, (authData) => {
    const items: SidebarItemArgs[] = [
      {
        path: routes.home(),
        text: 'Home',
        Icon: toggleFeature({
          name: 'isAppRedesigned',
          on: () => HomeIcon,
          off: () => HomeIconDeprecated,
        }),
      },
      {
        path: routes.about(),
        text: 'About us',
        Icon: toggleFeature({
          name: 'isAppRedesigned',
          on: () => AboutIcon,
          off: () => AboutIconDeprecated,
        }),
      },
      {
        path: routes.profile({
          id: String(authData?.id ?? ''),
        }),
        text: 'Profile',
        Icon: toggleFeature({
          name: 'isAppRedesigned',
          on: () => ProfileIcon,
          off: () => ProfileIconDeprecated,
        }),
        authOnly: true,
      },
      {
        path: routes.articles(),
        text: 'Articles',
        Icon: toggleFeature({
          name: 'isAppRedesigned',
          on: () => ArticlesIcon,
          off: () => ArticlesIconDeprecated,
        }),
      },
    ]
    return items
  })
