declare module '*.scss' {
  interface ClassNames {
    [className: string]: string
  }

  const classNames: ClassNames
  export = classNames
}

type Svg = React.FC<React.SVGProps<SVGSVGElement>>
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg' {
  const Svg
  export default Svg
}

declare const __IS_DEV__: boolean
declare const __API__: string
declare const __PROJECT__: 'storybook' | 'frontend' | 'jest'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T
}
