import type React from 'react'
import AboutIcon from 'shared/assets/icons/about-us.svg'
import HomeIcon from 'shared/assets/icons/home.svg'
import ProfileIcon from 'shared/assets/icons/profile.svg'
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
]
