import {
  combineReducers
} from 'redux';

import {
  REDIRECT_PATH_SET,
  ACCOUNT_SET, ACCOUNT_RESET
} from '../actions/types';

const redirect_path_init_state = '/';
const redirect_path = function (state = redirect_path_init_state, action) {
  if (action.type === REDIRECT_PATH_SET) {
    return action.payload;
  }

  return state;
};

const account_init_state = {
  nickname: 'guest',
  session_status: 'none' // login, loginning
};
const account = function (state = account_init_state, action) {
  if (action.type === ACCOUNT_SET) {
    return {
      ...state,
      ...action.payload
    };
  } else if (action.type === ACCOUNT_RESET) {
    return account_init_state;
  }

  return state;
}

export default combineReducers({
  redirect_path,
  account
});
