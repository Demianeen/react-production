export type Mods = Record<string, boolean | undefined>

/**
 * @deprecated use `classNamesNew` instead
 */
export const classNames = (
  className: string,
  mods: Mods = {},
  additional: (string | undefined)[] = []
): string =>
  [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(' ')
