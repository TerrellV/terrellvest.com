import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import styles from './post-preview.scss';

const PostPreview = props =>
  <div styleName="post-preview">
    <a styleName="link" href={`../${props.path}`}>
      <h1 styleName="heading">{props.title}</h1>
      <h3 styleName="date">{props.date}</h3>
      <p styleName="description">{props.dcr}..</p>
    </a>
  </div>

  export default CSSModules(PostPreview, styles, {
    allowMultiple: true,
    errorWhenNotFound: false,
  })
