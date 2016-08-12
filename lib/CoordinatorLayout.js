import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  StyleSheet,
  requireNativeComponent,
} from 'react-native'

class CoordinatorLayout extends Component {
  static propTypes = {
    ...View.propTypes,
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
