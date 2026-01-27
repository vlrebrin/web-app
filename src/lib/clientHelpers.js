"use client"
export function formatedate(date) {
  const d=new Date(date)
  const str = d.toLocaleString("ru-RU", { month: 'short', year: 'numeric' })
  const index = str.lastIndexOf('г.')
  const result = str.substring(0, index)
  
  // console.log(date)
  // console.log(d)
  // console.log(str)
  // console.log(result)
  
  return result
}