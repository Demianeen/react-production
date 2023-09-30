export type Promised<T> = {
  [K in keyof T]: Promise<T[K]>
}
