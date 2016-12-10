import React, { Component, PropTypes } from 'react'
import {
  View,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

let isMounted = false

class BottomSheetBehavior extends Component {
  static propTypes = {
    ...View.propTypes,
    state: PropTypes.oneOf([1, 2, 3, 4, 5]),
    hideable: PropTypes.bool,
    peekHeight: PropTypes.number,
    elevation: PropTypes.number,
    onSlide: PropTypes.func,
    onStateChanged: PropTypes.func,
  };

  static STATE_DRAGGING  = 1;
  static STATE_SETTLING  = 2;
  static STATE_EXPANDED  = 3;
  static STATE_COLLAPSED = 4;
  static STATE_HIDDEN    = 5;

  constructor(props: Props){
    super(props);

    this.state = {currentState: this.props.state == null ? STATE_COLLAPSED : this.props.state};
  }

  componentDidMount() {
    this.setRequestLayout()
    
    isMounted = true
  }

  componentDidUpdate() {
    this.setRequestLayout()
  }

  componentWillUnmount() {
    isMounted = false
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

  getBottomSheetState()
  {
    return this.state.currentState
  }

  onStateChange(e) {
    if (isMounted)
      this.setState({currentState: e.nativeEvent.state})
    
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

const RCTBottomSheetBehavior = requireNativeComponent('RCTBottomSheetBehaviorAndroid', BottomSheetBehavior)

export default BottomSheetBehavior
