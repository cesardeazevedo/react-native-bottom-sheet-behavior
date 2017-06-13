import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

const barStyleProp = PropTypes.oneOf([
  'default',
  'light-content',
  'dark-content'
]);

class ScrollingAppBarLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
    height: PropTypes.number,
    barStyle: barStyleProp,
    barStyleTransparent: barStyleProp,
    translucent: PropTypes.bool,
    statusBarColor: PropTypes.string,
  };

  render() {
    return (
      <BSBScrollingAppBarLayout {...this.props} />
    )
  }
}

const BSBScrollingAppBarLayout = requireNativeComponent('BSBScrollingAppBarLayout', ScrollingAppBarLayout)

export default ScrollingAppBarLayout
