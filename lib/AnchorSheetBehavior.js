import React, { Component, PropTypes } from 'react'
import {
  View,
  UIManager,
  Dimensions,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class AnchorSheetBehavior extends Component {
  static propTypes = {
    ...View.propTypes,
    state: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
    hideable: PropTypes.bool,
    peekHeight: PropTypes.number,
    anchorPoint: PropTypes.number,
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

  setRequestLayout() {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTAnchorSheetBehaviorAndroid.Commands.setRequestLayout,
      [],
    )
  }

  setBottomSheetState(state) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTAnchorSheetBehaviorAndroid.Commands.setBottomSheetState,
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
      <RCTAnchorSheetBehavior
        {...this.props}
        onSlide={this.onSlide}
        onStateChange={this.onStateChange}>
        {this.props.children}
      </RCTAnchorSheetBehavior>
    )
  }
}

const RCTAnchorSheetBehavior = requireNativeComponent('RCTAnchorSheetBehaviorAndroid', AnchorSheetBehavior)

export default AnchorSheetBehavior
