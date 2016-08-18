import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import styles from './blog-posts.scss';
import PostPreview from './PostPreview';


const BlogPosts = props => {
  const posts = Array.from(props.posts);
  posts.push(...posts);
  posts.push(...posts);
  posts.push(...posts);
  return (
    <div styleName={`box blogPostsCont ${props.dynamicClass}`}>
      {
        posts.map(post =>
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
