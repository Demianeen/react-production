import { ToggleFeature } from '@/shared/lib/features'
import RegistrationFormDeprecated from './RegistrationFormDeprecated/RegistrationFormDeprecated'
import type { RegistrationFormRedesignedProps } from './RegistrationFormRedesigned/RegistrationFormRedesigned'
import RegistrationFormRedesigned from './RegistrationFormRedesigned/RegistrationFormRedesigned'

export interface LoginFormProps {
  className?: string
}

const LoginForm = (
  props: LoginFormProps & RegistrationFormRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<RegistrationFormRedesigned {...props} />}
      off={<RegistrationFormDeprecated {...props} />}
    />
  )
}

export default LoginForm
