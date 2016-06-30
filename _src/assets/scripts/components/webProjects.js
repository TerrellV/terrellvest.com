import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import SVG from './svg';


const PostItemView = ({postID, post, linkStyles}) =>
  <div className="row project-item-row" key={postID}>
    <div
      className="box m--5-12 proj-prev-img-padding"
    >
      <div
        className="proj-prev-img-cont"
        style={{backgroundColor: `${post.color}`}}
      >
        <SVG
          className="prev-img-svg"
          id={post.title.toLowerCase().trim().replace(/\s/g, '-')}
          />
        <div className={"stretcher"}></div>
      </div>
    </div>
    <div className="box m--7-12 proj-prev-text-cont">
      <h1 className="proj-prev-heading">{post.title}</h1>
      <h4 className="proj-prev-subheader">{post.subheader}</h4>
      <p className="proj-prev-descripton">{post.dcr}</p>
      <div className="proj-prev-text-links" >
        <a
          href={post.path}
          style={linkStyles}
          target="_blank"
        >
          Read More
        </a>
        <a
          href={post.links.app}
          style={linkStyles}
          target="_blank"
        >
          View App
        </a>
      </div>
    </div>
  </div>

const WebProjects = ({postDB}) => {
  return (
    <div className="web-project-container">
      {
        Object.keys(postDB).map( key =>
          <PostItemView
            linkStyles={{color: `${postDB[key].colorDark}`}}
            key={key}
            post={postDB[key]}
          />
        )
      }
    </div>
  )
}

export default WebProjects;
