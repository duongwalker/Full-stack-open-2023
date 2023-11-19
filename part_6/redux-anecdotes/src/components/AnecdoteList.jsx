import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'
// import { createSlice } from '@reduxjs/toolkit'
import { voteNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const sortedAnecdotes = anecdotes.sort((a, b) => a.votes - b.votes)
  const dispatch = useDispatch()
  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(voteNotification(content))
    console.log('vote', id)
  }

  return (
    <>
      <h2>Anecdotes</h2>
      <Filter />
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList