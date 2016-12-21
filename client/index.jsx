import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import reducers from './reducers';
const store = createStore(reducers);

import App from './containers/app';

import PageNotFound from './components/page_not_found';

render(<Provider store={store}>
  <Router history={browserHistory}>
    <Route path='/' component={App}>
    </Route>
    <Route path='*' component={PageNotFound}>
      /* using this makes the root route match */
    </Route>
  </Router>
</Provider>, document.getElementById('app'));
