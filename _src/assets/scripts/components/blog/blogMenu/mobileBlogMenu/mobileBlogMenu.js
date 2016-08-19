import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './mobile-blog-menu.scss';
import MobilePopup from './popup';
import { DropDownIcon } from '../../../icons';

const MobileBlogMenu = React.createClass({
  getInitialState() {
    return {
      popupActive: false,
    };
  },
  togglePopup() {
    this.setState({
      popupActive: !this.state.popupActive,
    });
  },
  render() {
    const dropDownCn = this.props.styles['drop-down-icon'];
    const { popupActive } = this.state;
    const {
      categories,
      dynamicClass,
      activeCategory,
      setActiveCategory,
    } = this.props;

    const cap = str => `${str[0].toUpperCase()}${str.slice(1)}`;

    console.log('menu dynamic cn: ' + dynamicClass);

    return (
      <div styleName={`menu ${dynamicClass}`}>
        <span styleName="title">category</span>
        <span
          styleName="activeCategory"
          onClick={this.togglePopup}
        >
          <span styleName="text">{cap(activeCategory)}</span>
          <DropDownIcon className={dropDownCn} />
        </span>
        {
          popupActive
            ? <MobilePopup
              categories={categories}
              activeCategory={activeCategory}
              togglePopup={this.togglePopup}
              setActiveCategory={(e, cat) => {
                this.togglePopup();
                setActiveCategory(e, cat);
              }}
            /> : null
        }
      </div>
    );
  },
});
export default CSSModules(MobileBlogMenu, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
