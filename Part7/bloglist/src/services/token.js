let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const genConfig = () => ({
  'headers': { 'Authorization': token }
})

export {
  setToken,
  genConfig
}
