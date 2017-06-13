import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ViewPropTypes,
  requireNativeComponent,
} from 'react-native'

class CoordinatorLayout extends Component {
  static propTypes = {
    ...ViewPropTypes,
  };

  render() {
    return (
      <RCTCoordinatorLayout style={this.props.style || styles.container}>
        {this.props.children}
      </RCTCoordinatorLayout>
    )
  }
}

const RCTCoordinatorLayout = requireNativeComponent('RCTCoordinatorLayoutAndroid', CoordinatorLayout, {
  nativeOnly: {}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CoordinatorLayout
