import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  requireNativeComponent,
} from 'react-native'

class BottomSheetBehavior extends Component {
  static propTypes = {
    ...View.propTypes,
  };

  render() {
    return (
      <RCTBottomSheetBehavior style={this.props.style}>
        {this.props.children}
      </RCTBottomSheetBehavior>
    )
  }
}

const RCTBottomSheetBehavior = requireNativeComponent('RCTBottomSheetBehaviorAndroid', BottomSheetBehavior, {
  nativeOnly: {}
});

export default BottomSheetBehavior
