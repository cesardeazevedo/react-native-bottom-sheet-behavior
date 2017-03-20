import React, { Component, PropTypes } from 'react'
import {
  View,
  requireNativeComponent,
} from 'react-native'

class AppBarLayout extends Component {
  static propTypes = {
    ...View.propTypes,
    height: PropTypes.number,
  };

  render() {
    return (
      <RCTAppBarLayout {...this.props}>
        {this.props.children}
      </RCTAppBarLayout>
    )
  }
}

const RCTAppBarLayout = requireNativeComponent('RCTAppBarLayout', AppBarLayout)

export default AppBarLayout
