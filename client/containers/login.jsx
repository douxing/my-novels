import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginWithPassword } from '../actions/session';

import {
  ACCOUNT_SET
} from '../actions/types';

class Login extends Component {
  render () {
    return <div>
      Hello, world;
    </div>;
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    account: state.account
  };
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {};
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
