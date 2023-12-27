import React, { useEffect } from 'react';
import { useNotiValue, useNotiDispatch } from "../NotiContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const anecdote = useNotiValue()
  const notiDispatch = useNotiDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      notiDispatch({ type: "RESET" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [anecdote]);
  return (
    <div style={anecdote.message ? style : {}} >
      {anecdote.message} 
    </div>
  )
}

export default Notification
