import { useState, useEffect } from 'react'
import axios from 'axios'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}


export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const fetchResources = async () => {
    const fetchedResources = await axios.get(baseUrl)
    setResources(fetchedResources.data)
  }
  useEffect(() => {
    fetchResources()
  }, [baseUrl])

  const create = async (resource) => {
    const postedData = await axios.post(baseUrl, resource)
    setResources((prevSource) => [...prevSource, postedData.data])
    console.log('This is data')
    console.log(postedData)
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}