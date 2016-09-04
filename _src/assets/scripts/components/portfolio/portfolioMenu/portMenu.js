import React from 'react';
import DesktopMenu from './desktopPortMenu/menu';
import MobileMenu from './mobilePortMenu/menu';
import CSSModules from 'react-css-modules';
import styles from './port-menu.scss';

const PortMenu = React.createClass({
  render() {
    const { portfolioState } = this.props;
    const { isSmallScreen } = portfolioState;

    const propsToPass = {
      ...portfolioState,
    };

    return (
      <div
        styleName="portfolioMenuMaster"
        ref={el => { this.childDiv = el; }}
      >
        {
          isSmallScreen
          ? <MobileMenu {...propsToPass} />
          : <DesktopMenu {...propsToPass} />
        }
      </div>
    );
  },
});

export default CSSModules(PortMenu, styles, {
  errorWhenNotFound: false,
  allowMultiple: true,
});
