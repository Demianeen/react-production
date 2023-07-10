// we store skeletons directly near the components they are used in
/* eslint-disable netliukh-demian-fsd-plugin/layer-imports */
import { PageLoader } from '@/widgets/PageLoader'
import { classNames } from '@/shared/lib/classNames/classNames'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { SidebarSkeleton } from '@/widgets/Sidebar'
import { NavbarSkeleton } from '@/widgets/Navbar'
import { MainLayout } from '@/shared/layouts/MainLayout'
import { ToggleFeature } from '@/shared/lib/features'

export interface LoaderLayoutProps {
  className?: string
}

export const LoaderLayout = ({ className }: LoaderLayoutProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <div className='appRedesigned'>
          <MainLayout
            header={<NavbarSkeleton />}
            sidebar={<SidebarSkeleton />}
            content={<PageLoader />}
          />
        </div>
      }
      off={
        <div className={classNames('app', {}, [className])}>
          <NavbarSkeleton />
          <HStack>
            <SidebarSkeleton />
            <PageLoader />
          </HStack>
        </div>
      }
    />
  )
}
