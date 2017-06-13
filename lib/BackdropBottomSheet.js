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
      <BSBBackdropBottomSheet {...this.props} />
    )
  }
}

const BSBBackdropBottomSheet = requireNativeComponent('BSBBackdropBottomSheet', BackdropBottomSheet)

export default BackdropBottomSheet
