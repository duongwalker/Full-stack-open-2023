import axios from 'axios'
<<<<<<< HEAD
const baseUrl = 'http://localhost:3001/persons'
=======
const baseUrl = '/api/persons'
>>>>>>> 97bde37e0bdcfa7feb5a3a1ba0aaeda6045c45ac

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, create, update, remove
}