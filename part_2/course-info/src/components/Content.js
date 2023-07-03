import Part from "./Part"
const Content = (props) => {
    const {parts} = props

    const totalExercises = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises,0)
  return (
    <div>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
        <h3>total of {totalExercises} exercises</h3>
    </div>
  )
}

export default Content