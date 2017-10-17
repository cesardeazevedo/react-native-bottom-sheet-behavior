import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Dimensions,
  DrawerLayoutAndroid,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import npm from './node_modules/react-native-bottom-sheet-behavior/package.json'

const MENU = [
  { name: 'Simple', icon: 'ios-navigate-outline' },
  { name: 'NestedScroll', icon: 'ios-list' },
  { name: 'AnchorSheet', icon: 'md-more' },
  { name: 'GoogleMaps', icon: 'md-map' }
]

let toRoute

const { width } = Dimensions.get('window')

const RippleColor = Platform.Version >= 21
  ? TouchableNativeFeedback.Ripple('#d1d1d1')
  : null

class DrawerMenu extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired,
    currentRoute: PropTypes.string.isRequired,
  };

  static childContextTypes = {
    openDrawer: PropTypes.any,
    closeDrawer: PropTypes.func,
  };

  getChildContext = () => ({
    openDrawer: this.handleOpenDrawer,
    closeDrawer: this.handleCloseDrawer,
  })

  handleAction = (route) => {
    toRoute = route.name
    this.handleCloseDrawer()
  }

  handleOnDrawerChanged = (state) => {
    if (state === 'Settling' && toRoute) {
      this.props.push(toRoute)
      toRoute = null
    }
  }

  handleOpenDrawer = () => {
    this.drawer.openDrawer()
  }

  handleCloseDrawer = () => {
    this.drawer.closeDrawer()
  }

  renderMenuItem = (route) => {
    const isActive = this.props.currentRoute === route.name
    return (
      <View key={route.name}>
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={RippleColor}
          onPress={() => this.handleAction(route)}>
          <View style={[styles.menuItem, isActive && styles.menuActive]}>
            <Icon
              size={22}
              name={route.icon}
              style={[styles.icon, isActive && styles.iconActive]}
            />
            <View pointerEvents="none">
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {route.name}
              </Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  renderMenu = () => (
    <View>{MENU.map(this.renderMenuItem)}</View>
  )

  renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>{npm.name}</Text>
      <Text style={styles.title}>v{npm.version}</Text>
    </View>
  )

  renderDrawer = () => (
    <View style={styles.container}>
      {this.renderHeader()}
      {this.renderMenu()}
    </View>
  )

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={width - 56}
        onDrawerStateChanged={this.handleOnDrawerChanged}
        ref={(drawer) => { this.drawer = drawer }}
        renderNavigationView={this.renderDrawer}>
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    height: 190,
    padding: 8,
    justifyContent: 'flex-end',
    backgroundColor: '#222'
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'sans-serif-medium',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingLeft: 32,
  },
  menuActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  menuLabel: {
    color: '#333',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    marginLeft: 22,
  },
  menuLabelActive: {
    color: '#4589f2'
  },
  icon: {
    color: 'rgba(51, 51, 51, 0.24)',
    textAlign: 'center',
    width: 30,
  },
  iconActive: {
    color: '#4589f2'
  },
})

export default DrawerMenu
