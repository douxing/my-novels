import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import jwt from 'jsonwebtoken';

import {
  ACCOUNT_SET, ACCOUNT_RESET
} from '../actions/types';

import styles from '../styles/index.css';

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
      avatarView = <li className="dropdown">
      <Link className="dropdown-toggle" data-toggle="dropdown"
            role="button" aria-haspopup="true"
            aria-expanded="false">
        {account.nickname}<span className="caret"></span>
      </Link>
      <ul className="dropdown-menu">
        <li><Link to='#' onClick={this.onLogout}>Logout</Link></li>
        </ul>
      </li>;
    } else if (account.session_status === 'logginning') {
      avatarView = <li>
        <Link>Logging in...</Link>
      </li>;
    } else if (account.session_status === 'none') {
      avatarView = <span className="dropdown">
        <Link to="/Register">Register</Link>
        <Link to="/login">Login</Link>
      </span>;
    } else {
      // should never happen
      console.error(`[container app] unknown session_status:`, account.session_status);
    }

    return <div className={`${styles['container']} ${styles['container--column']}`}>
      <div className={`${styles['navbar']}`}>
        <span name='left-menu-container'>
          <img src='/public/icon.jpg' className={`${styles['navbar__title-img']}`}></img>
        </span>
        <span name='right-menu-container'>
          {avatarView}
        </span>
      </div>

      <div className={``}>
        { this.props.children }
      </div>

      <div className={`${styles['container']} ${styles['aaa']}`}>
        <div className={`${styles['bbb']}`}>
          <div className={`${styles['aaa']}`}>
            <div className={`${styles['bbb']}`}>
              leftright
            </div>
          </div>
        </div>
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
      Cookies.remove('account_info');
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
