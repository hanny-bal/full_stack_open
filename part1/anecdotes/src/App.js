import { useState } from 'react'


/**
 * A simple button component.
 * @param {onClick, text} param0 
 */
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

/**
 * Main App component.
 * @returns 
 */
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  console.log("reset to " + selected)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  // function for selecting random quotes
  const generateRandomQuote = () => {
    let rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand) 
  }

  // function for increasing votes for the selected quote
  const increaseVotes = () => {
    let tmp = [...votes]
    tmp[selected] += 1
    setVotes(tmp)
  }

  const maxVotes = Math.max(...votes);
  const maxIndex = votes.indexOf(maxVotes);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
        <br/>
        has {votes[selected]} votes
      </p>

      <div>
        <Button 
         text='vote'
          onClick={increaseVotes}
        />
        <Button 
         text='next anecdote'
          onClick={generateRandomQuote}
        />
      </div>

      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxIndex]}<br/>has {votes[maxIndex]} votes</p>
    </div>
  )
}

export default App