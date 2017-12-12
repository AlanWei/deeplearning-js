import createReducer from 'utils/createReducer';

const defaultState = () => ({
  user: '',
});

const getUserSuccess = (state, action) => ({
  ...state,
  user: action.payload.data,
});

export default createReducer(defaultState, {
  USER_GET_USER_SUCCESS: getUserSuccess,
});
