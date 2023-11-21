import { setNotification, clearNotification } from '../reducers/notificationReducer'
export const showNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(setNotification(text));

    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};