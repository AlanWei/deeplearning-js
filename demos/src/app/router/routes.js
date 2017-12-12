import loadable from 'react-loadable';
import createAsyncThunk from 'utils/createAsyncThunk';

const Loading = () => (
  'Loading'
);

const AsyncHome = loadable({
  loader: () => import('../../views/home'),
  loading: Loading,
});

const AsyncUser = loadable({
  loader: () => import('../../views/user'),
  loading: Loading,
});

const routes = [{
  path: '/',
  exact: true,
  component: AsyncHome,
  thunk: createAsyncThunk(() => import('../../views/home/thunk')),
}, {
  path: '/user',
  component: AsyncUser,
  thunk: createAsyncThunk(() => import('../../views/user/thunk')),
}];

export default routes;
