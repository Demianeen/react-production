import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal'
import { SuspenseWithSpinner } from '@/shared/ui/deprecated/SuspenseWithSpinner'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { ToggleFeature } from '@/shared/lib/features'
import { Spinner } from '@/shared/ui/redesigned/Spinner'
import { Suspense, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/redesigned/Button'
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Text } from '@/shared/ui/deprecated/Text'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'
import RegistrationFormAsync from '../RegistrationForm/RegistrationForm'

interface LoginModalProps {
  className?: string
  isOpen: boolean
  onClose: () => void
}

// TODO: remake it with redux
export const LoginModal = ({
  className,
  isOpen,
  onClose,
}: LoginModalProps) => {
  const { t } = useTranslation()
  const [isLogin, setIsLogin] = useState(true)

  const changeIsLogin = useCallback((state: boolean) => {
    return () => {
      setIsLogin(state)
    }
  }, [])

  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          className={className}
          lazy
        >
          <Suspense fallback={<Spinner />}>
            {isLogin ? (
              <>
                <LoginFormAsync onSuccess={onClose} />
                <HStack as='p' gap={0.5}>
                  {t('Don’t have an account?')}
                  <Button
                    type='button'
                    variant='clear'
                    onClick={changeIsLogin(false)}
                  >
                    {t('Sign up')}
                  </Button>
                </HStack>
              </>
            ) : (
              <>
                <RegistrationFormAsync onSuccess={onClose} />
                <HStack as='p' gap={0.5}>
                  {t('Already have an account?')}
                  <Button
                    type='button'
                    variant='clear'
                    onClick={changeIsLogin(true)}
                  >
                    {t('Login')}
                  </Button>
                </HStack>
              </>
            )}
          </Suspense>
        </Modal>
      }
      off={
        <ModalDeprecated
          isOpen={isOpen}
          onClose={onClose}
          className={className}
          lazy
        >
          <SuspenseWithSpinner>
            {isLogin ? (
              <>
                <LoginFormAsync onSuccess={onClose} />
                <HStack gap={0.5}>
                  <Text text={t('Don’t have an account?')} />
                  <ButtonDeprecated
                    type='button'
                    theme={ButtonTheme.CLEAR}
                    onClick={changeIsLogin(false)}
                  >
                    {t('Sign up')}
                  </ButtonDeprecated>
                </HStack>
              </>
            ) : (
              <>
                <RegistrationFormAsync onSuccess={onClose} />
                <HStack gap={0.5}>
                  <Text text={t('Already have an account?')} />
                  <ButtonDeprecated
                    type='button'
                    theme={ButtonTheme.CLEAR}
                    onClick={changeIsLogin(true)}
                  >
                    {t('Login')}
                  </ButtonDeprecated>
                </HStack>
              </>
            )}
          </SuspenseWithSpinner>
        </ModalDeprecated>
      }
    />
  )
}
