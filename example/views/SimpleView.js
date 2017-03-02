/**
 * @flow
 */

import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  CoordinatorLayout,
  BottomSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const { width } = Dimensions.get('window')

const {
  STATE_DRAGGING,
  STATE_EXPANDED,
  STATE_SETTLING,
  STATE_COLLAPSED,
} = BottomSheetBehavior

class SimpleView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  state = {
    offset: 0,
    bottomSheetState: 0,
  };

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  handleBottomSheetChange = (e) => {
    const newState = e.nativeEvent.state

    if (this.state.offset > 0.1 && (newState === STATE_DRAGGING || newState === STATE_EXPANDED)) {
      this.setState({ bottomSheetState: 1 })
    }

    if (newState === STATE_SETTLING && !this.settlingExpanded) {
      this.setState({ bottomSheetState: 0 })
    }

    this.lastState = newState
  }

  handleSlide = (e) => {
    const offset = parseFloat(e.nativeEvent.offset.toFixed(2))

    this.settlingExpanded = offset >= this.state.offset

    if (offset === 0) {
      this.setState({ bottomSheetState: 0 })
    } else if (this.state.bottomSheetState !== 1 && this.lastState === STATE_DRAGGING) {
      this.setState({ bottomSheetState: 1 })
    }

    this.setState({ offset })
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor={'rgba(0, 0, 0, 0.25)'} />
        <View style={styles.content}>
          <View style={styles.toolbarWrapper}>
            <Icon.ToolbarAndroid
              navIconName={'md-menu'}
              style={styles.toolbar}
              titleColor="#fff"
              title="ListView"
              onIconClicked={() => this.context.openDrawer()}
            />
          </View>
          <TouchableNativeFeedback onPress={() => this.handleState(STATE_EXPANDED)}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Expanded</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => this.handleState(STATE_COLLAPSED)}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Collapsed</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <BottomSheetBehavior
          peekHeight={70}
          hideable={false}
          ref={ref => { this.bottomSheet = ref }}
          onSlide={this.handleSlide}
          onStateChange={this.handleBottomSheetChange}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>BottomSheetBehavior !</Text>
              <Text>{this.state.offset}</Text>
            </View>
            <View style={styles.bottomSheetContent} />
          </View>
        </BottomSheetBehavior>
        <FloatingActionButton
          autoAnchor
          elevation={18}
          backgroundColor={'#333333'}
          rippleColor="red"
          hidden={this.state.bottomSheetState === 0}
        />
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
    padding: 82,
    alignItems: 'center',
    backgroundColor: '#fff',
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
    color: '#fff'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default SimpleView
