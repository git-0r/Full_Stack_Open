import React, { useState } from "react";

const Display = ({ array, index }) => <p>{array[index]}</p>;

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{text}</button>

const Heading = ({ text }) => <h1>{text}</h1>


const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))
  const randomNumber = () => Math.floor(Math.random() * 7)

  const addVote = () => {
    console.log(selected, votes)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const nextAnecdote = () => setSelected(randomNumber())

  const HighestVotes = () => {
    let i = 0
    votes.forEach(vote => {
      if (vote > i) {
        i = vote
      }
    })

    if (i === 0) {
      return <p>No votes yet</p>
    } else {
      return (
        <div>
          <Display array={anecdotes} index={votes.indexOf(i)} />
          <p>has {i} votes</p>
        </div>
      )
    }

  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Display array={anecdotes} index={selected} />
      <p>has {votes[selected]}  votes</p>
      <Button text="vote" clickHandler={() => addVote()} />
      <Button text="next anecdote" clickHandler={() => nextAnecdote()} />
      <Heading text="Anecdote with most votes" />
      <HighestVotes />
    </div>
  )
}

export default App;