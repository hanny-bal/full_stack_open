import { useState } from 'react'

/**
 * Simple button that handles a click.
 * @param {onClick, text} param0 
 * @returns 
 */
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

/**
 * Simple statistics line.
 * @param {text, value} param0 
 * @returns 
 */
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}


/**
 * Standalone statistics component from exercise 1.8.
 * @param {good, neutral, bad} param0 
 * @returns 
 */
const Statistics = ({good, neutral, bad}) => {
  // Display statistics only once feedback has been gathered.
  if((good + neutral + bad) === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <table><tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good + neutral + bad} />
        <StatisticLine text='average' value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text='positive' value={(good) / (good + neutral + bad) * 100 + " %"} />
        </tbody></table>
    </>
  )
}


/**
 * Main App component.
 * @returns 
 */
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // functions to change the states
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button 
        onClick={increaseGood}
        text='good'
      />
      <Button 
        onClick={increaseNeutral}
        text='neutral'
      />
      <Button 
        onClick={increaseBad}
        text='bad'
      />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App