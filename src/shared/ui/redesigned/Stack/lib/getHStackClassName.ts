import {
  getFlexClassName,
  type GetFlexClassNameProps,
} from './getFlexClassName'

type GetHStackClassNameProps = Omit<
  GetFlexClassNameProps,
  'direction'
>

export const hStackDefaultValue: GetFlexClassNameProps = {
  align: 'center',
  direction: 'row',
}

export const getHStackClassName = ({
  ...props
}: GetHStackClassNameProps) =>
  getFlexClassName({
    ...hStackDefaultValue,
    ...props,
  })
