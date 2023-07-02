import { Modal } from '@/shared/ui/deprecated/Modal'
import { SuspenseWithSpinner } from '@/shared/ui/deprecated/SuspenseWithSpinner'
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
  )
}
