import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './popup.scss';

const MobilePopup = React.createClass({
  handleOutsideClick(e) {
    const clickOutside = !this.modal
      .contains(e.target);
    if (clickOutside) {
      this.props.togglePopup();
    }
  },
  render() {
    const { activeCategory, navItemObjects, togglePopup } = this.props;

    const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

    const canHoverClass = onMobile ? '' : 'canHover';
    const categoryList = navItemObjects
      .map(({ type, path, text }) => {
        const activeClass = type === activeCategory ? 'active' : '';
        return (
          <Link
            onClick={togglePopup}
            to={path}
            key={type}
            styleName={
              `category ${canHoverClass} ${activeClass}`
            }
          >
            {text}
          </Link>
        );
      });

    return (
      <div onClick={this.handleOutsideClick} styleName="mobile-blog-popup-menu">
        <div
          styleName="popup-modal"
          ref={el => { this.modal = el; }}
        >
          <div styleName="popup-header">
            <span styleName="heading-title">
              Filter by category
            </span>
          </div>
          <div styleName="category-list">
            {categoryList}
          </div>
        </div>
      </div>
    );
  },
});

export default CSSModules(MobilePopup, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
