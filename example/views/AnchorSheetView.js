import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
  StatusBar,
  ViewPagerAndroid,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
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

class AnchorSheetView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  static navigationOptions = {
    header: {
      visible: false
    }
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

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        <ScrollingAppBarLayout style={styles.scrollAppBar} statusBarColor='#205cb2'>
          <Icon.ToolbarAndroid
            navIconName={'md-menu'}
            style={styles.toolbar}
            titleColor="#fff"
            title="AnchorSheet"
            onIconClicked={() => this.context.openDrawer()}
        />
        </ScrollingAppBarLayout>
        <View style={styles.content}>
        </View>
        <BackdropBottomSheet height={300}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <ViewPagerAndroid style={{flex: 1}}>
              <View>
                <Image
                  resizeMode="cover"
                  style={{width, height: 300}}
                  source={require('../images/beer1.jpg')}
                />
              </View>
              <View>
                <Image
                  resizeMode="cover"
                  style={{width, height: 300}}
                  source={require('../images/beer2.jpg')}
                />
              </View>
              <View>
                <Image
                  resizeMode="cover"
                  style={{width, height: 300}}
                  source={require('../images/beer3.jpg')}
                />
              </View>
            </ViewPagerAndroid>
          </View>
        </BackdropBottomSheet>
        <AnchorSheetBehavior
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
              <TouchableWithoutFeedback
                onPress={this.handleColor}>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width,
                  height: 33,
                  padding: 12,
                  backgroundColor: '#333'
                }}>
                  <Text style={{color: 'white'}}>Color</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </AnchorSheetBehavior>
        <MergedAppBarLayout
          mergedColor={this.state.color}
          toolbarColor={this.state.color}
          statusBarColor={this.state.color}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
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
    padding: 2,
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
