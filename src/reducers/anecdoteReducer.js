import anecdoteService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch (action.type) {
    case "NEW_ANECDOTE":
      return [...state, action.data];
    case "INIT_ANECDOTES":
      return action.data;
    case "VOTE": {
      const id = action.data.id;
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : action.data));
    }

    default:
      return state;
  }
};

export const vote = (anecdote) => {
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  return async (dispatch) => {
    const newObject = await anecdoteService.update(anecdote.id, changedAnecdote);
    dispatch({
      type: "VOTE",
      data: newObject,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default anecdoteReducer;
