import createAsyncAction from 'utils/createAsyncAction';

function getUser() {
  return createAsyncAction('USER_GET_USER', () => (
    Promise.resolve({
      data: 'And you are one of React users.',
    })
  ));
}

export default {
  getUser,
};
