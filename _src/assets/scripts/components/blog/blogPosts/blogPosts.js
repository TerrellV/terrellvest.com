import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import styles from './blog-posts.scss';
import PostPreview from './PostPreview';


const BlogPosts = props => {
  return (
    <div styleName={`box blogPostsCont ${props.dynamicClass}`}>
      {
        props.posts.map(post =>
          <PostPreview {...post} />
        )
      }
    </div>
  )
}


export default CSSModules(BlogPosts, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
})
