import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// set bearer token
const setToken = newToken => {
  token = `bearer ${newToken}`
}

// get all blog entries
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// create a new blog entry
const create = async newObject => {
  const config = {
    headers: {Authorization: token}
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, setToken, create }