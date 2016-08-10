import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';
import styles from './mobile-blog-menu.scss';

const MobileBlogMenu = React.createClass({
  getInitialState() {
    return {
      popupActive: false,
    }
  },
  render() {
    const { popupActive } = this.state;
    const { categories, dynamicClass } = this.props;

    return (
      <div styleName={`menu ${dynamicClass}`}>
        Mobile Header
        {popupActive ? <MobilePopup categories={categories} /> : null}
      </div>
    )
  }
});
export default CSSModules(MobileBlogMenu, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
