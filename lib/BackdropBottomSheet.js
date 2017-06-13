import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

class BackdropBottomSheet extends Component {
  static propTypes = {
    ...ViewPropTypes,
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
