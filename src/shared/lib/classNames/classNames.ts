type Mods = Record<string, boolean | string>;

export function classNames(
  className: string,
  mods: Mods = {},
  additional: (string | undefined)[] = []
): string {
  return [
    className,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_className, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(" ");
}
