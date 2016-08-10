import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import DesktopBlogMenu from './desktopBlogMenu/desktopBlogMenu';
import MobileBlogMenu from './mobileBlogMenu/mobileBlogMenu';
import styles from './blog-menu-container.scss';

const BlogMenuContainer = React.createClass({
  render () {
    const { headerType, categories, mobileHeaderClass, setActiveCategory, activeCategory } = this.props;
    return (
      <div styleName="blogMenuCont" ref={el => this.blogHeader = el} >
        {
          headerType === 'SIDE_BAR'
            ? <DesktopBlogMenu
                activeCategory={activeCategory}
                categories={categories}
                setActiveCategory={setActiveCategory}
              />
            : <MobileBlogMenu
                dynamicClass={mobileHeaderClass}
                activeCategory={activeCategory}
                categories={categories}
                setActiveCategory={setActiveCategory}
              />
        }
      </div>
    )
  }
});


export default CSSModules(
  BlogMenuContainer,
  styles,
  {
    allowMultiple: true,
    errorWhenNotFound: false,
  }
)
