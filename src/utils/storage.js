export const getSharedToken = key => {
  console.log('Chave: ')
  console.log(key)
  const token = localStorage.getItem(key)
  return token
}

export const setSharedToken = (key, value) => {
  localStorage.setItem(key, value)
}
