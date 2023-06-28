// we store skeletons directly near the components they are used in
/* eslint-disable netliukh-demian-fsd-plugin/layer-imports */
import { NavbarSkeleton } from '@/widgets/Navbar'
import { SidebarSkeleton } from '@/widgets/Sidebar'
import { PageLoader } from '@/widgets/PageLoader'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/Stack'

export interface LoaderLayoutProps {
  className?: string
}

export const LoaderLayout = ({ className }: LoaderLayoutProps) => {
  return (
    <div className={classNames('app', {}, [className])}>
      <NavbarSkeleton />
      <HStack>
        <SidebarSkeleton />
        <PageLoader />
      </HStack>
    </div>
  )
}
