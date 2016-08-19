import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './blog.scss';
import shortid from 'shortid';

import blogPostsBank from '../../../../../_dist/assets/json/blog.json';
import blogCategories from '../../../../../_dist/assets/json/blogCategories.json';
import BlogPosts from './blogPosts/blogPosts';
import BlogMenuContainer from './blogMenu/blogMenuContainer';

const Blog = React.createClass({
  getInitialState() {
    const defaultCategory = 'all';
    const allPosts = Object.keys(blogPostsBank)
      .reduce((arr, key) =>
        arr.concat(blogPostsBank[key]), []
      );

    return {
      onMobile: this.isOnMobile(),
      headerType: null,
      mobileHeaderClass: '',
      activeCategory: defaultCategory,
      blogPostsKey: shortid.generate(),
      postsToShow: this.filterPosts(defaultCategory, allPosts),
      blogPostsDynamicClass: '',
      allPosts,
    };
  },
  componentWillMount() {
    this.handleHorizResize();
    window.onresize = this.handleHorizResize;
    // window.onscroll = this.handleVertScroll;
    window.onscroll = function scroll() {
      this.handleVertScroll();
    }.bind(this);
  },
  isOnMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);
  },
  componentWillUpdate(nProps, nState) {
    if (nState.activeCategory !== this.state.activeCategory) {
      this.setState({ blogPostsKey: shortid.generate() });
    }
  },
  componentWillUnmount() {
    window.onresize = undefined;
    window.onscroll = undefined;
  },
  setActiveCategory(e, newCat) {
    const { allPosts } = this.state;
    this.setState({
      activeCategory: newCat,
      postsToShow: this.filterPosts(newCat, allPosts),
    });
  },
  handleVertScroll() {
    // debugger;
    const { mobileHeaderClass, headerType } = this.state;
    if (headerType === 'SIDE_BAR') return;

    const rect = this.BlogMenuContainer.menuContDiv
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
  filterPosts(activeCategory, allPosts) {
    if (activeCategory === 'all') return allPosts;

    const filteredPosts = Array.from(allPosts)
      .filter(post =>
        post.categories.indexOf(activeCategory) > -1
      );
    return filteredPosts;
  },
  render() {
    const {
      headerType,
      mobileHeaderClass,
      activeCategory,
      blogPostsKey,
      postsToShow,
      blogPostsDynamicClass,
      onMobile,
    } = this.state;


    const blogCatArray = Object.keys(blogCategories)
      .map(key => blogCategories[key]);

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
                this.BlogMenuContainer = el;
              }}
              setActiveCategory={this.setActiveCategory}
            />
            <BlogPosts
              key={blogPostsKey}
              headerType={headerType}
              activeCategory={activeCategory}
              posts={postsToShow}
              dynamicClass={blogPostsDynamicClass}
              onMobile={onMobile}
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
