import type { ErrorInfo, ReactNode } from 'react'
import React from 'react'
import { PageError } from 'widgets/PageError/ui/PageError'
import { SuspenseWithSpinner } from 'shared/ui/SuspenseWithSpinner/SuspenseWithSpinner'
import { Page } from 'widgets/Page'

interface ErrorBoundaryProps {
  children: ReactNode
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
    // eslint-disable-next-line no-console
    console.log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <SuspenseWithSpinner>
          <Page>
            <PageError />
          </Page>
        </SuspenseWithSpinner>
      )
    }

    return children
  }
}

export default ErrorBoundary
