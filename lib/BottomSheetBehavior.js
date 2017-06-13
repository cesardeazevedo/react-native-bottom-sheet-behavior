import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  UIManager,
  ViewPropTypes,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class BottomSheetBehavior extends Component {
  static propTypes = {
    ...ViewPropTypes,
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
      UIManager.BSBBottomSheetBehaviorAndroid.Commands.setRequestLayout,
      [],
    )
  }

  setBottomSheetState(state) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.BSBBottomSheetBehaviorAndroid.Commands.setBottomSheetState,
      [state],
    )
  }

  attachNestedScrollChild(nestedScroll) {
    const view = findNodeHandle(nestedScroll)
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.BSBBottomSheetBehaviorAndroid.Commands.attachNestedScrollChild,
      [view],
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
      <BSBBottomSheetBehavior
        {...this.props}
        style={this.props.style}
        onSlide={this.onSlide}
        onStateChange={this.onStateChange}
      />
    )
  }
}

const BSBBottomSheetBehavior = requireNativeComponent('BSBBottomSheetBehaviorAndroid', BottomSheetBehavior)

export default BottomSheetBehavior
