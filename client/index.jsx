import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import {
  REDIRECT_PATH_SET
} from './actions/types';

import reducers from './reducers';
const store = createStore(reducers);

import App from './containers/app';
import Login from './containers/login';

import PageNotFound from './components/page_not_found';

function onAppEnterHook (nextState, replace) {
  if (nextState.location.pathname !== '/login') {
    store.dispatch({
      type: REDIRECT_PATH_SET,
      payload: `${nextState.location.pathname}${nextState.location.search}`
    });
    replace({ pathname: '/login' });
  }
}

render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='login' component={Login}></Route>
    </Route>
    <Route path='*' component={PageNotFound}>
      /* using this makes the root route match */
    </Route>
  </Router>
</Provider>, document.getElementById('app'));
