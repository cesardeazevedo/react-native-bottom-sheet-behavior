import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Animated,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native'

import MapView from 'react-native-maps'
import DismissKeyboard from 'dismissKeyboard'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMDI from 'react-native-vector-icons/MaterialIcons'

import {
  CoordinatorLayout,
  BottomSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const { width, height } = Dimensions.get('window')

const RippleColor = Platform.Version >= 21
  ? TouchableNativeFeedback.Ripple('#d1d1d1')
  : null

const WHITE = '#FFFFFF'
const PRIMARY_COLOR = '#4589f2'

class GoogleMapsView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  state = {
    fabColor: PRIMARY_COLOR,
    bottomSheetState: BottomSheetBehavior.STATE_COLLAPSED,
    bottomSheetColor: new Animated.Value(0)
  };

  componentDidMount() {
    // Set FAB anchor to follow bottomSheet
    this.refs.floating.setAnchorId(this.refs.bottomSheet)
  }

  handleOpenDrawer() {
    DismissKeyboard()
    this.context.openDrawer()
  }

  handleFabPress() {
    ToastAndroid.show('Pressed', ToastAndroid.SHORT)
  }

  handleBottomSheetOnPress() {
    const { bottomSheetState, bottomSheetColor } = this.state

    if (bottomSheetState === BottomSheetBehavior.STATE_COLLAPSED) {
      Animated.timing(bottomSheetColor, { duration: 0, toValue: 1 }).start()
      this.setState({ bottomSheetState: BottomSheetBehavior.STATE_EXPANDED, fabColor: WHITE })
    } else if (bottomSheetState === BottomSheetBehavior.STATE_EXPANDED) {
      Animated.timing(bottomSheetColor, { duration: 30, toValue: 0 }).start()
      this.setState({ bottomSheetState: BottomSheetBehavior.STATE_COLLAPSED, fabColor: PRIMARY_COLOR })
    }
  }

  handleBottomSheetChange(e) {
    const newState = e.nativeEvent.state

    // Turn active color when starting dragging and remains expanded
    if (newState === BottomSheetBehavior.STATE_DRAGGING ||
        newState === BottomSheetBehavior.STATE_EXPANDED) {
      this.setState({ fabColor: WHITE })
      Animated.timing(this.state.bottomSheetColor, {
        duration: 50,
        toValue: 1,
      }).start()
    }

    if (newState === BottomSheetBehavior.STATE_COLLAPSED) {
      this.setState({ fabColor: PRIMARY_COLOR })
      Animated.timing(this.state.bottomSheetColor, {
        duration: 50,
        toValue: 0,
      }).start()
    }

    this.bottomSheetState = newState
    this.setState({ bottomSheetState: newState })
  }

  handleSlide(e) {
    this.offset = e.nativeEvent.offset

    const { bottomSheetColor } = this.state

    if (this.bottomSheetState === BottomSheetBehavior.STATE_SETTLING && this.offset < 0.2) {
      this.setState({ fabColor: PRIMARY_COLOR })
      Animated.timing(bottomSheetColor, {
        duration: 50,
        toValue: 0,
      }).start()
    } else {
      this.setState({ fabColor: WHITE })
      Animated.timing(bottomSheetColor, {
        duration: 50,
        toValue: 1,
      }).start()
    }
  }

  renderDetailItem(icon, text) {
    return (
      <TouchableNativeFeedback delayPressIn={0} delayPressOut={0} background={RippleColor}>
        <View>
          <View pointerEvents="none" style={styles.detailItem}>
            <Icon name={icon} size={18} color={PRIMARY_COLOR} />
            <Text pointerEvents="none" style={styles.detailText}>{text}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderFloatingActionButton() {
    const { fabColor } = this.state
    return (
      <FloatingActionButton
        ref="floating"
        rippleEffect={true}
        icon={"directions"}
        iconProvider={IconMDI}
        iconColor={fabColor === WHITE ? PRIMARY_COLOR : WHITE}
        onPress={this.handleFabPress}
        backgroundColor={fabColor}
      />
    )
  }

  renderBottomSheet() {
    const { bottomSheetState, bottomSheetColor } = this.state
    const headerAnimated = {
      backgroundColor: bottomSheetColor.interpolate({
        inputRange:  [0, 1],
        outputRange: [WHITE, PRIMARY_COLOR]
      })
    }
    const textAnimated = {
      color: bottomSheetColor.interpolate({
        inputRange:  [0, 1],
        outputRange: ['#333', WHITE]
      })
    }
    const starsAnimated = bottomSheetColor.interpolate({
      inputRange:  [0, 1],
      outputRange: ['#FF5722', WHITE]
    })
    const routeTextAnimated = bottomSheetColor.interpolate({
      inputRange:  [0, 1],
      outputRange: [PRIMARY_COLOR, WHITE]
    })

    return (
      <BottomSheetBehavior
        ref="bottomSheet"
        peekHeight={90}
        state={bottomSheetState}
        onSlide={::this.handleSlide}
        onStateChange={::this.handleBottomSheetChange}>
        <View style={styles.bottomSheet}>
          <TouchableWithoutFeedback onPress={::this.handleBottomSheetOnPress}>
            <Animated.View style={[styles.bottomSheetHeader, headerAnimated]}>
              <View style={styles.bottomSheetLeft}>
                <Animated.Text style={[styles.bottomSheetTitle, textAnimated]}>
                  React Native Bar!
                </Animated.Text>
                <View style={styles.starsContainer}>
                  <Animated.Text style={{ color: starsAnimated, marginRight: 8 }}>5.0</Animated.Text>
                  <AnimatedIcon name="md-star" size={16} style={styles.star} style={{ color: starsAnimated }} />
                  <AnimatedIcon name="md-star" size={16} style={styles.star} style={{ color: starsAnimated }} />
                  <AnimatedIcon name="md-star" size={16} style={styles.star} style={{ color: starsAnimated }} />
                  <AnimatedIcon name="md-star" size={16} style={styles.star} style={{ color: starsAnimated }} />
                  <AnimatedIcon name="md-star" size={16} style={styles.star} style={{ color: starsAnimated }} />
                </View>
              </View>
              <View style={styles.bottomSheetRight}>
                <Animated.Text style={[styles.routeLabel, { color: routeTextAnimated }]}>Route</Animated.Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
          <View style={styles.bottomSheetContent}>
            <View style={styles.sectionIcons}>
              <View style={styles.iconBox}>
                <Icon name="md-call" size={22} color={PRIMARY_COLOR} />
                <Text style={styles.iconLabel}>CALL</Text>
              </View>
              <View style={styles.iconBox}>
                <Icon name="md-star" size={22} color={PRIMARY_COLOR} />
                <Text style={styles.iconLabel}>SAVE</Text>
              </View>
              <View style={styles.iconBox}>
                <Icon name="md-globe" size={22} color={PRIMARY_COLOR} />
                <Text style={styles.iconLabel}>WEBSITE</Text>
              </View>
            </View>
            <View style={styles.detailListSection}>
              {this.renderDetailItem('md-locate', 'Av. Lorem Ipsum dolor sit amet - consectetur adipising elit.')}
              {this.renderDetailItem('md-timer', 'Open now: 06:22:00')}
              {this.renderDetailItem('md-call', '(11) 9999-9999')}
              {this.renderDetailItem('md-globe', 'https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior')}
              {this.renderDetailItem('md-create', 'Suggest an edit')}
            </View>
          </View>
        </View>
      </BottomSheetBehavior>
    )
  }

  renderMaps() {
    return (
      <View style={styles.containerMap}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -22.920,
            longitude: -43.190,
            latitudeDelta: 0.1022,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    )
  }

  renderToolbar() {
    return (
      <View style={styles.toolbar}>
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={RippleColor}
          onPress={::this.handleOpenDrawer}>
          <View style={styles.buttonIcon}>
            <Icon name="md-menu" size={20} />
          </View>
        </TouchableNativeFeedback>
        <TextInput
          style={styles.textInput}
          placeholder="Try restaurants, coffee"
          placeholderTextColor="#c2c2c2"
          underlineColorAndroid="transparent" />
        <TouchableNativeFeedback
          delayPressIn={0}
          delayPressOut={0}
          background={RippleColor}>
          <View style={styles.buttonIcon}>
            <Icon name="md-mic" size={20} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <View style={styles.content}>
          {this.renderMaps()}
          {this.renderToolbar()}
        </View>
        {this.renderBottomSheet()}
        {this.renderFloatingActionButton()}
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
    backgroundColor: 'transparent',
  },
  containerMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height,
    width,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  toolbar: {
    marginTop: 32,
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 4,
    backgroundColor: WHITE,
  },
  buttonIcon: {
    padding: 16,
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    height: 50,
    marginHorizontal: 12,
  },
  bottomSheet: {
    zIndex: 5,
    backgroundColor: 'transparent'
  },
  bottomSheetHeader: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetLeft: {
    flexDirection: 'column'
  },
  bottomSheetRight: {
    flexDirection: 'column'
  },
  bottomSheetTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
  },
  bottomSheetContent: {
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
  routeLabel: {
    marginTop: 32,
    fontSize: 12,
    color: PRIMARY_COLOR,
  },
  sectionIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  iconBox: {
    flex: 1,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'column'
  },
  iconLabel: {
    fontSize: 14,
    marginTop: 4,
    color: PRIMARY_COLOR
  },
  detailListSection: {
    paddingTop: 4,
  },
  detailItem: {
    height: 38,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 22,
  },
  detailText: {
    color: '#333',
    fontSize: 12,
    marginLeft: 24,
  },
})

export default GoogleMapsView
