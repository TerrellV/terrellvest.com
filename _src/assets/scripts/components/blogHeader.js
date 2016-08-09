import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import blogHeaderStyles from './blog-header.scss';
import sideBarStyles from './blog-sidebar.scss';
const cssModuleOptions = {
  allowMultiple: true,
  errorWhenNotFound: false,
}
const _BlogHeader = React.createClass({
  getInitialState() {
    return {
      activeCategory: null,
    }
  },
  setActiveCategory(newCat) {
    this.setState({
      activeCategory: newCat,
    })
  },
  render () {
    const { activeCategory } = this.state;
    const { headerType, categories } = this.props;
    return (
      <div styleName="blogHeaderCont">
        {
          headerType === 'SIDE_BAR'
            ? <BlogSideBar
                activeCategory={activeCategory}
                categories={categories}
                setActiveCategory={this.setActiveCategory}
              />
            : <MobileHeader
                activeCategory={activeCategory}
                categories={categories}
                setActiveCategory={this.setActiveCategory}
              />
        }
      </div>
    )
  }
});

const _BlogSideBar = React.createClass({
  render() {
    const { categories } = this.props;
    return (
      <div styleName="box blogSidebarCont">
        <div styleName="row sideBarRow">
          <div styleName="box slider">
            <span styleName="sliderBall"></span>
            <div styleName="sliderRail"></div>
          </div>
          <div styleName="box categoriesList">
            {categories.map(category =>
              <span key={category} styleName="categoryInSideBar">
                {category}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
});
const BlogSideBar = CSSModules(_BlogSideBar, sideBarStyles, cssModuleOptions);

const MobileHeader = React.createClass({
  getInitialState() {
    return {
      popupActive: false,
    }
  },
  render() {
    const { popupActive } = this.state;
    const { categories } = this.props;

    return (
      <div styleName="mobileBlogHeader">
        Mobile Header
        {popupActive ? <MobilePopup categories={categories} /> : null}
      </div>
    )
  }
});
const MobilePopup = React.createClass({
  render() {
    const { categories } = this.props;
    return (
      <div styleName="mobileBlogPopup">
      categories.map(key =>
        <span styleName="category">
          {categories[key]}
        </span>
      )
      </div>
    )
  }
});



export default CSSModules(_BlogHeader, blogHeaderStyles, cssModuleOptions)
