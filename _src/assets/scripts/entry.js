import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import portfolio from './components/portfolio/portfolio';
import blog from './components/blog/blog';

render((
  <Router history={browserHistory}>
    <Route path="portfolio/:type" component={portfolio} />
    <Route path="portfolio/" component={portfolio} />
    <Route path="blog/" component={blog} />
  </Router>
), document.querySelector('#App'));
