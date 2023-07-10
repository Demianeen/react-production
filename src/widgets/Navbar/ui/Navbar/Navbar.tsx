import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { ToggleFeature } from '@/shared/lib/features'
import { NavbarRedesigned } from './NavbarRedesigned/NavbarRedesigned'
import { NavbarDeprecated } from './NavbarDeprecated/NavbarDeprecated'

export interface NavbarProps {
  className?: string
}

export const Navbar = typedMemo(({ className }: NavbarProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<NavbarRedesigned className={className} />}
      off={<NavbarDeprecated className={className} />}
    />
  )
})
