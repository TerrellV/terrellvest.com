import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './blog-posts.scss';
import PostPreview from './postPreview';
import shortid from 'shortid';

const BlogPosts = React.createClass({
  render() {
    const { dynamicClass: dc, posts, headerType } = this.props;
    return (
      <div
        styleName={`box blogPostsCont ${headerType} ${dc}`}
      >
        {
          posts.map((post) =>
            <PostPreview
              {...post}
              key={shortid.generate()}
              onMobile={this.props.onMobile}
            />
          )
        }
      </div>
    );
  },
});


export default CSSModules(BlogPosts, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
