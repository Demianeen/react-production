import type { ErrorInfo, ReactElement } from 'react'
import React from 'react'
import { PageError } from '@/widgets/PageError'
import { SuspenseWithSpinner } from '@/shared/ui/deprecated/SuspenseWithSpinner'
import { Page } from '@/widgets/Page'
import { toggleFeature } from '@/shared/lib/features'

export type OnError = (error: Error, errorInfo: ErrorInfo) => void

interface ErrorBoundaryProps {
  children: ReactElement
  onError?: OnError
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props

    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
    onError?.(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    const className = toggleFeature({
      name: 'isAppRedesigned',
      on: () => 'appRedesigned',
      off: () => 'app',
    })

    if (hasError) {
      return (
        <SuspenseWithSpinner>
          <Page className={className}>
            <PageError />
          </Page>
        </SuspenseWithSpinner>
      )
    }

    return children
  }
}

export default ErrorBoundary
