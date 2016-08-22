import React from 'react';
import DesktopMenu from './desktopPortMenu/menu';
import MobileMenu from './mobilePortMenu/menu';

const PortMenu = React.createClass({
  render() {
    const { portfolioState } = this.props;
    const { isSmallScreen } = portfolioState;

    const propsToPass = {
      ...portfolioState,
    };

    return (
      <div className="portfolioMenuMaster">
        {
          isSmallScreen
          ? <MobileMenu {...propsToPass} />
          : <DesktopMenu {...propsToPass} />
        }
      </div>
    );
  },
});

export default PortMenu;
