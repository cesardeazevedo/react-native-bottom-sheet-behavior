/**
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  NestedScrollView,
  CoordinatorLayout,
  BottomSheetBehavior,
} from 'react-native-bottom-sheet-behavior'

const { width, height } = Dimensions.get('window')

class NestedScroll extends Component {
  static contextTypes = {
    openDrawer: PropTypes.any,
  };

  state = {
    state: 4,
    buttons: [0],
  };

  handleAddButton() {
    /* eslint-disable object-curly-spacing */
    const { buttons } = this.state
    const length = buttons.length || 0
    this.setState({ buttons: [
      ...buttons,
      length + 1
    ]})
  }

  handleRemoveButton(index) {
    const { buttons } = this.state
    this.setState({ buttons: [
      ...buttons.slice(0, index),
      ...buttons.slice(index + 1)
    ]})
  }

  handleState(state) {
    this.setState({ state })
  }

  renderButton(key, index) {
    return (
      <TouchableNativeFeedback key={index} onPress={() => this.handleRemoveButton(index)}>
        <View style={styles.button}>
          <Text style={styles.buttonLabel}>{key}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor={"rgba(0, 0, 0, 0.25)"} />
        <View style={styles.content}>
          <View style={styles.toolbarWrapper}>
            <Icon.ToolbarAndroid
              navIconName={"md-menu"}
              style={styles.toolbar}
              titleColor="white"
              title="NestedScrollView"
              onIconClicked={() => this.context.openDrawer()}
            />
          </View>
          <TouchableNativeFeedback onPress={::this.handleAddButton}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Add Button</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.handleState(BottomSheetBehavior.STATE_EXPANDED)}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Expanded</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.handleState(BottomSheetBehavior.STATE_COLLAPSED)}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Collapsed</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{flex: 1}} />
        </View>
        <BottomSheetBehavior
          peekHeight={70}
          hideable={false}
          state={this.state.state}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>NestedScrollView !</Text>
            </View>
            <View style={styles.bottomSheetContent} >
              <NestedScrollView onScroll={e => console.log(e)} style={styles.scroll}>
                {this.state.buttons.map(::this.renderButton)}
              </NestedScrollView>
            </View>
          </View>
        </BottomSheetBehavior>
      </CoordinatorLayout>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbarWrapper: {
    paddingTop: 24,
    marginBottom: 24,
    backgroundColor: '#4389f2',
  },
  toolbar: {
    width,
    height: 56,
  },
  scroll: {
    width,
  },
  bottomSheet: {
    backgroundColor: '#4389f2',
  },
  bottomSheetHeader: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetContent: {
    height: 200,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    padding: 6,
    paddingHorizontal: 14,
    height: 30,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginVertical: 1,
    backgroundColor: '#333',
  },
  buttonLabel: {
    color: 'white'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default NestedScroll
