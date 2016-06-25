import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import portfolio from './components/portfolio.js';
import webProjects from './components/webProjects.js';
import otherProjects from './components/otherProjects.js';

render((
  <Router>
    <Route path="portfolio" component={portfolio} >
      <IndexRoute component={webProjects} />
      <Route path="other" component={otherProjects}/>
    </Route>
  </Router>
), document.querySelector('#App'));
