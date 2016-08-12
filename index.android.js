/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  StyleSheet,
  AppRegistry,
} from 'react-native';

const { width, height } = Dimensions.get('window')

import {
  CoordinatorLayout,
  BottomSheetBehavior,
} from './lib'

class bottomSheetBehavior extends Component {
  render() {
    return (
      <CoordinatorLayout style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        </View>
        <BottomSheetBehavior>
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.label}>BottomSheetBehavior !</Text>
            </View>
            <View style={styles.bottomSheetContent}>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Fusce facilisis purus id odio finibus, non tincidunt est pellentesque.
                Etiam tincidunt vestibulum pharetra.
                Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Nam lacus ante, tempor blandit odio at, scelerisque euismod magna.
                Morbi sit amet tellus lectus. Sed facilisis nisl magna, non consequat justo fringilla et.
                Nunc nec efficitur orci. Sed aliquet metus hendrerit nulla mollis, id porta lacus posuere.
                Sed auctor felis risus, ut rutrum nunc sodales vitae. Morbi congue, enim in volutpat faucibus, elit odio finibus arcu, in vestibulum tortor arcu egestas justo.
                Aliquam in ex nisl. Nam turpis enim, lacinia et augue in, luctus bibendum nulla.
              </Text>
            </View>
          </View>
        </BottomSheetBehavior>
      </CoordinatorLayout>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  item: {
    height: 100,
    marginTop: 4,
    backgroundColor: 'grey'
  },
  bottomSheet: {
    // RelativeLayout should wrap it but doens't work.
    height: 200,

    backgroundColor: '#3F51B5',
  },
  bottomSheetHeader: {
    padding: 18,
  },
  bottomSheetContent: {
    // flex: 1,
    // height,
    padding: 18,
    backgroundColor: 'white'
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

AppRegistry.registerComponent('bottomSheetBehavior', () => bottomSheetBehavior);
