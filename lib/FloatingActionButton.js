import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  UIManager,
  findNodeHandle,
  requireNativeComponent,
  TouchableWithoutFeedback,
} from 'react-native'

class FloatingActionButton extends Component {
  static propTypes = {
    ...View.propTypes,
    ...TouchableWithoutFeedback.propTypes,
    src: PropTypes.any,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconProvider: PropTypes.any,
    hidden: PropTypes.bool,
    onPress: PropTypes.func,
    elevation: PropTypes.number,
    rippleEffect: PropTypes.bool,
    backgroundColor: PropTypes.string,
  };

  state = {
    iconLoaded: null
  };

  componentWillMount() {
    // Loads icons from react-native-vector-icons
    this.updateIcon(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.updateIcon(nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.iconLoaded != prevState.iconLoaded 
      && this.bottomSheet
      && this.setAnchorId(this.bottomSheet)
  }

  updateIcon(props) {
    const { icon, iconProvider } = props
    icon && iconProvider && iconProvider.getImageSource(icon, 24).then(source => {
      this.setState({ iconLoaded: source.uri })
    })
  }

  setAnchorId = (bottomSheet) => {
    const view = findNodeHandle(bottomSheet)
    if (this.props.icon) {
      if (this.state.iconLoaded) {
        this.dispatchViewCommand(view)
      } else {
        // Store bottomSheet reference to call it later when iconLoaded is ready
        this.bottomSheet = bottomSheet
      }
    } else {
      this.dispatchViewCommand(view)
    }
  }

  dispatchViewCommand(view) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.RCTFloatingActionButtonAndroid.Commands.setAnchorId,
      [view],
    )
  }

  onChange(e) {
    const { onPress } = this.props
    onPress && onPress(e)
  }

  render() {
    const { iconLoaded } = this.state
    const { icon, iconProvider, ...props } = this.props
    const component = (
      <RCTFloatingActionButton
        {...props}
        icon={iconLoaded}
        onChange={this.onChange.bind(this)}
      />
    )

    // waits icon loaded from vector-icons
    return icon ? (iconLoaded && component) : component
  }
}

const RCTFloatingActionButton = requireNativeComponent('RCTFloatingActionButtonAndroid', FloatingActionButton)

export default FloatingActionButton
