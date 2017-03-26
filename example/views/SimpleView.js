import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  MergedAppBarLayout,
  ScrollingAppBarLayout,
  CoordinatorLayout,
  BackdropBottomSheet,
  AnchorSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const { height, width } = Dimensions.get('window')

const {
  STATE_DRAGGING,
  STATE_ANCHOR_POINT,
  STATE_EXPANDED,
  STATE_SETTLING,
  STATE_COLLAPSED,
} = AnchorSheetBehavior

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
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#3369c1' />
        <ScrollingAppBarLayout statusBarColor='#3369c1'>
          <Icon.ToolbarAndroid
            navIconName={'md-menu'}
            style={styles.toolbar}
            titleColor="#fff"
            title="ListView"
            onIconClicked={() => this.context.openDrawer()}
          />
        </ScrollingAppBarLayout>
        <View style={styles.content}>
          <TouchableNativeFeedback onPress={() => this.handleState(STATE_ANCHOR_POINT)}>
            <View style={styles.button}>
              <Text style={styles.buttonLabel}>Anchor</Text>
            </View>
          </TouchableNativeFeedback>
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
        <BackdropBottomSheet height={300}>
          <View style={{flex: 1, backgroundColor: 'grey'}}>
            <Image
              resizeMode='cover'
              style={{width, height: 300}}
              source={require('../ReactNativelogo.jpg')}
            />
          </View>
        </BackdropBottomSheet>
        <AnchorSheetBehavior
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
            <View style={styles.bottomSheetContent}>
              <TouchableNativeFeedback onPress={() => this.handleState(STATE_ANCHOR_POINT)}>
                <View style={styles.button}>
                  <Text style={styles.buttonLabel}>Anchor</Text>
                </View>
              </TouchableNativeFeedback>
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
          </View>
        </AnchorSheetBehavior>
        <MergedAppBarLayout
          mergedColor="yellow"
          toolbarColor="yellow"
          statusBarColor="#FFA500"
          style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
            navIconName="md-arrow-back"
            titleColor="#000"
            title="LLL"
            onIconClicked={() => this.handleState(STATE_COLLAPSED)}
          />
        </MergedAppBarLayout>
        <FloatingActionButton
          autoAnchor
          elevation={18}
          backgroundColor={'#ffffff'}
          rippleColor="grey"
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
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
    backgroundColor: '#4389f2',
  },
  appBarMerged: {
    backgroundColor: 'transparent',
  },
  bottomSheet: {
    height,
    backgroundColor: '#4389f2',
  },
  bottomSheetHeader: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 2,
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
