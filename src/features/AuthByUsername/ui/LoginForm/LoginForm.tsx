import { ToggleFeature } from '@/shared/lib/features'
import LoginFormDeprecated from './LoginFormDeprecated/LoginFormDeprecated'
import type { LoginFormRedesignedProps } from './LoginFormRedesigned/LoginFormRedesigned'
import LoginFormRedesigned from './LoginFormRedesigned/LoginFormRedesigned'

export interface LoginFormProps {
  className?: string
}

const LoginForm = (
  props: LoginFormProps & LoginFormRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<LoginFormRedesigned {...props} />}
      off={<LoginFormDeprecated {...props} />}
    />
  )
}

export default LoginForm
