import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import isNil from 'lodash/isNil';
import app from 'app/index';

import './styles/index.scss';

let client;
let initialState;

if (typeof window !== 'undefined') {
  // eslint-disable-next-line no-underscore-dangle
  initialState = window.__INITIAL_STATE__;
}

if (isNil(initialState)) {
  client = app.createStore(createBrowserHistory(), {});
} else {
  client = app.createStore(createBrowserHistory(), initialState);
}

const application = app.createApp(client.store, client.history);
ReactDOM.render(application, window.document.getElementById('app'));
