const PersonForm = (props) => {
    const {onSubmit, name, number, handleNameChange, handleNumberChange, handleMessage} = props
    
  return (
    <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={handleMessage}>add</button>
        </div>
      </form>
  )
}

export default PersonForm