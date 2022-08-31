import anecdoteReducer, { setAnecdotes } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = configureStore({reducer : reducer});

export default store;
