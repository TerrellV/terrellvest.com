import React from 'react';
import SVG from '../svg';
import CSSModules from 'react-css-modules';
import portfolioListStyles from './portfolio-list.scss';
import portfolioListItemStyles from './portfolio-list-item.scss';

const PostItemView = ({ postID, post, linkStyles }) =>
  <div styleName="row project-item-row" key={postID}>
    <div
      styleName="box l--5-12 proj-prev-img-padding"
    >
      <a href={post.links.app} target="_blank" >
        <div
          styleName="proj-prev-img-cont"
          style={{ backgroundColor: `${post.color}` }}
        >
          <SVG
            styleName="prev-img-svg"
            id={post.title.toLowerCase().trim().replace(/\s/g, '-')}
          />
          <div styleName={"stretcher"}></div>
        </div>
      </a>
    </div>
    <div styleName="box l--7-12 proj-prev-text-cont">
      <h1
        styleName="proj-prev-heading"
        style={{ color: `${post.colorDark}` }}
      >
        {post.title}
      </h1>
      <h2 styleName="proj-prev-subheader">{post.subheader}</h2>
      <p styleName="proj-prev-descripton">{post.dcr}</p>
      <div styleName="proj-prev-text-links" >
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
  </div>;

const PostItemViewWithStyles = CSSModules(PostItemView, portfolioListItemStyles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
const WebProjects = ({ postDB, postsDynamicClass }) => {
  return (
    <div styleName={`project-container ${postsDynamicClass}`}>
      {
        Object.keys(postDB).map(key =>
          <PostItemViewWithStyles
            linkStyles={{ color: `${postDB[key].colorDark}` }}
            key={key}
            post={postDB[key]}
          />
        )
      }
    </div>
  );
};

export default CSSModules(WebProjects, portfolioListStyles, {
  allowMultiple: true,
  errorWhenNotFound: true,
});
