import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import blogStyles from './blog-styles.scss';

import blogPosts from '../../../../_dist/assets/json/blog.json';
import blogCategories from '../../../../_dist/assets/json/blogCategories.json';
import BlogPosts from './blogPosts';
import BlogHeader from './blogHeader';

const Blog = React.createClass({
  componentWillMount() {
    this.handleResize();
    window.onresize = this.handleResize;
  },
  getInitialState() {
    return {
      headerType: null,
    }
  },
  handleResize() {
    const screenWidth = window.innerWidth;
    const { headerType } = this.state;

    if (screenWidth <= 650 ) {
      if (headerType !== 'TOP_HEADER') {
        this.setState({ headerType: 'TOP_HEADER' });
      }
    } else if (headerType !== 'SIDE_BAR') {
      this.setState({ headerType: 'SIDE_BAR' });
    }
  },
  render() {
    const { headerType } = this.state;
    // const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    const blogCatArray = Object.keys(blogCategories)
      .map(key => blogCategories[key]);

    return (
      <div styleName="row blog-container">
        <div styleName="box wrapper">
          <div styleName="row blog-row">
            <BlogHeader
              headerType={headerType}
              categories={blogCatArray}
            />
            <BlogPosts posts={blogPosts}/>
          </div>
        </div>
      </div>

    )
  }
})

export default CSSModules(Blog, blogStyles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
