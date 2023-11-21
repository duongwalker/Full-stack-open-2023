import { useSelector, useDispatch } from 'react-redux'
import { updateVote, voteAnecdote } from '../reducers/anecdoteReducer'
import Filter from './Filter'

import { showNotification } from '../services/notificationActions'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if(state.filter==='') {
      return state.anecdotes.filter(anecdote => anecdote.content)
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })
  const sortedAnecdotes = anecdotes.sort((a, b) => a.votes - b.votes)
  const dispatch = useDispatch()

 
  const vote = (id, content, votes) => {
    dispatch(showNotification(`You voted '${content}'`, 5))
    dispatch(updateVote(id, content, votes))
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
            <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList