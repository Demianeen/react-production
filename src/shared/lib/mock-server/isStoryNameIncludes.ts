/**
 * Check if story name includes string
 * @note Story name need to have lowercase format
 * @param string - story name
 * @returns
 */
export const isStoryNameIncludes = (string: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  const storyId = searchParams.get('id')

  return storyId?.includes(string)
}
