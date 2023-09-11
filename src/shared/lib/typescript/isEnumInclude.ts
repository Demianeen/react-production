export const isEnumInclude = <T extends object>(
  enumType: T,
  value: string | number
  // @ts-expect-error type guard for enum
): value is T[keyof T] => Object.values(enumType).includes(value)
