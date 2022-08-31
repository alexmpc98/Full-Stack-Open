import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotificationContent,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.filter === '' ? state.anecdotes : state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  });
  const dispatch = useDispatch();

  const addVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotificationContent(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
