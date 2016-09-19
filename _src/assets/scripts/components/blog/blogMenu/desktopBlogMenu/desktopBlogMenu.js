import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import styles from './desktop-blog-menu.scss';


const DesktopBlogMenu = React.createClass({
  componentWillMount() {
    const { categories, activeCategory } = this.props;
    const ballPosition = categories.indexOf(activeCategory) + 1;
    this.setState({
      ballPosition,
    })
  },
  getInitialState() {
    return {
      ballPosition: 0,
    }
  },
  _handleCategoryClick(e, cat, index) {
    this.setState({
      ballPosition: index
    }, () => {
      this.props.setActiveCategory(e, cat);
    })
  },
  render() {
    const { ballPosition } = this.state;
    const { categories, setActiveCategory, activeCategory } = this.props;
    const fullCategoryList = ['all', ...categories];
    const ballOffsetTop = 20;
    const seperation = 60;
    const positions = fullCategoryList.map((cat, i) => i * seperation);
    const ballSliderPosition = positions[ballPosition];
    const railHeight = Array.from(positions).pop() + 90;

    return (
      <div styleName="box blogSidebarCont">
        <div styleName="menu-title">
          Category
        </div>
        <div styleName="row sideBarRow">
          <div styleName="box slider">
            <span
              styleName="sliderBall"
              style={{transform: `translateY(${ballSliderPosition}px)`}}
            ></span>
            <div
              style={{height: `${railHeight}px`}}
              styleName="sliderRail"
            ></div>
          </div>
          <div styleName="box categoriesList">
            {fullCategoryList.map((category, i) => {
              const activeClass = category === activeCategory ? 'active' : '';
              return (
                <span
                  key={category}
                  style={{top: `${positions[i]}px`}}
                  styleName={`categoryInSideBar ${activeClass}`}
                  onClick={e => this._handleCategoryClick(e, category, i)}
                >
                  {category}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
});
export default CSSModules(DesktopBlogMenu, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
