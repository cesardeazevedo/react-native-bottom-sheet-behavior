import React, { Component, PropTypes } from 'react'
import {
  View,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class BottomSheetBehavior extends Component {
  static propTypes = {
    ...View.propTypes,
    onSlide: PropTypes.func,
    onStateChanged: PropTypes.func,
  };

  static STATE_DRAGGING  = 1;
  static STATE_SETTLING  = 2;
  static STATE_EXPANDED  = 3;
  static STATE_COLLAPSED = 4;
  static STATE_HIDDEN    = 5;

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

  onStateChange(e) {
    const { onStateChange } = this.props
    onStateChange && onStateChange(e)
  }

  onSlide(e) {
    const { onSlide } = this.props
    onSlide && onSlide(e)
  }

  render() {
    return (
      <RCTBottomSheetBehavior
        {...this.props}
        style={this.props.style}
        onSlide={this.onSlide.bind(this)}
        onStateChange={this.onStateChange.bind(this)}
        >
        {this.props.children}
      </RCTBottomSheetBehavior>
    )
  }
}

const RCTBottomSheetBehavior = requireNativeComponent('RCTBottomSheetBehaviorAndroid', BottomSheetBehavior, {
  nativeOnly: {
    hideable: true,
    peekHeight: true,
    onSlide: true,
    onStateChange: true,
  }
})

export default BottomSheetBehavior
