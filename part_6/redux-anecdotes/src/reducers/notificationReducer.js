
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      const content = action.payload
      return `You added '${content}'`
    },
    voteNotification(state, action) {
      const content = action.payload
      return `You voted '${content}'`
    }
  }
})

export const { addNotification, voteNotification } = notificationSlice.actions
export default notificationSlice.reducer