import { memo } from 'react'

/**
 * @description typedMemo is a wrapper around React.memo that allows you to pass generic types to the component.
 * @type {{<P extends object>(Component: React.FunctionComponent<P>, propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean): React.NamedExoticComponent<P>, <T extends React.ComponentType<any>>(Component: T, propsAreEqual?: (prevProps: Readonly<React.ComponentProps<T>>, nextProps: Readonly<React.ComponentProps<T>>) => boolean): React.MemoExoticComponent<T>}}
 */
export const typedMemo: <T>(c: T) => T = memo
