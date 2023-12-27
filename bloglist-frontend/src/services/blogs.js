import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}
const update = (id, newBlog) => {
    return axios.put(`${baseUrl}/${id}`, newBlog)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }
    try {
        await axios.delete(`${baseUrl}/${id}`,config)
    }
    catch (error) {
        console.error(error)
    }
}


export default { getAll, create, setToken, update, remove }