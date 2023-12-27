import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAll, update } from './services/requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useReducer } from 'react'
import { useNotiDispatch} from './NotiContext'

const voteReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
        return state + 1
    default:
        return state
  }
}

const notiReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return { message: `anecdote '${action.anecdote}' voted` };
    default:
      return state;
  }
};


const App = () => {
  const [vote, voteDispatch] = useReducer(voteReducer,0)
  const noti = useNotiDispatch()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })
  
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    noti({ type: "VOTE", anecdote: anecdote.content });
    voteDispatch({ type: "VOTE" });
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  else if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
