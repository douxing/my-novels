import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginWithPassword } from '../actions/session';

import {
  ACCOUNT_SET
} from '../actions/types';

import {
  login
} from '../actions/session';

import jwt from 'jsonwebtoken';

import styles from '../styles/index.css';

import {
  ACCOUNT_COOKIE
} from '../config';

class Login extends Component {
  onLogin (event) {
    event.preventDefault();

    let { loginWithPassword } = this.props;
    let email = this.nameInput.value;
    let password = this.passwordInput.value;

    loginWithPassword(email, password);
  }

  constructor (props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount () {
    let {
      account, account_token, loginWithCookie
    } = this.props;

    if (account_token && account.login_status === 'none') {
      loginWithCookie();
    }
  }

  render () {
    return <div className={`${styles['login-container']}`}>
      <div className={`${styles['login-container__title-wrapper']}`}>
        <h2>用户登录</h2>
      </div>
      <div className={`${styles['login-container__form']}`}>
        <div className={`${styles['login-container__form-item']}`}>
          <input type='text' placeholder='邮箱或手机号码'
                 ref={(nameInput) => { this.nameInput = nameInput; }}></input>
        </div>
        <div className={`${styles['login-container__form-item']}`}>
          <input type='password' placeholder='登录密码'
                 ref={(passwordInput) => { this.passwordInput = passwordInput; }}></input>
        </div>
      </div>
      <div className={`${styles['login-container__login-button-wrapper']}`}>
        <button className={`${styles['login-container__login-button']}`}
                onClick={this.onLogin}>登录</button>
      </div>
    </div>;
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    account: state.account,
    account_token: jwt.decode(Cookies.get(ACCOUNT_COOKIE)),
    redirect_path: state.redirect_path
  };
};

const mapDispatchToProps = (dispatch, ownProps = {}) => {
  return {
    async loginWithCookie () {
      dispatch({
        type: ACCOUNT_SET,
        payload: {
          session_status: 'loginning'
        }
      });

      let res = await login('cookie');
      if (res && res.data) {
        dispatch({
          type: ACCOUNT_SET,
          payload: {
            id: res.data.id,
            ...res.data.attributes,
            session_status: 'login'
          }
        });
      } else {
        Messenger().post({
          message: 'login with cookie failed',
          type: 'error',
          showCloseButton: true
        });

        Cookies.remove(ACCOUNT_COOKIE);

        dispatch({
          type: ACCOUNT_SET,
          payload: {
            nickname: 'guest',
            session_state: 'none'
          }
        });
      }
    },

    async loginWithPassword (email, password) {
      dispatch({
        type: ACCOUNT_SET,
        payload: {
          session_status: 'loginning'
        }
      });

      let res = await login('password', {
        email, password
      });

      if (res && res.data) {
        dispatch({
          type: ACCOUNT_SET,
          payload: {
            id: res.data.id,
            ...res.data.attributes,
            session_status: 'login'
          }
        });
      } else {
        Messenger().post({
          message: 'login with password failed',
          type: 'error',
          showCloseButton: true
        });
        
        Cookies.remove(ACCOUNT_COOKIE);

        dispatch({
          type: ACCOUNT_SET,
          payload: {
            nickname: 'guest',
            session_state: 'none'
          }
        });
      }
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
