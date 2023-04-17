import type React from 'react'
import AboutIcon from 'shared/assets/icons/about-us-20-20.svg'
import HomeIcon from 'shared/assets/icons/home-20-20.svg'
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg'
import ArticlesIcon from 'shared/assets/icons/articles-20-20.svg'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

export interface SidebarItemArgs {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemList: SidebarItemArgs[] = [
  {
    path: RoutePath.home,
    text: 'Home',
    Icon: HomeIcon,
  },
  {
    path: RoutePath.about,
    text: 'About us',
    Icon: AboutIcon,
  },
  {
    path: RoutePath.profile,
    text: 'Profile',
    Icon: ProfileIcon,
    authOnly: true,
  },
  {
    path: RoutePath.articles,
    text: 'Articles',
    Icon: ArticlesIcon,
    authOnly: true,
  },
]
