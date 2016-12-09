# react-native-bottom-sheet-behavior
react-native wrapper for android [BottomSheetBehavior](https://developer.android.com/reference/android/support/design/widget/BottomSheetBehavior.html), supports [FloatingActionButton](https://developer.android.com/reference/android/support/design/widget/FloatingActionButton.html) and [NestedScrollView](https://developer.android.com/reference/android/support/v4/widget/NestedScrollView.html).

[![npm version](https://badge.fury.io/js/react-native-bottom-sheet-behavior.svg)](https://badge.fury.io/js/react-native-bottom-sheet-behavior)

## Demo

![react-native-bottom-sheet-behavior](http://i.imgur.com/LL3gBVM.gif)

## Components

The following components are included in this package:

* CoordinatorLayout
* BottomSheetBehavior
* FloatingActionButton
* NestedScrollView

## Install

`$ npm install react-native-bottom-sheet-behavior`

### Install with RNPM

`$ rnpm link react-native-bottom-sheet-behavior`

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
          <CoordinatorLayout style={styles.container}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}></View>
            <BottomSheetBehavior
                ref="bottomSheet"
                peekHeight={50}
                hideable={true}
                state={BottomSheetBehavior.STATE_COLLAPSED}>
                <View></View>
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


FloatingActionButton properties

| Prop                | Description                                        | Default Value |
| ------------------- | ---------------------------------------------------|---------------|
| src                 | Drawable file under the drawable android folder    |               |
| icon                | react-native-vector-icons name                     |               |
| iconProvider        | Icon package provided by react-native-vector-icons |               |
| iconColor           | Icon color (API >= 21)                             |               |
| backgroundColor     | Background color                                   |               |
| hidden              | Hides FloatingActionButton                         | false         |
| rippleEffect        | Enable rippleEffect                                | true          |
| elevation       	  | Elevation shadow                                   | 18            |
| onPress             | Callback called when touch is released             |               |

## Roadmap

* [CustomBottomSheetBehavior like Google Maps](https://github.com/miguelhincapie/CustomBottomSheetBehavior)


# License

[MIT](./LICENSE)

