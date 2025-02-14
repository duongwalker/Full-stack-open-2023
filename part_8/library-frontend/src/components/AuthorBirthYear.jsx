import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"

const AuthorBirthYear = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor]= useMutation(UPDATE_AUTHOR,  {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })


  const submit = async (event) => {
    event.preventDefault()

    console.log('edit author...')
    editAuthor({variables: {name, setBornTo: born}})
    setName('')
    setBorn('')
  }
  return (
    <div>
    <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorBirthYear