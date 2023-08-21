import { ToggleFeature } from '@/shared/lib/features'
import type { SelectViewRedesignedProps } from './SelectViewRedesigned/SelectViewRedesigned'
import { SelectViewRedesigned } from './SelectViewRedesigned/SelectViewRedesigned'
import { SelectViewDeprecated } from './SelectViewDeprecated/SelectViewDeprecated'

export interface SelectViewProps {
  className?: string
}

export const SelectView = (
  props: SelectViewProps & SelectViewRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<SelectViewRedesigned {...props} />}
      off={<SelectViewDeprecated {...props} />}
    />
  )
}
