import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import portfolio from './components/portfolio.js';
import WebProjects from './components/webProjects.js';
import OtherProjects from './components/otherProjects.js';

render((
  <Router history={browserHistory}>
    <Route path="portfolio" component={portfolio}>
      <IndexRoute component={WebProjects} />
      <Route path="other" component={OtherProjects} />
    </Route>
  </Router>
), document.querySelector('#App'));
