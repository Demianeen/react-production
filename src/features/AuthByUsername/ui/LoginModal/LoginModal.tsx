import { Modal } from '@/shared/ui/Modal/Modal'
import { SuspenseWithSpinner } from '@/shared/ui/SuspenseWithSpinner/SuspenseWithSpinner'
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
