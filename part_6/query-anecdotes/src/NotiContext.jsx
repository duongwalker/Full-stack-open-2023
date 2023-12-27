/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'


const notiReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      return { message: `anecdote '${action.anecdote}' voted` }
    case "CREATE":
      return {message: `anecdote '${action.anecdote}' created`}
    case "LENGTH":
      return {message: 'too short anecdote, must have length 5 or more'}
    case "RESET":
      return {message: ''}
    default:
      return state;
  }
};

const NotiContext = createContext()

export const NotiContextProvider = (props) => {
  const [noti, notiDispatch] = useReducer(notiReducer, '')

  return (
    <NotiContext.Provider value = {[noti, notiDispatch]}>
      {props.children}
    </NotiContext.Provider>
  )
}

export const useNotiValue = () => {
  const notiAndDispatch = useContext(NotiContext)
  return notiAndDispatch[0]
}

export const useNotiDispatch = () => {
  const notiAndDispatch = useContext(NotiContext)
  return notiAndDispatch[1]
}

export default NotiContext