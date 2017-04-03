# react-native-bottom-sheet-behavior
react-native wrapper for android [BottomSheetBehavior](https://developer.android.com/reference/android/support/design/widget/BottomSheetBehavior.html), supports [FloatingActionButton](https://developer.android.com/reference/android/support/design/widget/FloatingActionButton.html) and [NestedScrollView](https://developer.android.com/reference/android/support/v4/widget/NestedScrollView.html).

[![npm version](https://badge.fury.io/js/react-native-bottom-sheet-behavior.svg)](https://badge.fury.io/js/react-native-bottom-sheet-behavior)

## Demo

![react-native-bottom-sheet-behavior](https://cloud.githubusercontent.com/assets/5366959/24594266/c59667bc-1801-11e7-840c-97588658a8ae.gif)

## Components

The following components are included in this package:

* CoordinatorLayout
* BottomSheetBehavior
* FloatingActionButton
* NestedScrollView

## Install

`$ npm install react-native-bottom-sheet-behavior`

### Install with RNPM

`$ react-native link react-native-bottom-sheet-behavior`

### Install Manually

Edit the current files as follows.

MainApplication.java

```diff

+   import com.bottomsheetbehavior.BottomSheetBehaviorPackage;

    public class MainApplication extends Application implements ReactApplication {

      @Override
      protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
+           new BottomSheetBehaviorPackage()
        );
      }
    }

```

android/app/build.gradle


```diff

    dependencies {
        compile fileTree(dir: "libs", include: ["*.jar"])
        compile "com.android.support:appcompat-v7:23.0.1"
        compile "com.facebook.react:react-native:+"  // From node_modules
+       compile project(':react-native-bottom-sheet-behavior')
    }

```

android/settings.gradle

```diff

include ':app'

+   include ':react-native-bottom-sheet-behavior'
+   project(':react-native-bottom-sheet-behavior').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-bottom-sheet-behavior/android')

```

## Usage

You will need to wrap your view into a `CoordinatorLayout` to make it work.

```js

    render() {
      return (
          <CoordinatorLayout style={{flex: 1}}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}></View>
            <BottomSheetBehavior
              ref='bottomSheet'
              peekHeight={70}
              hideable={false}
              state={BottomSheetBehavior.STATE_COLLAPSED}>
              <View style={{backgroundColor: '#4389f2'}}>
                <View style={{padding: 26}}>
                  <Text>BottomSheetBehavior!</Text>
                </View>
                <View style={{height: 200, backgroundColor: '#fff'}} />
              </View>
            </BottomSheetBehavior>
            <FloatingActionButton ref="fab" />
          </CoordinatorLayout>
      )
    }

```

> *NOTE*
> Make sure that your view has a `backgroundColor` style to prevent some "bugs" when rendering the container.

## FloatingActionButton

If you are using FloatingActionButton, you'll need to connect it to the BottomSheetBehavior, in order to follow when it's dragging.

You can achieve it doing this:

```js
  componentDidMount() {
    this.refs.fab.setAnchorId(this.refs.bottomSheet)
  }
```

### Support for react-native-vector-icons

You can also use [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) on FloatingActionButton, which will automatically load the icon for you.

```js
  import Icon from 'react-native-vector-icons/Ionicons'

  ...

  render() {
    return (
      <FloatingActionButton icon={"directions"} iconProvider={Icon} />
    )
  }
```

You can check [GoogleMapsView.js](https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior/blob/master/example/views/GoogleMapsView.js) example.

## NestedScrollView

NestedScrollView allows you to scroll inside bottom sheet continuously, it's a fork from react-native `ScrollView`, and it should work the same way.

![react-native](http://i.imgur.com/EaXBCa0.gif)

[NestedScrollView.js](https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior/blob/master/example/views/NestedScrollView.js) example

## API

BottomSheetBehavior properties

| Prop            | Description                                                                | Default Value       |
|-----------------|----------------------------------------------------------------------------|---------------------|
| state           | The state of the bottom sheet                                              | 4 (STATE_COLLAPSED) |
| peekHeight      | Peek Height value in DP                                                    | 50                  |
| hideable        | Allow hide the bottomSheet                                                 | false               |
| elevation       | Elevation shadow                                                           | 0                   |
| onStateChange   | Callback when bottom sheet state changed                                   |                     |
| onSlide         | Callback continuously called while the user is dragging the bottom sheet   |                     |

BottomSheetBehavior States

| State | Description     |
|-------|-----------------|
| 1     | STATE_DRAGGING  |
| 2     | STATE_SETTLING  |
| 3     | STATE_EXPANDED  |
| 4     | STATE_COLLAPSED |
| 5     | STATE_HIDDEN    |

BottomSheetBehavior actions

| Method              | Description                 |
| --------------------|-----------------------------|
| setBottomSheetState | Sets the bottom sheet state |

FloatingActionButton properties

| Prop                | Description                                        | Default Value |
| --------------------|----------------------------------------------------|---------------|
| src                 | Drawable file under the drawable android folder    |               |
| autoAnchor          | Attachs the button on bottom sheet automatically   | false         |
| icon                | react-native-vector-icons name                     |               |
| iconProvider        | Icon package provided by react-native-vector-icons |               |
| iconColor           | Icon color                                         |               |
| backgroundColor     | Background color                                   |               |
| hidden              | Hides FloatingActionButton                         | false         |
| rippleEffect        | Enable rippleEffect                                | true          |
| rippleColor         | Ripple color                                       |               |
| elevation           | Elevation shadow                                   | 18            |
| onPress             | Callback called when touch is released             |               |

FloatingActionButton actions

| Method        | Description  |
| --------------|--------------------------------------------------------------------------------|
| [show](https://developer.android.com/reference/android/support/design/widget/FloatingActionButton.html#show) | This method will animate the button show if the view has already been laid out |
| [hide](https://developer.android.com/reference/android/support/design/widget/FloatingActionButton.html#hide()) | This method will animate the button hide if the view has already been laid out |
| setAnchorId | Attachs the button on bottom sheet by passing it as a argument (no needed if autoAnchor is set true) |

## Roadmap

* [CustomBottomSheetBehavior like Google Maps](https://github.com/miguelhincapie/CustomBottomSheetBehavior)


# License

[MIT](./LICENSE)

