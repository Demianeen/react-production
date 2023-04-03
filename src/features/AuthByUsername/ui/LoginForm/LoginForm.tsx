import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import styles from './LoginForm.module.scss'

interface LoginFormProps {
  className?: string
}

export const LoginForm = ({
  className,
}: LoginFormProps) => {
  const { t } = useTranslation()
  return (
    <div
      className={classNames(styles.loginForm, {}, [
        className,
      ])}
    >
      <Input
        autoFocus
        type='text'
        placeholder={t('Enter username')}
        className={styles.input}
      />
      <Input
        type='password'
        placeholder={t('Enter password')}
        className={styles.input}
      />
      <Button className={styles.loginBtn}>
        {t('Login')}
      </Button>
    </div>
  )
}
