import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './menu.scss';
import MobilePopup from './popup';
import { DropDownIcon } from '../../../icons';

const Menu = React.createClass({
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
      activeCategory,
      navItems,
      mobileHeaderClass,
    } = this.props;

    const navItemObjects = Object.keys(navItems)
      .map(key => ({ ...navItems[key] }));

    const cap = str => `${str[0].toUpperCase()}${str.slice(1)}`;


    return (
      <div styleName={`menu ${mobileHeaderClass}`} >
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
              navItemObjects={navItemObjects}
              categories={categories}
              activeCategory={activeCategory}
              togglePopup={this.togglePopup}
            /> : null
        }
      </div>
    );
  },
});
export default CSSModules(Menu, styles, {
  allowMultiple: true,
  errorWhenNotFound: false,
});
