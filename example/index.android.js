import React, { Component } from 'react'
import {
  AppRegistry,
} from 'react-native'

import { StackNavigator } from 'react-navigation'

import DrawerMenu from './DrawerMenu'
import {
  SimpleView,
  NestedScrollView,
  AnchorSheetView,
  GoogleMapsView
} from './views'

const initialRouteName = 'GoogleMaps'

class BSBExample extends Component {
  state = {
    currentRoute: initialRouteName,
  };

  handlePush = (routeName) => {
    this.navigation.dispatch({
      type: 'Navigation/NAVIGATE',
      routeName
    })
  }

  handleCurrentSceneState = (prev, current) => {
    this.setState({ currentRoute: current.routes[current.index].routeName })
  }

  render() {
    return (
      <DrawerMenu
        push={this.handlePush}
        currentRoute={this.state.currentRoute}>
        <NavigatorStack
          ref={ref => {this.navigation = ref}}
          onNavigationStateChange={this.handleCurrentSceneState}
        />
      </DrawerMenu>
    )
  }
}

const NavigatorStack = StackNavigator({
  Simple: { screen: SimpleView },
  NestedScroll: { screen: NestedScrollView },
  AnchorSheet: { screen: AnchorSheetView },
  GoogleMaps: { screen: GoogleMapsView },
}, {
  initialRouteName,
  navigationOptions: () => ({ header: false })
})

AppRegistry.registerComponent('BSBExample', () => BSBExample)
