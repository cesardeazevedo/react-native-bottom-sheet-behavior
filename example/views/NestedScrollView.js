import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  View,
  Button,
  StatusBar,
  Dimensions,
  StyleSheet,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  CoordinatorLayout,
  BottomSheetBehavior,
} from 'react-native-bottom-sheet-behavior'

import NestedScrollView from 'react-native-nested-scroll-view'

const { STATE_COLLAPSED, STATE_EXPANDED } = BottomSheetBehavior

const { width, height } = Dimensions.get('window')

class NestedScroll extends Component {
  static contextTypes = {
    openDrawer: PropTypes.any,
  };

  state = {
    buttons: [0, 1, 2],
  };

  componentDidMount() {
    this.bottomSheet.attachNestedScrollChild(this.nestedScroll)
  }

  handleAddButton = () => {
    /* eslint-disable object-curly-spacing */
    const { buttons } = this.state
    const length = buttons.length || 0
    this.setState({ buttons: [
      ...buttons,
      length + 1
    ]})
  }

  handleRemoveButton = (index) => {
    const { buttons } = this.state
    this.setState({ buttons: [
      ...buttons.slice(0, index),
      ...buttons.slice(index + 1)
    ]})
  }

  handleState = (state) => {
    this.bottomSheet.setBottomSheetState(state)
  }

  renderButton = (key, index) => (
    <View key={key} style={{marginTop: 8, marginHorizontal: 12}}>
      <Button
        color='#333'
        title={key.toString()}
        onPress={() => this.handleRemoveButton(index)}
      />
    </View>
  )

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
              title="NestedScrollView"
              onIconClicked={() => this.context.openDrawer()}
            />
          </View>
          <View style={{flex: 1, width, paddingHorizontal: 24}}>
            <Button title='Add Button' color='#4389f2' onPress={this.handleAddButton} />
            <View style={{margin: 8}} />
            <Button title='Expand' color='#4389f2' onPress={() => this.handleState(STATE_EXPANDED)} />
            <View style={{margin: 8}} />
            <Button title='Collapse' color='#4389f2' onPress={() => this.handleState(STATE_COLLAPSED)} />
          </View>
          <View style={{flex: 1}} />
        </View>
        <BottomSheetBehavior
          peekHeight={70}
          hideable={false}
          anchorEnabled={false}
          ref={ref => { this.bottomSheet = ref }}>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>NestedScrollView !</Text>
            </View>
            <View style={styles.bottomSheetContent} >
              <NestedScrollView ref={ref => { this.nestedScroll = ref }} style={styles.scroll}>
                {this.state.buttons.map(this.renderButton)}
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
    backgroundColor: '#fff',
  },
  content: {
    height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  toolbarWrapper: {
    elevation: 4,
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
    height: 200,
  },
  bottomSheet: {
    backgroundColor: '#4389f2',
  },
  bottomSheetHeader: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  bottomSheetContent: {
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
