import React, { Component, PropTypes } from 'react'
import {
  View,
  StyleSheet,
  requireNativeComponent,
} from 'react-native'

class BackdropBottomSheet extends Component {
  static propTypes = {
    ...View.propTypes,
    height: PropTypes.number,
  };

  render() {
    return (
      <RCTBackdropBottomSheet {...this.props}>
        {this.props.children}
      </RCTBackdropBottomSheet>
    )
  }
}

const RCTBackdropBottomSheet = requireNativeComponent('RCTBackdropBottomSheet', BackdropBottomSheet)

export default BackdropBottomSheet
