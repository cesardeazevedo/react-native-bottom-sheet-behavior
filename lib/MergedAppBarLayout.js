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

class MergedAppBarLayout extends Component {
  static propTypes = {
    ...View.propTypes,
    height: PropTypes.number,
    barStyle: barStyleProp,
    barStyleTransparent: barStyleProp,
    translucent: PropTypes.bool,
    mergedColor: PropTypes.string,
    toolbarColor: PropTypes.string,
    statusBarColor: PropTypes.string,
  };

  render() {
    return (
      <RCTMergedAppBarLayout {...this.props} />
    )
  }
}

const RCTMergedAppBarLayout = requireNativeComponent('RCTMergedAppBarLayout', MergedAppBarLayout)

export default MergedAppBarLayout
