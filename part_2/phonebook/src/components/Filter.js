const Filter = (props) => {
    const {value,onChange} = props
  return (
    <div>
        filter shown with <input value={value} onChange={onChange}/>
      </div>
  )
}

export default Filter