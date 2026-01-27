'use client'

export const getMeterings = async (url) => {
  const json_res = await fetch(url) //Получаем в формате json
  if (!json_res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await json_res.json()
    error.status = json_res.status
    throw error
  }
  const res = await json_res.json() // извлекаем из json
  // if (!res.checks.length) {
  //   const error = new Error('В системе нет ни одного счета')
  //   error.info = 'В выборке нет ни одного счета'
  //   error.status = "No Checks"
  //   throw error
  //  // return error
  // }
  //const json_resp = await res.json()
  const status = res.status
  const data = {
    "meterings": res.meterings,
  }
  return data
}


export const getChecks = async (url) => {
//console.log(url)
    const res = await fetch(url) //Получаем в формате json
    if (!res.ok) {
      const error = new Error(' Сбой при запросе данных ')
      error.info = res.url
      error.status = res.status
      throw error
    }
  const resp = await res.json() // извлекаем из json
  if (!resp.checks.length) {
    const error = new Error('В системе нет ни одного счета')
    error.status = "No Checks"
    throw error
  }
  const status = res.status
  const data = { "checks": resp.checks,}
  return data
}

export const getUsers = async (url) => {
  
  const res = await fetch(url) //Получаем в формате json
  if (!res.ok) {
    const error = new Error('Сбой при запросе данных')
    error.info = res.url
    error.status = res.status
    throw error
  }
  const resp = await res.json() // извлекаем из json
  const status = resp.status
  const data = {
    "users": resp.users,
  }
  return data
}