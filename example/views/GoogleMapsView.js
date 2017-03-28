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
  CoordinatorLayout,
  BottomSheetHeader,
  MergedAppBarLayout,
  BackdropBottomSheet,
  AnchorSheetBehavior,
  FloatingActionButton,
  ScrollingAppBarLayout,
} from 'react-native-bottom-sheet-behavior'

const { width, height } = Dimensions.get('window')

const anchorPoint = 230
const RippleColor = (...args) => (
  Platform.Version >= 21
    ? TouchableNativeFeedback.Ripple(...args)
    : null
)

const WHITE = '#FFFFFF'
const PRIMARY_COLOR = '#4589f2'
const STATUS_BAR_COLOR = '#205cb2'
const STAR_COLOR = '#FF5722'

const { STATE_ANCHOR_POINT, STATE_COLLAPSED } = AnchorSheetBehavior

class GoogleMapsView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  static navigationOptions = {
    header: {
      visible: false
    }
  };

  handleOpenDrawer = () => {
    Keyboard.dismiss()
    this.context.openDrawer()
  }

  handleFabPress = () => {
    ToastAndroid.show('Pressed', ToastAndroid.SHORT)
  }

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  handleHeaderPress = () => {
    this.handleState(STATE_ANCHOR_POINT)
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
    return (
      <FloatingActionButton
        autoAnchor
        elevation={18}
        rippleEffect={true}
        rippleColor="grey"
        icon="directions"
        iconProvider={IconMDI}
        iconColor={WHITE}
        iconColorExpanded={PRIMARY_COLOR}
        onPress={this.handleFabPress}
        backgroundColor={PRIMARY_COLOR}
        backgroundColorExpanded={WHITE}
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
            onIconClicked={() => this.handleState(STATE_COLLAPSED)}>
        </Icon.ToolbarAndroid>
      </MergedAppBarLayout>
    )
  }

  renderBottomSheet = () => {
    return (
      <AnchorSheetBehavior
        ref={(bottomSheet) => { this.bottomSheet = bottomSheet }}
        peekHeight={80}
        anchorPoint={230}
        onSlide={this.handleSlide}
        onStateChange={this.handleBottomSheetChange}>
        <View style={styles.bottomSheet}>
          <BottomSheetHeader
            onPress={this.handleHeaderPress}
            textColorExpanded={WHITE}
            fabBackground={PRIMARY_COLOR}
            fabBackgroundExpanded={WHITE}
            backgroundColor={WHITE}
            backgroundColorExpanded={PRIMARY_COLOR}>
            <View pointerEvents='none' style={styles.bottomSheetHeader}>
              <View style={styles.bottomSheetLeft}>
                <Text selectionColor={'#000'} style={[styles.bottomSheetTitle]}>
                  React Native Bar!
                </Text>
                <View style={styles.starsContainer}>
                  <Text style={{marginRight: 8}} selectionColor={STAR_COLOR}>5.0</Text>
                  <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
                  <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
                  <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
                  <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
                  <Icon name="md-star" size={16} selectionColor={STAR_COLOR} style={styles.star} />
                </View>
              </View>
              <View style={styles.bottomSheetRight}>
                <Text style={styles.routeLabel} selectionColor={PRIMARY_COLOR}>Route</Text>
              </View>
            </View>
          </BottomSheetHeader>
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
    // height: 100,
    padding: 16,
    paddingLeft: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // Don't forget this
    backgroundColor: 'transparent'
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
