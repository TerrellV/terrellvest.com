import React from 'react';
export

// ICON GENERATOR
const SvgWrapper = React.createClass({
  render() {
    return (
      <svg
        fill="#000000"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className={this.props.className}
      >
        {this.props.children}
      </svg>
    );
  },
});


// ICONS
export const DropDownIcon = ({className}) =>
  <SvgWrapper className={className}>
    <path d="M0,13l24,24l24-24H0z"/>
    <path fill="none" d="M0,0h48v48H0V0z"/>
  </SvgWrapper>;
