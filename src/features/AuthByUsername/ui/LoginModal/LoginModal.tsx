import { Modal as ModalDeprecated } from '@/shared/ui/deprecated/Modal'
import { SuspenseWithSpinner } from '@/shared/ui/deprecated/SuspenseWithSpinner'
import { Modal } from '@/shared/ui/redesigned/Modal'
import { ToggleFeature } from '@/shared/lib/features'
import { LoginFormAsync } from '../LoginForm/LoginForm.async'

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
          <SuspenseWithSpinner>
            <LoginFormAsync onSuccess={onClose} />
          </SuspenseWithSpinner>
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
            <LoginFormAsync onSuccess={onClose} />
          </SuspenseWithSpinner>
        </ModalDeprecated>
      }
    />
  )
}
