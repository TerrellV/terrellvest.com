import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const WebProjects = ({postDB}) => {
  return (
    <div className="web-project-container">
      {
        Object.keys(postDB).map( postID => {
          const post = postDB[postID];
          return (
            <div className="row project-item-row" key={postID}>
              <div
                className="box m--5-12 proj-prev-img-cont"
                style={{backgroundColor: `${post.color}`, height: '240px'}}
              >
              </div>
              <div className="box m--7-12 proj-prev-text-cont">
                <h1>{post.title}</h1>
                <p>{post.dcr}</p>
                <a href={post.path}>More Info</a>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default WebProjects;
