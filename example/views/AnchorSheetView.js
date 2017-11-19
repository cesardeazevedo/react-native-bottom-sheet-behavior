import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Image,
  Button,
  StatusBar,
  ViewPagerAndroid,
  Dimensions,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  MergedAppBarLayout,
  ScrollingAppBarLayout,
  CoordinatorLayout,
  BackdropBottomSheet,
  BottomSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const { height, width } = Dimensions.get('window')

const images = [
  require('../images/beer1.jpg'),
  require('../images/beer2.jpg'),
  require('../images/beer3.jpg'),
]

class AnchorSheetView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  state = {
    color: 'red'
  };

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  handleColor = () => {
    this.setState({
      color: this.state.color === 'red' ? 'blue' : 'red'
    })
  }

  handleSlide(e) {
    this.offset = e.nativeEvent.offset
  }

  handleBottomSheetChange(e) {
    this.lastState = e.nativeEvent.state
  }

  renderImage(source) {
    return (
      <View>
        <Image
          resizeMode="cover"
          style={{width, height: 300}}
          source={source}
        />
      </View>
    )
  }

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        <ScrollingAppBarLayout
          translucent
          style={styles.scrollAppBar}
          statusBarColor='#205cb2'>
          <Icon.ToolbarAndroid
            navIconName={'md-menu'}
            style={styles.toolbar}
            titleColor="#fff"
            title="AnchorSheet"
            onIconClicked={() => this.context.openDrawer()}
        />
        </ScrollingAppBarLayout>
        <View style={styles.content} />
        <BackdropBottomSheet height={300}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ViewPagerAndroid style={{flex: 1}}>
              {this.renderImage(images[0])}
              {this.renderImage(images[1])}
              {this.renderImage(images[2])}
            </ViewPagerAndroid>
          </View>
        </BackdropBottomSheet>
        <BottomSheetBehavior
          anchorEnabled
          peekHeight={80}
          hideable={false}
          ref={ref => {this.bottomSheet = ref}}
          onSlide={this.handleSlide}
          onStateChange={this.handleBottomSheetChange}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>AnchorSheetBehavior !</Text>
            </View>
            <View style={styles.bottomSheetContent}>
              <Button title='Change Color' onPress={this.handleColor} />
            </View>
          </View>
        </BottomSheetBehavior>
        <MergedAppBarLayout
          translucent
          mergedColor={this.state.color}
          toolbarColor={this.state.color}
          statusBarColor={this.state.color}
          style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
            navIconName='md-arrow-back'
            overflowIconName='md-more'
            title='AnchorSheet'
            titleColor="#fff"
            style={{elevation: 6}}
            actions={[
              {title: 'Search', show: 'always', iconName: 'md-search' },
              {title: 'More'}
            ]}
            onIconClicked={() => this.handleState(BottomSheetBehavior.STATE_COLLAPSED)}>
          </Icon.ToolbarAndroid>
        </MergedAppBarLayout>
        <FloatingActionButton
          autoAnchor
          elevation={18}
          backgroundColor={'#ffffff'}
          rippleColor={'#55ffffff'}
        />
      </CoordinatorLayout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  scrollAppBar: {
    zIndex: 1,
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
    padding: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomSheetContent: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default AnchorSheetView
