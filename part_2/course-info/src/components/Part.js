const Part = (props) => {
  const {name, exercises} = props
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

export default Part