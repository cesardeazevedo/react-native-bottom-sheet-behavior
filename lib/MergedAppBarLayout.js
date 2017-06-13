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

class MergedAppBarLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
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
      <BSBMergedAppBarLayout {...this.props} />
    )
  }
}

const BSBMergedAppBarLayout = requireNativeComponent('BSBMergedAppBarLayout', MergedAppBarLayout)

export default MergedAppBarLayout
