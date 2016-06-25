import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import portfolio from './components/portfolio.js';
import WebProjects from './components/webProjects.js';
import OtherProjects from './components/otherProjects.js';

render((
  <Router history={browserHistory}>
    <Route path="portfolio/:type" component={portfolio} />
    <Route path="portfolio/" component={portfolio} />
  </Router>
), document.querySelector('#App'));
