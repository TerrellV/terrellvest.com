import React, { PropTypes } from 'react';
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
  addAllCategory(arr) {
    const newArr = Array.from(arr);
    newArr.unshift('all');
    return newArr;
  },
  render() {
    const { categories, activeCategory, setActiveCategory } = this.props;

    const onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);

    const canHoverClass = onMobile ? '' : 'canHover';
    const categoriesPlusAll = this.addAllCategory(categories);
    const categoryList = categoriesPlusAll
      .map(cat => {
        const activeClass = cat === activeCategory ? 'active' : '';
        return (
          <span
            key={cat}
            styleName={
              `category ${canHoverClass} ${activeClass}`
            }
            onClick={e => {
              setActiveCategory(e, cat);
            }}
          >
            {cat}
          </span>
        )
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
