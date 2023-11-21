/* eslint-disable no-case-declarations */
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    },
    addNewAnecdote(state, action) {
      const content = action.payload
      state.push (content)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      console.log('this is')
      console.log(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const getId = () => (100000 * Math.random()).toFixed(0)
const id = getId()
export const { voteAnecdote, addNewAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(id, content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateVote = (id, content, votes) => {
  return async dispatch => {
    const updatedAnecdote = {
      id: id,
      content: content,
      votes: votes+1
    }
    await anecdoteService.update(id, updatedAnecdote)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer