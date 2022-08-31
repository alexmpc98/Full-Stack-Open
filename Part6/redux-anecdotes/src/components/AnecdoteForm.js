import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    console.log(event.target.anecdote.value)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))
  }
  return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div>
            <input name="anecdote" placeholder="Insert Anecdote" />
        </div>
        <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm
