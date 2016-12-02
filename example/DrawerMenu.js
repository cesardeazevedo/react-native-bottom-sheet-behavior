import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import npm from './node_modules/react-native-bottom-sheet-behavior/package.json'

const MENU = [
  { name: 'Simple', icon: 'ios-navigate-outline' },
  { name: 'NestedScroll', icon: 'ios-list' },
  { name: 'GoogleMaps', icon: 'md-map' }
]

const RippleColor = Platform.Version >= 21
  ? TouchableNativeFeedback.Ripple('#d1d1d1')
  : null

class DrawerMenu extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  };

  static contextTypes = {
    closeDrawer: PropTypes.func,
  };

  handleAction(route) {
    this.context.closeDrawer()
    this.props.push(route.name)
  }

  renderMenuItem(route) {
    return (
      <View key={route.name}>
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={RippleColor}
          onPress={() => ::this.handleAction(route)}>
          <View style={styles.menuItem}>
            <Icon name={route.icon} style={styles.icon} size={22} />
            <View pointerEvents="none">
              <Text style={styles.menuLabel}>{route.name}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  renderMenu() {
    return (
      <View>{MENU.map(::this.renderMenuItem)}</View>
    )
  }

  renderHeader() {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{npm.name}</Text>
        <Text style={styles.title}>v{npm.version}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderMenu()}
      </View>
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
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    paddingLeft: 32,
  },
  menuLabel: {
    color: '#333',
    fontSize: 15,
    fontFamily: 'sans-serif-medium',
    marginLeft: 22,
  },
  icon: {
    color: 'rgba(51, 51, 51, 0.24)'
  },
})

export default DrawerMenu
