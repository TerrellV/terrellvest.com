import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules';


const cssModuleOptions = {
  allowMultiple: true,
  errorWhenNotFound: false,
}

const MobilePopup = React.createClass({
  render() {
    const { categories } = this.props;
    return (
      <div styleName="mobileBlogPopup">
      categories.map(key =>
        <span styleName="category">
          {categories[key]}
        </span>
      )
      </div>
    )
  }
});
