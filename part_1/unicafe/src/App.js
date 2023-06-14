import { useState } from 'react'

const StatisticLine = (props) => {
  const { text, value, unit } = props

  return (
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value} {unit && `${unit}`}</td>
        </tr>
      </tbody>
    
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, all, average, positive } = props

  if(all===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <table>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} unit="%"/>
    </table>
  )
}

const Button = (props) => {
  const {text, onClick} = props
  
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  
  const handleGoodFeedback = () => {
    const updatedGood = good+1
    const updatedAll= updatedGood+neutral+bad
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood+neutral*0+bad*(-1))/updatedAll)
    setPositive(updatedGood/updatedAll*100)
  }

  const handleBadFeedback =  () => {
    const updatedBad = bad+1
    const updatedAll= good+neutral+updatedBad
    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good+neutral*0+updatedBad*(-1))/updatedAll)
    setPositive(good/updatedAll*100)
  }

  const handleNeutralFeedback =  () => {
    const updatedNeutral=neutral+1
    const updatedAll = good+updatedNeutral+bad
    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAverage((good+updatedNeutral*0+bad*(-1))/updatedAll)
    setPositive(good/updatedAll*100)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodFeedback}/>
      <Button text="neutral" onClick={handleNeutralFeedback}/>
      <Button text="bad" onClick={handleBadFeedback}/>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}  />
    </div>
  )
}

export default App