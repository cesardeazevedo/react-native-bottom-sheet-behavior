import React, { Component, PropTypes } from 'react'
import {
  Dimensions,
  AppRegistry,
  DrawerLayoutAndroid,
} from 'react-native'

import { StackNavigator } from 'react-navigation'

import DrawerMenu from './DrawerMenu'
import {
  SimpleView,
  NestedScrollView,
  AnchorSheetView,
  GoogleMapsView
} from './views'

const { width } = Dimensions.get('window')

class BSBExample extends Component {
  static childContextTypes = {
    openDrawer: PropTypes.func,
    closeDrawer: PropTypes.func
  };

  state = {
    currentRoute: 'Simple'
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

  handlePush = (routeName) => {
    this.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName
    })
  }

  handleCurrentSceneState = (prev, current) => {
    this.setState({ currentRoute: current.routes[current.index].routeName })
  }

  renderDrawerMenu = () => {
    return (
      <DrawerMenu
        push={this.handlePush}
        currentRoute={this.state.currentRoute}
      />
    )
  }

  render() {
    return (
      <DrawerLayoutAndroid
        ref={(drawer) => { this.drawer = drawer }}
        drawerWidth={width - 56}
        renderNavigationView={this.renderDrawerMenu}>
        <NavigatorStack
          ref={ref => {this.navigation = ref}}
          onNavigationStateChange={this.handleCurrentSceneState}
        />
      </DrawerLayoutAndroid>
    )
  }
}

const NavigatorStack = StackNavigator({
  Simple: { screen: SimpleView },
  NestedScroll: { screen: NestedScrollView },
  AnchorSheet: { screen: AnchorSheetView },
  GoogleMaps: { screen: GoogleMapsView },
})

AppRegistry.registerComponent('BSBExample', () => BSBExample)
