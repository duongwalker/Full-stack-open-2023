const Notification = ({message, isSuccess}) => {

  if (message===null || message==='') {
    return null
  }
  
  else {
    return (
      <div className={isSuccess ? 'noti' : 'error'}>
          {message}
      </div>
    )
  }
}

export default Notification