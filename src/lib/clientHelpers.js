"use client"
export function formatedate(date) {
  const str = date.toLocaleString("ru-RU", { month: 'short', year: 'numeric' })
  const index = str.lastIndexOf('г.')
  const result = str.substring(0, index)
  return result
}