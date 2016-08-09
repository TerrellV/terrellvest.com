import React, { PropTypes } from 'react'

const PostPreview = props =>
  <div className="postPreview">
    <h1>{props.title}</h1>
  </div>

const BlogPosts = props =>
  <div className="box blogPostsCont">
    {
      Object.keys(props.posts).map(key =>
        <PostPreview {...props.posts[key]} key={props.posts[key].title} />
      )
    }
  </div>

export default BlogPosts
