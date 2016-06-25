import React, { PropTypes } from 'react'
import { Link } from 'react-router';
import PortfolioNav from './portfolioNav';

const Portfolio = React.createClass({
  render () {
    return (
      <div className="row portfolio-container">
        <div className="box wrapper">
          <PortfolioNav />
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default Portfolio;
