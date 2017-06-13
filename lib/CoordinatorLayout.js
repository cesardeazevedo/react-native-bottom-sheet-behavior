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
      <BSBCoordinatorLayout style={this.props.style || styles.container}>
        {this.props.children}
      </BSBCoordinatorLayout>
    )
  }
}

const BSBCoordinatorLayout = requireNativeComponent('BSBCoordinatorLayoutAndroid', CoordinatorLayout, {
  nativeOnly: {}
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default CoordinatorLayout
