import React, { PropTypes } from 'react'
import { Link } from 'react-router';
import PortfolioNav from './portfolioNav';

import portfolioPosts from '../../../../_dist/assets/json/portfolio.json';
import WebProjects from './webProjects';
import OtherProjects from './otherProjects';
import shortid from 'shortid';

const postDB = Object.keys(portfolioPosts)
  .reduce( (acc, key) => {
    const postObj = portfolioPosts[key];
    return {
      ...acc,
      [postObj.type]: {
        ...acc[postObj.type],
        [shortid.generate()]: postObj
      }
    }
  }, {});

const Portfolio = React.createClass({
  determineChild(){
    switch(this.props.params.type){
      case 'other':
        return (
          <OtherProjects />
        );
      default:
        return (
          <WebProjects postDB={postDB.web}/>
        )
    }
  },
  render () {
    return (
      <div className="row portfolio-container">
        <div className="box wrapper">
          <PortfolioNav />
          {this.determineChild()}
        </div>
      </div>
    )
  }
})

export default Portfolio;
