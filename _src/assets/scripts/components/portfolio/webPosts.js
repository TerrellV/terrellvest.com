import React from 'react';
import SVG from '../svg';


const PostItemView = ({ postID, post, linkStyles }) =>
  <div className="row project-item-row" key={postID}>
    <div
      className="box l--5-12 proj-prev-img-padding"
    >
      <a href={post.links.app} target="_blank" >
        <div
          className="proj-prev-img-cont"
          style={{ backgroundColor: `${post.color}` }}
        >
          <SVG
            className="prev-img-svg"
            id={post.title.toLowerCase().trim().replace(/\s/g, '-')}
          />
          <div className={"stretcher"}></div>
        </div>
      </a>
    </div>
    <div className="box l--7-12 proj-prev-text-cont">
      <h1
        className="proj-prev-heading"
        style={{ color: `${post.colorDark}` }}
      >
        {post.title}
      </h1>
      <h2 className="proj-prev-subheader">{post.subheader}</h2>
      <p className="proj-prev-descripton">{post.dcr}</p>
      <div className="proj-prev-text-links" >
        <a
          href={post.path}
          style={linkStyles}
          target="_self"
        >
          Learn More
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

const WebProjects = ({ postDB, postsDynamicClass }) => {
  return (
    <div className={`project-container ${postsDynamicClass}`}>
      {
        Object.keys(postDB).map(key =>
          <PostItemView
            linkStyles={{ color: `${postDB[key].colorDark}` }}
            key={key}
            post={postDB[key]}
          />
        )
      }
    </div>
  );
};

export default WebProjects;
