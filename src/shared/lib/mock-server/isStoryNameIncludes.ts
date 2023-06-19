export const isStoryNameIncludes = (string: string) => {
  const searchParams = new URLSearchParams(window.location.search)
  const storyId = searchParams.get('id')

  return storyId?.includes(string)
}
