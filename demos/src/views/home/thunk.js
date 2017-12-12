import action from './action';

const thunk = store => ([
  store.dispatch(action.getMessage()),
]);

export default thunk;
