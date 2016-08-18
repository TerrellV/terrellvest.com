import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './blog.scss';

import blogPosts from '../../../../../_dist/assets/json/blog.json';
import blogCategories from '../../../../../_dist/assets/json/blogCategories.json';
import BlogPosts from './blogPosts/blogPosts';
import BlogMenuContainer from './blogMenu/blogMenuContainer';

const Blog = React.createClass({
  getInitialState() {
    return {
      headerType: null,
      mobileHeaderClass: '',
      activeCategory: 'all',
    };
  },
  componentWillMount() {
    this.handleHorizResize();
    window.onresize = this.handleHorizResize;
    const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
    this.onMobile = onMobile;
  },
  componentDidMount() {
    this.handleVertScroll();
  },
  componentWillUnmount() {
    window.onresize = undefined;
    window.onscroll = undefined;
  },
  setActiveCategory(e, newCat) {
    this.setState({
      activeCategory: newCat,
    });
  },
  handleVertScroll() {
    const { mobileHeaderClass, headerType } = this.state;
    window.onscroll = this.handleVertScroll;
    const topPos = this.onMobile ? 6 : 0;
    if (headerType === 'SIDE_BAR') return;

    const rect = this.blogHeaderComponent.blogHeader
      .getBoundingClientRect();

    if (rect.top <= 0) {
      if (mobileHeaderClass !== 'stickyTop') {
        this.setState({
          mobileHeaderClass: 'stickyTop',
          blogPostsDynamicClass: 'stickyHeaderSpace',
        });
      }
    } else {
      if (mobileHeaderClass === 'stickyTop') {
        this.setState({
          mobileHeaderClass: '',
          blogPostsDynamicClass: '',
        });
      }
    }
  },
  handleHorizResize() {
    const screenWidth = window.innerWidth;
    const { headerType } = this.state;

    if (screenWidth <= 650) {
      if (headerType !== 'TOP_HEADER') {
        this.setState({ headerType: 'TOP_HEADER' });
      }
    } else if (headerType !== 'SIDE_BAR') {
      this.setState({ headerType: 'SIDE_BAR' });
    }
  },
  render() {
    const { headerType, mobileHeaderClass, blogPostsDynamicClass, activeCategory } = this.state;

    const blogCatArray = Object.keys(blogCategories)
      .map(key => blogCategories[key]);

    // add something to sort them by order
    const postsToShow = Object.keys(blogPosts)
      .reduce((arr, key) => arr.concat(blogPosts[key]), [])
      .filter(post => {
        if (activeCategory === 'all') return true;
        return post.categories.indexOf(activeCategory) > -1;
      });

    return (
      <div styleName="row blog-container">
        <div styleName="box blog-wrapper wrapper">
          <div styleName="row blog-row">
            <BlogMenuContainer
              activeCategory={activeCategory}
              mobileHeaderClass={mobileHeaderClass}
              headerType={headerType}
              categories={blogCatArray}
              ref={el => {
                this.blogHeaderComponent = el;
              }}
              setActiveCategory={this.setActiveCategory}
            />
            <BlogPosts
              activeCategory={activeCategory}
              posts={postsToShow}
              dynamicClass={blogPostsDynamicClass}
            />
          </div>
        </div>
      </div>
    );
  },
});

export default CSSModules(Blog, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});


/* SAVE FOR later

  const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

*/
