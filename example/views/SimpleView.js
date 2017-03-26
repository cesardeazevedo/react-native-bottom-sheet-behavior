import React, { Component, PropTypes } from 'react'
import {
  Text,
  View,
  Image,
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
  AnchorSheetBehavior,
  FloatingActionButton,
} from 'react-native-bottom-sheet-behavior'

const { height, width } = Dimensions.get('window')

class SimpleView extends Component {
  static contextTypes = {
    openDrawer: PropTypes.func,
  };

  static navigationOptions = {
    header: {
      visible: false
    }
  };

  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <StatusBar translucent backgroundColor='#205cb2' />
        <ScrollingAppBarLayout statusBarColor='#205cb2'>
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
              <Image
                resizeMode="cover"
                style={{width, height: 300}}
                source={require('../images/beer1.jpg')}
              />
              <Image
                resizeMode="cover"
                style={{width, height: 300}}
                source={require('../images/beer2.jpg')}
              />
              <Image
                resizeMode="cover"
                style={{width, height: 300}}
                source={require('../images/beer3.jpg')}
              />
            </ViewPagerAndroid>
          </View>
        </BackdropBottomSheet>
        <AnchorSheetBehavior
          peekHeight={70}
          hideable={false}
          onSlide={this.handleSlide}
          onStateChange={this.handleBottomSheetChange}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>AnchorSheetBehavior !</Text>
            </View>
            <View style={styles.bottomSheetContent}>
            </View>
          </View>
        </AnchorSheetBehavior>
        <MergedAppBarLayout
          mergedColor="#4389f2"
          toolbarColor="#4389f2"
          statusBarColor="#205cb2"
          style={styles.appBarMerged}>
          <Icon.ToolbarAndroid
            navIconName="md-arrow-back"
            overflowIconName='md-more'
            titleColor="#fff"
            title="AnchorSheet"
            style={{elevation: 6}}
            actions={[
              {title: 'Search', show: 'always', iconName: 'md-search' },
              {title: 'More'}
            ]}
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
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default SimpleView
