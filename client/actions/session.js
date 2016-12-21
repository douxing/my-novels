import 'whatwg-fetch';

import {
  ACCOUNT_SET, ACCOUNT_RESET
} from '../actions/types';

const apiRoot = `//${location.hostname}:${location.port}/api`;
async function fetch_path (path, opts) {
  let url = `${apiRoot}${path[0]!=='/'?'/':''}${path}`;

  opts = opts || {};
  opts.credentials = 'same-origin';
  opts.headers = opts.headers || {};
  if (opts.body) {
    opts.headers['Content-Type'] = 'application/json';
    if (typeof opts.body !== 'string') {
      opts.body = JSON.stringify(opts.body);
    }
  }

  return fetch(url, opts);
};

async function fetch_api (path, opts) {
  try {
    let res = await fetch_path(path, opts);
    let json = null;

    if ((res.status >= 200 && res.status < 300)
        || (res.status >= 400 && res.status < 500)
        || (res.status >= 500 && res.status < 600)) {
      // get json
      json = await res.json();
    } else {
      throw `unknown status code: ${res.status}`
    }

    return json;
  } catch (err) {
    console.error(`[fetch_api] error on ${path}:`, err);
  }

  // make sure there is a return value
  return {
    errors: [{
      title: 'bad request'
    }]
  };
};

async function login (grant_type = 'cookie', opts = {}) {
  try {
    let res = await fetch_api('/login', {
      body: {
        grant_type,
        ...opts
      },
      method: 'POST'
    });

    return res;
  } catch (err) {
    console.error(`[login] error with ${grant_type}:`, err);
  }

  return {
    errors: [{
      title: 'bad request'
    }]
  };
};

export {
  fetch_api,
  login
};
