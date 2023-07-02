// we store skeletons directly near the components they are used in
/* eslint-disable netliukh-demian-fsd-plugin/layer-imports */
import { PageLoader } from '@/widgets/PageLoader'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/deprecated/Stack'
import { SidebarDeprecatedSkeleton } from '@/widgets/Sidebar'
import { NavbarDeprecatedSkeleton } from '@/widgets/Navbar'

export interface LoaderLayoutProps {
  className?: string
}

export const LoaderLayout = ({ className }: LoaderLayoutProps) => {
  return (
    <div className={classNames('app', {}, [className])}>
      <NavbarDeprecatedSkeleton />
      <HStack>
        <SidebarDeprecatedSkeleton />
        <PageLoader />
      </HStack>
    </div>
  )
}
