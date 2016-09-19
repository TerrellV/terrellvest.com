import React from 'react';
import PostImage from '../svg';
import portfolioListItemStyles from './portfolio-list-item.scss';
import portfolioListStyles from './portfolio-list.scss';
import CSSModules from 'react-css-modules';

const imgPath = function caterpiller(str) {
  const title = str.toLowerCase().trim().replace(/\s/g, '-');
  return `../assets/images/${title}-preview.png`;
};

const PostItemView = ({ postID, post }) =>
  <a
    styleName="project-link"
    href={post.path}
    target="_self"
  >
    <div styleName="row project-item-row" key={postID}>
      <div styleName="box l--5-12 proj-prev-img-padding">
        <div
          styleName="proj-prev-img-cont"
          style={{ backgroundColor: 'transparent' }}
        >
          <img
            src={imgPath(post.title)}
            alt="preview"
            styleName="preview-img"
          />
          <div styleName={"stretcher"}></div>
        </div>
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
      </div>
    </div>
  </a>;
const PostItemViewWithStyles = CSSModules(PostItemView, portfolioListItemStyles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});

const BizProjects = ({ postDB, postsDynamicClass }) => {
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

export default CSSModules(BizProjects, portfolioListStyles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
