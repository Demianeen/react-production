export interface GetDateTextOptions {
  long?: boolean
}

export const getDateText = (
  date: Date,
  { long = false }: GetDateTextOptions = {},
) => {
  const dateText = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: long ? 'long' : 'numeric',
    day: 'numeric',
  })
  return dateText
}
