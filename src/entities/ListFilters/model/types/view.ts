import GridIcon from 'shared/assets/icons/grid-24-24.svg'
import ListIcon from 'shared/assets/icons/list-24-24.svg'
import { View } from '../const/view'

interface ViewType {
  view: View
  Icon: Svg
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
