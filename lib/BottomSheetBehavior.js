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
    state: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    hideable: PropTypes.bool,
    anchorPoint: PropTypes.number,
    anchorEnabled: PropTypes.bool,
    peekHeight: PropTypes.number,
    elevation: PropTypes.number,
    onSlide: PropTypes.func,
    onStateChanged: PropTypes.func,
  };

  static STATE_DRAGGING     = 1;
  static STATE_SETTLING     = 2;
  static STATE_EXPANDED     = 3;
  static STATE_COLLAPSED    = 4;
  static STATE_HIDDEN       = 5;
  static STATE_ANCHOR_POINT = 6;

  componentDidMount() {
    if (!this.props.anchorEnabled) {
      this.setRequestLayout()
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.anchorEnabled) {
      this.setRequestLayout()
    }
  }

  setRequestLayout() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTBottomSheetBehaviorAndroid.Commands.setRequestLayout,
      [],
    )
  }

  setBottomSheetState(state) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTBottomSheetBehaviorAndroid.Commands.setBottomSheetState,
      [state],
    )
  }

  onStateChange = (e) => {
    const { onStateChange } = this.props
    onStateChange && onStateChange(e)
  }

  onSlide = (e) => {
    const { onSlide } = this.props
    onSlide && onSlide(e)
  }

  render() {
    return (
      <RCTBottomSheetBehavior
        {...this.props}
        style={this.props.style}
        onSlide={this.onSlide}
        onStateChange={this.onStateChange}
      />
    )
  }
}

const RCTBottomSheetBehavior = requireNativeComponent('RCTBottomSheetBehaviorAndroid', BottomSheetBehavior)

export default BottomSheetBehavior
