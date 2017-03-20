/**
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  AppRegistry,
  DrawerLayoutAndroid,
  NavigationExperimental,
} from 'react-native'

import DrawerMenu from './DrawerMenu'
import { SimpleView, NestedScrollView, GoogleMapsView } from './views'

const { width } = Dimensions.get('window')

const {
 CardStack: NavigationCardStack,
 StateUtils: NavigationStateUtils
} = NavigationExperimental

class BSBExample extends Component {
  static childContextTypes = {
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  };

  state = {
    navigationState: {
      index: 0,
      routes: [
        { key: 'Simple' },
        { key: 'GoogleMaps' },
        { key: 'NestedScroll' }
      ]
    }
  };

  getChildContext = () => ({
    openDrawer: this.handleOpenDrawer,
    closeDrawer: this.handleCloseDrawer,
  })

  handleOpenDrawer = () => {
    this.drawer.openDrawer()
  }

  handleCloseDrawer = () => {
    this.drawer.closeDrawer()
  }

  handlePush = (route) => {
    const { navigationState } = this.state
    this.setState({
      navigationState: NavigationStateUtils.jumpTo(navigationState, route)
    })
  }

  renderScene = (props) => {
    const { key } = props.scene.route
    return (
      <View style={styles.container}>
        {key === 'Simple'       && <SimpleView />}
        {key === 'NestedScroll' && <NestedScrollView />}
        {key === 'GoogleMaps'   && <GoogleMapsView />}
      </View>
    )
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer }}
        drawerWidth={width - 56}
        renderNavigationView={() => <DrawerMenu push={this.handlePush} />}
        >
        <NavigationCardStack
          renderScene={this.renderScene}
          navigationState={this.state.navigationState}
        />
      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
})

AppRegistry.registerComponent('BSBExample', () => BSBExample)
