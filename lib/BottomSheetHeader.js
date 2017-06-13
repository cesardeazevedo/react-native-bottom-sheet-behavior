import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  UIManager,
  ViewPropTypes,
  findNodeHandle,
  requireNativeComponent,
} from 'react-native'

class BottomSheetHeader extends Component {
  static propTypes = {
    ...ViewPropTypes,
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
      <BSBBottomSheetHeader
        {...this.props}
        onChange={this.onChange}
      />
    )
  }
}

const BSBBottomSheetHeader = requireNativeComponent('BSBBottomSheetHeader', BottomSheetHeader)

export default BottomSheetHeader
