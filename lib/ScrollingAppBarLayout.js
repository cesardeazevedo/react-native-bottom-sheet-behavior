import React, { Component, PropTypes } from 'react'
import {
  View,
  requireNativeComponent,
} from 'react-native'

const barStyleProp = PropTypes.oneOf([
  'default',
  'light-content',
  'dark-content'
]);

class ScrollingAppBarLayout extends Component {
  static propTypes = {
    ...View.propTypes,
    height: PropTypes.number,
    barStyle: barStyleProp,
    barStyleTransparent: barStyleProp,
    translucent: PropTypes.bool,
    statusBarColor: PropTypes.string,
  };

  render() {
    return (
      <RCTScrollingAppBarLayout {...this.props} />
    )
  }
}

const RCTScrollingAppBarLayout = requireNativeComponent('RCTScrollingAppBarLayout', ScrollingAppBarLayout)

export default ScrollingAppBarLayout
