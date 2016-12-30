import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import jwt from 'jsonwebtoken';

import {
  ACCOUNT_SET, ACCOUNT_RESET
} from '../actions/types';

import styles from '../styles/index.css';

import {
  ACCOUNT_COOKIE
} from '../config';

class App extends Component {
  constructor (props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout (event) {
    event.preventDefault();

    this.props.logout();
  }

  render () {
    let avatarView = null;
    let { account } = this.props;

    if (account.session_status === 'login') {
      avatarView = <span className={`${styles['navbar__item']}`}>
        <span className={`${styles['navbar__title-text']}`}>{account.nickname}</span>
      </span>;
    } else if (account.session_status === 'loginning') {
      avatarView = <span className={`${styles['navbar__item']}`}>
        <span className={`${styles['navbar__title-text']}`}>Loginning...</span>
      </span>;
    } else if (account.session_status === 'none') {
      avatarView = <span className={`${styles['navbar__item']}`}>
        <Link to="/Register" className={`${styles['navbar__title-text']}`}>Register</Link>
        <Link to="/login" className={`${styles['navbar__title-text']}`}>Login</Link>
      </span>;
    } else {
      // should never happen
      console.error(`[container app] unknown session_status:`, account.session_status);
    }

    return <div className={`${styles['container']} ${styles['container--column']}`}>
      <div className={`${styles['navbar']}`}>
        <span name='left-menu-container' className={`${styles['navbar__item']}`}>
          <img src='/public/icon.jpg' className={`${styles['navbar__title-img']}`}></img>
          <span className={`${styles['navbar__title-text']}`}>My Novels</span>
        </span>
        <span name='right-menu-container' className={`${styles['navbar__item']}`}>
          {avatarView}
        </span>
      </div>

      <div className={`root-wrapper`}>
        { this.props.children }
      </div>
    </div>;

    let bbbb = <div className={`${styles['body']}`}>
      <div className={`${styles['aside']}`}></div>
      <div className={`${styles['main']}`}>
        hello, world
      </div>
    </div>;
  }
};

const mapStateToProps = (state, ownProps = {}) => {
  return {
    account: state.account
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout () {
      Cookies.remove(ACCOUNT_COOKIE);
      dispatch({
        type: ACCOUNT_RESET
      });
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
