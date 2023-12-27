import { useState } from 'react'
import { createNew } from '../services/requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import  { useNotiDispatch, useNotiValue } from '../NotiContext'

const AnecdoteForm = () => {
  const [anecdote, setAnecdote] = useState('')
  const queryClient = useQueryClient()
  const noti = useNotiDispatch()
  const getId = () => (100000 * Math.random()).toFixed(0)
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      console.log(anecdotes);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
    }
    
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: content, id: getId() })
  }

  const handleOnClick = () => {
    if(anecdote.length<5) {
      noti({ type: "LENGTH", anecdote: anecdote });
    }
    else {
      noti({ type: "CREATE", anecdote: anecdote });
    }
  }

  const handleInputChange = (event) => {
    setAnecdote(event.target.value);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' onChange={handleInputChange}/>
        <button type="submit" onClick={() => handleOnClick()}>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
