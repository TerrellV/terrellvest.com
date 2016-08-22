import React from 'react';
import shortid from 'shortid';

import PortMenu from './portfolioMenu/portMenu';

import portfolioPosts from '../../../.../../../../_dist/assets/json/portfolio.json';
import WebPosts from './webPosts';
import OtherProjects from './otherProjects';

const postDB = Object.keys(portfolioPosts)
  .reduce((acc, key) => {
    const postObj = portfolioPosts[key];
    return {
      ...acc,
      [postObj.type]: {
        ...acc[postObj.type],
        [shortid.generate()]: postObj,
      },
    };
  }, {});

const Portfolio = React.createClass({
  getInitialState() {
    return {
      navItems: {
        ONE: {
          type: 'web',
          text: 'web development',
          path: '/portfolio/',
          route: 'portfolio',
        },
        TWO: {
          type: 'business',
          text: 'business',
          path: '/portfolio/other',
          route: 'other',
        },
      },
      categories: ['web', 'business'],
      activeCategory: this.getActiveCategory(),
      isSmallScreen: this.getIsSmallScreen(),
    };
  },
  componentDidMount() {
    window.onresize = this.handleResize;
  },
  componentWillUpdate(nextProps) {
    const { params: nextParams } = nextProps;
    const { params: nowParams } = this.props;
    if (nextParams.type !== nowParams.type) {
      this.setState({
        activeCategory: this.getActiveCategory(nextProps),
      });
    }
  },
  componentWillUnmount() {
    window.onresize = null;
  },
  getIsSmallScreen() {
    return window.innerWidth < 650;
  },
  getActiveCategory(props = this.props) {
    switch (props.params.type) {
      case 'other':
        return 'business';
      default:
        return 'web';
    }
  },
  handleResize() {
    const smallScreen = this.getIsSmallScreen(); // truth
    const { isSmallScreen } = this.state; // state

    if (isSmallScreen !== smallScreen) {
      this.setState({
        isSmallScreen: smallScreen,
      });
    }
  },
  determineChild() {
    switch (this.props.params.type) {
      case 'other':
        return (
          <OtherProjects />
        );
      default:
        return (
          <WebPosts postDB={postDB.web} />
        );
    }
  },
  render() {
    const {
      navItems,
      activeCategory,
      isSmallScreen,
      categories,
    } = this.state;

    const infoForMenu = {
      categories,
      navItems,
      activeCategory,
      isSmallScreen,
    };

    return (
      <div className="row portfolio-container">
        <div className="box wrapper">
          <PortMenu portfolioState={infoForMenu} />
          {this.determineChild()}
        </div>
      </div>
    );
  },
});

export default Portfolio;
