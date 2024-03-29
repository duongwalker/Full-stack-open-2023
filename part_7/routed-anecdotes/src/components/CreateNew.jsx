import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNoti(`a new anecdote ${content} created!`)
    navigate('/')
    setTimeout(() => {
      props.setNoti(null);
    }, 5000);
  }
    const handleReset = () => {
    content.onChange({ target: { value: '' } })
    author.onChange({ target: { value: '' } })
    info.onChange({ target: { value: '' } })
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew