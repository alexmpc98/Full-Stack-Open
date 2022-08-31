import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import anecdoteService from "./services/anecdotes";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = configureStore({reducer : reducer});

anecdoteService.getAll().then(anecdotes => store.dispatch(setAnecdotes(anecdotes)))

export default store;
