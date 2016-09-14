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
    <a
      href={post.path}
      styleName="box l--7-12 portfolio-list-text-link" target="_self" style={{ color: `${post.colorDark}` }}
    >
      <div styleName="box proj-prev-text-cont">
        <h1
          styleName="proj-prev-heading"
          style={{ color: `${post.colorDark}` }}
        >
          {post.title}
        </h1>
        <h2 styleName="proj-prev-subheader">{post.subheader}</h2>
        <p styleName="proj-prev-descripton">{post.dcr}</p>

      </div>
    </a>
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
