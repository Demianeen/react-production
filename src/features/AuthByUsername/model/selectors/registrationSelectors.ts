import { buildSelector } from '@/shared/lib/store'

export const [
  useRegistrationFormUsername,
  getRegistrationFormUsername,
] = buildSelector((state) => state.registrationForm?.username ?? '')

export const [
  useRegistrationFormPassword,
  getRegistrationFormPassword,
] = buildSelector((state) => state.registrationForm?.password ?? '')

export const [
  useRegistrationFormConfirmPassword,
  getRegistrationFormConfirmPassword,
] = buildSelector(
  (state) => state.registrationForm?.confirmPassword ?? ''
)

export const [useRegistrationFormErrors, getRegistrationFormErrors] =
  buildSelector((state) => state.registrationForm?.errors)

export const [
  useRegistrationFormIsLoading,
  getRegistrationFormIsLoading,
] = buildSelector(
  (state) => state.registrationForm?.isLoading ?? false
)
