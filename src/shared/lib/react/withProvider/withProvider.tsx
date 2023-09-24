import type { ComponentType, PropsWithChildren } from 'react'

export const withProvider = <P extends object>(
  WrappedComponent: ComponentType<P>,
  Provider: ComponentType<PropsWithChildren>,
): React.FC<P> => {
  const WithProvider = (props: P) => {
    return (
      <Provider>
        <WrappedComponent {...props} />
      </Provider>
    )
  }

  return WithProvider
}
