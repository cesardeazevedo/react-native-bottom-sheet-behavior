import React, { Component } from 'react'
import {
  View,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class BottomSheetBehavior extends Component {
  static propTypes = {
    ...View.propTypes,
  };

  componentDidMount() {
    this.setRequestLayout()
  }

  componentDidUpdate() {
    this.setRequestLayout()
  }

  setRequestLayout() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTBottomSheetBehaviorAndroid.Commands.setRequestLayout,
      [],
    )
  }

  render() {
    return (
      <RCTBottomSheetBehavior {...this.props} style={this.props.style}>
        {this.props.children}
      </RCTBottomSheetBehavior>
    )
  }
}

const RCTBottomSheetBehavior = requireNativeComponent('RCTBottomSheetBehaviorAndroid', BottomSheetBehavior)

export default BottomSheetBehavior
