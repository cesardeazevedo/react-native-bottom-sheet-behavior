import React, { Component, PropTypes } from 'react'
import {
  View,
  requireNativeComponent,
} from 'react-native'

class ScrollingAppBarLayout extends Component {
  static propTypes = {
    ...View.propTypes,
    height: PropTypes.number,
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
