import React, { Component, PropTypes } from 'react'
import {
  View,
  UIManager,
  StyleSheet,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class BottomSheetHeader extends Component {
  static propTypes = {
    ...View.propTypes,
    onPress: PropTypes.func,
    textColor: PropTypes.string,
    textColorExpanded: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorExpanded: PropTypes.string,
  };

  onChange = (e) => {
    const { onPress } = this.props
    onPress && onPress(e)
  }

  render() {
    return (
      <RCTBottomSheetHeader
        {...this.props}
        onChange={this.onChange}
      />
    )
  }
}

const RCTBottomSheetHeader = requireNativeComponent('RCTBottomSheetHeader', BottomSheetHeader)

export default BottomSheetHeader
