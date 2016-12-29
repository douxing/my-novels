import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { loginWithPassword } from '../actions/session';

import {
  ACCOUNT_SET
} from '../actions/types';

import styles from '../styles/index.css';

import {
  ACCOUNT_COOKIE
} from '../config';

class Login extends Component {
  render () {
    return <div className={`${styles['login-container']}`}>
      <div className={`${styles['login-container__title-wrapper']}`}>
        <h2>用户登录</h2>
      </div>
      <div className={`${styles['login-container__form']}`}>
        <div className={`${styles['login-container__form-item']}`}>
          <input type='text' placeholder='邮箱或手机号码'>
          </input>
        </div>
        <div className={`${styles['login-container__form-item']}`}>
          <input type='text' placeholder='登录密码'>
          </input>
        </div>
      </div>
      <div className={`${styles['login-container__login-button-wrapper']}`}>
        <button className={`${styles['login-container__login-button']}`}>登录</button>
      </div>
    </div>;
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    account: state.account
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
        
      }
    }
  };
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;
