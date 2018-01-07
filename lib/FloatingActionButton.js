import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  UIManager,
  ViewPropTypes,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class FloatingActionButton extends Component {
  static propTypes = {
    ...ViewPropTypes,
    src: PropTypes.any,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    iconColorExpanded: PropTypes.string,
    iconProvider: PropTypes.any,
    hidden: PropTypes.bool,
    onPress: PropTypes.func,
    autoAnchor: PropTypes.bool,
    elevation: PropTypes.number,
    rippleEffect: PropTypes.bool,
    rippleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundColorExpanded: PropTypes.string,
  };

  state = {
    iconLoaded: null
  };

  componentWillMount() {
    // Loads icons from react-native-vector-icons
    this.updateIcon(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.icon !== this.props.icon) {
      this.updateIcon(nextProps)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.state.iconLoaded != prevState.iconLoaded
      && this.bottomSheet
      && this.setAnchorId(this.bottomSheet)
  }

  onChange = (e) => {
    const { onPress } = this.props
    onPress && onPress(e)
  }

  setAnchorId = (bottomSheet) => {
    const view = findNodeHandle(bottomSheet)
    if (this.props.icon) {
      if (this.state.iconLoaded) {
        this.dispatchViewCommand('setAnchorId', [view])
      } else {
        // Store bottomSheet reference to call it later when iconLoaded is ready
        this.bottomSheet = bottomSheet
      }
    } else {
      this.dispatchViewCommand('setAnchorId', [view])
    }
  }

  updateIcon(props) {
    const { icon, iconColor, iconProvider } = props
    icon && iconProvider && iconProvider.getImageSource(icon, 24, iconColor).then(source => {
      this.setState({ iconLoaded: source.uri })
    })
  }

  show = () => {
    this.dispatchViewCommand('show')
  }

  hide = () => {
    this.dispatchViewCommand('hide')
  }

  dispatchViewCommand(command, view = []) {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(this),
      UIManager.BSBFloatingActionButtonAndroid.Commands[command],
      view,
    )
  }

  render() {
    const { iconLoaded } = this.state
    const { icon, ...props } = this.props
    const component = (
      <BSBFloatingActionButton
        {...props}
        icon={iconLoaded}
        onChange={this.onChange}
      />
    )

    // waits icon loaded from vector-icons
    return icon ? (iconLoaded && component) : component
  }
}

const BSBFloatingActionButton = requireNativeComponent('BSBFloatingActionButtonAndroid', FloatingActionButton)

export default FloatingActionButton
