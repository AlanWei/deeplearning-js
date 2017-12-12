import get from 'lodash/get';
import isArrayLikeObject from 'lodash/isArrayLikeObject';

function promisify(value) {
  if (typeof value.then === 'function') {
    return value;
  }

  if (isArrayLikeObject(value)) {
    return Promise.all(value);
  }

  return value;
}

function createAsyncThunk(thunk) {
  return store => (
    thunk()
      .then(component => get(component, 'default', component))
      .then(component => component(store))
      .then(component => promisify(component))
  );
}

export default createAsyncThunk;
