import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import map from 'lodash/map';
import routes from './routes';

const propTypes = {
  history: PropTypes.object.isRequired,
};

const Router = props => (
  <ConnectedRouter history={props.history}>
    <div>
      {map(routes, (route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </div>
  </ConnectedRouter>
);

Router.propTypes = propTypes;
export default Router;
