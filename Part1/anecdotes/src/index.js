import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const App = (props) => {
  const [selected, setSelected] = useState({
   index:0 , 
   votes: [0,0,0,0,0,0]
  })  

  const Randomizer  = () => {  
    setSelected({...selected, index: Math.floor((Math.random() * 6))});

  }
  const anecdoteWithMostVotes = () => {
    return selected.votes.indexOf(Math.max.apply(null, selected.votes));
  }

  const Vote = () =>{
    const copy = [ ...selected.votes ]
    copy[selected.index] += 1;
    setSelected({...selected, votes: [... copy]});
  }

   var topAnecdote = anecdoteWithMostVotes();

  return (
    <div>
      <p>{props.anecdotes[selected.index]} </p>
      <p> has {selected.votes[selected.index]} votes!</p>
      <button onClick = {Randomizer}>Random Quote</button>
      <button onClick = {Vote}>Vote</button>
      <p>{props.anecdotes[topAnecdote]}</p>
      <p>it has {selected.votes[topAnecdote]}</p>
       </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
