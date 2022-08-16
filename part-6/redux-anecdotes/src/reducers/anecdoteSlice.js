import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote_anecdote: (state, action) =>
      state.map((anecdote) =>
        anecdote.id !== action.payload
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      ),
    add_anecdote: (state, action) => [...state, action.payload],
    set_anecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { vote_anecdote, add_anecdote, set_anecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(set_anecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(add_anecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.vote(anecdote);
    dispatch(vote_anecdote(anecdote.id));
  };
};
