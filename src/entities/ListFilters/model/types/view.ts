import type React from 'react'
import GridIcon from 'shared/assets/icons/grid-24-24.svg'
import ListIcon from 'shared/assets/icons/list-24-24.svg'

export enum View {
  LIST = 'list',
  GRID = 'grid',
}

interface ViewType {
  view: View
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const viewTypes: ViewType[] = [
  {
    view: View.GRID,
    Icon: GridIcon,
  },
  {
    view: View.LIST,
    Icon: ListIcon,
  },
]
