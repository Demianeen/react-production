import {
  getFlexClassName,
  type GetFlexClassNameProps,
} from './getFlexClassName'

type GetVStackClassNameProps = Omit<
  GetFlexClassNameProps,
  'direction'
>

export const vStackDefaultValue: GetFlexClassNameProps = {
  direction: 'column',
}

export const getVStackClassName = ({
  ...props
}: GetVStackClassNameProps) => {
  return getFlexClassName({
    ...vStackDefaultValue,
    ...props,
  })
}
