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
      mobileHeaderClass: '',
      postsDynamicClass: '',
      categories: ['web', 'business'],
      activeCategory: this.getActiveCategory(),
      isSmallScreen: this.getIsSmallScreen(),
    };
  },
  componentDidMount() {
    window.onresize = this.handleResize;
    window.onscroll = this.handleScroll;
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
  componentDidUpdate(prevProps, prevState) {
    const { isSmallScreen: currentIsSmallScreen } = this.state;
    const { isSmallScreen: wasSmallScreen } = prevState;

    if (currentIsSmallScreen !== wasSmallScreen) {
      console.log('switched');
      this.handleScroll();
    }
  },
  componentWillUnmount() {
    window.onresize = undefined;
    window.onscroll = undefined;
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
  handleScroll() {
    const { mobileHeaderClass, isSmallScreen } = this.state;

    if (!isSmallScreen) {
      if (mobileHeaderClass === 'stickyTop') {
        this.setState({
          mobileHeaderClass: '',
          postsDynamicClass: '',
        });
      }
      return;
    }


    const rect = this.portMenu.childDiv
      .getBoundingClientRect();

    if (rect.top <= 0) {
      if (mobileHeaderClass !== 'stickyTop') {
        this.setState({
          mobileHeaderClass: 'stickyTop',
          postsDynamicClass: 'stickyHeaderSpace',
        });
      }
    } else {
      if (mobileHeaderClass === 'stickyTop') {
        this.setState({
          mobileHeaderClass: '',
          postsDynamicClass: '',
        });
      }
    }
  },
  determineChild() {
    const { postsDynamicClass } = this.state;
    const propsToPass = {
      postsDynamicClass,
    };
    switch (this.props.params.type) {
      case 'other':
        return (
          <OtherProjects
            {...propsToPass}
          />
        );
      default:
        return (
          <WebPosts
            postDB={postDB.web}
            {...propsToPass}
          />
        );
    }
  },
  render() {
    const {
      navItems,
      activeCategory,
      isSmallScreen,
      categories,
      mobileHeaderClass,
    } = this.state;

    const infoForMenu = {
      categories,
      navItems,
      activeCategory,
      isSmallScreen,
      mobileHeaderClass,
    };

    return (
      <div className="row portfolio-container">
        <div className="box wrapper">
          <PortMenu
            portfolioState={infoForMenu}
            ref={el => { this.portMenu = el; }}
          />
          {this.determineChild()}
        </div>
      </div>
    );
  },
});

export default Portfolio;
