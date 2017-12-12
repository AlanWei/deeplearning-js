import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../assets/logo.svg';
import action from './action';
import homeAction from '../home/action';
import './style.scss';

const propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
};

class User extends Component {
  componentDidMount() {
    this.props.getMessage();
    this.props.getUser();
  }

  render() {
    return (
      <div className="user">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/views/user/index.js</code> and save to reload.
        </p>
        <p className="App-intro">
          {this.props.message}
        </p>
        <p className="App-intro">
          {this.props.user}
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
  message: state.home.message,
});

const mapDispatchToProps = {
  getUser: action.getUser,
  getMessage: homeAction.getMessage,
};

User.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(User);
