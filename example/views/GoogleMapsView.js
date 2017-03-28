import React, { Component, PropTypes } from 'react'
import {
  View,
  Text,
  Image,
  Keyboard,
  Animated,
  Platform,
  StatusBar,
  TextInput,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ViewPagerAndroid,
  TouchableNativeFeedback,
  TouchableWithoutFeedback
} from 'react-native'

import MapView from 'react-native-maps'
import Icon from 'react-native-vector-icons/Ionicons'
import IconMDI from 'react-native-vector-icons/MaterialIcons'

import {
  ScrollingAppBarLayout,
  MergedAppBarLayout,
  BackdropBottomSheet,
  AnchorSheetBehavior,
  CoordinatorLayout,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const { width, height } = Dimensions.get('window')

const duration = 120
const anchorPoint = 230
const RippleColor = (...args) => (
  Platform.Version >= 21
    ? TouchableNativeFeedback.Ripple(...args)
    : null
)

const WHITE = '#FFFFFF'
const PRIMARY_COLOR = '#4589f2'
const STATUS_BAR_COLOR = '#205cb2'
const TEXT_BASE_COLOR = '#333'
const STAR_COLOR = '#FF5722'

const {
  STATE_DRAGGING,
  STATE_EXPANDED,
  STATE_SETTLING,
  STATE_COLLAPSED,
  STATE_ANCHOR_POINT,
} = AnchorSheetBehavior

class GoogleMapsView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  static navigationOptions = {
    header: {
      visible: false
    }
  };

  state = {
    bottomSheetColor: 0,
    bottomSheetColorAnimated: new Animated.Value(0),
  };

  lastState = STATE_COLLAPSED

  handleOpenDrawer = () => {
    Keyboard.dismiss()
    this.context.openDrawer()
  }

  handleFabPress = () => {
    ToastAndroid.show('Pressed', ToastAndroid.SHORT)
  }

  handleBottomSheetOnPress = () => {
    if (this.lastState === STATE_COLLAPSED) {
      this.setState({ bottomSheetColor: 1 })
      this.bottomSheet.setBottomSheetState(STATE_ANCHOR_POINT)
    } else if (this.lastState === STATE_EXPANDED) {
      this.setState({ bottomSheetColor: 0 })
      this.bottomSheet.setBottomSheetState(STATE_COLLAPSED)
    }
  }

  handleBottomSheetChange = (e) => {
    const newState = e.nativeEvent.state

    if (this.offset > 0.1 && (newState === STATE_DRAGGING || newState === STATE_ANCHOR_POINT)) {
      this.setState({ bottomSheetColor: 1 })
    }
    if (newState === STATE_SETTLING && !this.settlingExpanded) {
      this.setState({ bottomSheetColor: 0 })
    }

    this.lastState = newState
  }

  handleSlide = (e) => {
    const { bottomSheetColor } = this.state
    const offset = parseFloat(e.nativeEvent.offset.toFixed(2))

    this.settlingExpanded = offset >= this.offset
    this.offset = offset

    if (offset === 0) {
      this.setState({ bottomSheetColor: 0 })
    } else if (bottomSheetColor !== 1 && this.lastState === STATE_DRAGGING) {
      this.setState({ bottomSheetColor: 1 })
    }
  }

  renderDetailItem = (icon, text) => (
    <TouchableNativeFeedback delayPressIn={0} delayPressOut={0} background={RippleColor('#d1d1d1')}>
      <View>
        <View pointerEvents="none" style={styles.detailItem}>
          <Icon name={icon} size={18} color={PRIMARY_COLOR} />
          <Text pointerEvents="none" style={styles.detailText}>{text}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  renderFloatingActionButton = () => {
    const { bottomSheetColor } = this.state
    const isExpanded = bottomSheetColor === 1
    return (
      <FloatingActionButton
        autoAnchor
        elevation={18}
        rippleEffect={true}
        rippleColor="grey"
        icon="directions"
        iconProvider={IconMDI}
        iconColor={!isExpanded ? WHITE : PRIMARY_COLOR}
        onPress={this.handleFabPress}
        backgroundColor={isExpanded ? WHITE : PRIMARY_COLOR}
      />
    )
  }

  renderBackdrop = () => {
    return (
      <BackdropBottomSheet height={anchorPoint}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ViewPagerAndroid style={{flex: 1}}>
            <View>
              <Image
                resizeMode="cover"
                style={{width, height: anchorPoint}}
                source={require('../images/beer1.jpg')}
              />
            </View>
            <View>
              <Image
                resizeMode="cover"
                style={{width, height: anchorPoint}}
                source={require('../images/beer2.jpg')}
              />
            </View>
            <View>
              <Image
                resizeMode="cover"
                style={{width, height: anchorPoint}}
                source={require('../images/beer3.jpg')}
              />
            </View>
          </ViewPagerAndroid>
        </View>
      </BackdropBottomSheet>
    )
  }

  renderMergedAppBarLayout = () => {
    return (
      <MergedAppBarLayout
        mergedColor={PRIMARY_COLOR}
        toolbarColor={PRIMARY_COLOR}
        statusBarColor={STATUS_BAR_COLOR}
        style={styles.appBarMerged}>
        <Icon.ToolbarAndroid
          navIconName="md-arrow-back"
          overflowIconName='md-more'
          title='AnchorSheet'
          titleColor="#fff"
          style={{elevation: 6}}
          actions={[
            {title: 'Search', show: 'always', iconName: 'md-search' },
            {title: 'More'}
            ]}
            onIconClicked={() => this.handleState(AnchorSheetBehavior.STATE_COLLAPSED)}>
        </Icon.ToolbarAndroid>
      </MergedAppBarLayout>
    )
  }

  renderBottomSheet = () => {
    const {
      bottomSheetColor,
      bottomSheetColorAnimated
    } = this.state

    Animated.timing(bottomSheetColorAnimated, {
      duration,
      toValue: bottomSheetColor,
    }).start()

    const headerAnimated = {
      backgroundColor: bottomSheetColorAnimated.interpolate({
        inputRange:  [0, 1],
        outputRange: [WHITE, PRIMARY_COLOR],
      })
    }
    const textAnimated = {
      color: bottomSheetColorAnimated.interpolate({
        inputRange:  [0, 1],
        outputRange: [TEXT_BASE_COLOR, WHITE],
      })
    }
    const starsAnimated = {
      color: bottomSheetColorAnimated.interpolate({
        inputRange:  [0, 1],
        outputRange: [STAR_COLOR, WHITE],
      })
    }
    const routeTextAnimated = {
      color: bottomSheetColorAnimated.interpolate({
        inputRange:  [0, 1],
        outputRange: [PRIMARY_COLOR, WHITE],
      })
    }

    return (
      <AnchorSheetBehavior
        ref={(bottomSheet) => { this.bottomSheet = bottomSheet }}
        peekHeight={90}
        anchorPoint={230}
        onSlide={this.handleSlide}
        onStateChange={this.handleBottomSheetChange}>
        <View style={styles.bottomSheet}>
          <TouchableWithoutFeedback onPress={this.handleBottomSheetOnPress}>
            <Animated.View style={[styles.bottomSheetHeader, headerAnimated]}>
              <View style={styles.bottomSheetLeft}>
                <Animated.Text style={[styles.bottomSheetTitle, textAnimated]}>
                  React Native Bar!
                </Animated.Text>
                <View style={styles.starsContainer}>
                  <Animated.Text style={[starsAnimated, { marginRight: 8 }]}>5.0</Animated.Text>
                  <AnimatedIcon name="md-star" size={16} style={[styles.star, starsAnimated]} />
                  <AnimatedIcon name="md-star" size={16} style={[styles.star, starsAnimated]} />
                  <AnimatedIcon name="md-star" size={16} style={[styles.star, starsAnimated]} />
                  <AnimatedIcon name="md-star" size={16} style={[styles.star, starsAnimated]} />
                  <AnimatedIcon name="md-star" size={16} style={[styles.star, starsAnimated]} />
                </View>
              </View>
              <View style={styles.bottomSheetRight}>
                <Animated.Text style={[styles.routeLabel, routeTextAnimated]}>Route</Animated.Text>
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
      </AnchorSheetBehavior>
    )
  }

  renderMaps = () => (
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

  renderToolbar = () => (
    <ScrollingAppBarLayout
      style={styles.scrollAppBar}
      statusBarColor={STATUS_BAR_COLOR}>
      <Icon.ToolbarAndroid
        navIconName={'md-menu'}
        style={styles.toolbar}
        titleColor="#fff"
        title="AnchorSheet"
        onIconClicked={() => this.context.openDrawer()} />
    </ScrollingAppBarLayout>
  )

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        {this.renderToolbar()}
        <View style={styles.content}>
          {this.renderMaps()}
        </View>
        {this.renderBackdrop()}
        {this.renderBottomSheet()}
        {this.renderMergedAppBarLayout()}
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
  scrollAppBar: {
    zIndex: 1,
  },
  toolbar: {
    backgroundColor: PRIMARY_COLOR,
  },
  appBarMerged: {
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
  buttonIcon: {
    padding: 16,
    borderRadius: 50,
  },
  toolbarInput: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 8,
  },
  bottomSheet: {
    height,
    zIndex: 5,
    backgroundColor: 'transparent'
  },
  bottomSheetHeader: {
    padding: 16,
    paddingLeft: 28,
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
    flex: 1,
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
