# react-native-bottom-sheet-behavior
react-native wrapper for android BottomSheetBehavior

[![npm version](https://badge.fury.io/js/react-native-bottom-sheet-behavior.svg)](https://badge.fury.io/js/react-native-bottom-sheet-behavior)

## Demo

![react-native-bottom-sheet-behavior](http://i.imgur.com/LL3gBVM.gif)


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

android/app/settings.gradle


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

You will need to wrap your view into a `CoordinatorLayout` in order to make it work.

```js

    render() {
      return (
          <CoordinatorLayout style={styles.container}>
            <View style={{ flex: 1 }}></View>
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


## FloatingActionButton

If your are using FloatingActionButton, you'll need to connect it to the BottomSheetBehavior, in order to follow when it's dragging.

this be can done like this

```js
  componentDidMount() {
    this.refs.fab.setAnchorId(this.refs.bottomSheet)
  }
```

### Support for react-native-vector-icons

You can also use [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) on FloatingActionButton, which will load automatically the icon for you.

```js
  import Icon from 'react-native-vector-icons/Ionicons'

  ...

  render() {
    return (
      <FloatingActionButton icon={"directions"} iconProvider={Icon} />
    )
  }
```

You can check [GoogleMapsView.js](https://github.com/cesardeazevedo/react-native-bottom-sheet-behavior/blob/master/example/views/GoogleMapsView.js) example

BottomSheetBehavior properties

| Prop            | Description                                                                | Default Value |
|-----------------|----------------------------------------------------------------------------|---------------|
| peekHeight      | Peek Height value in DP                                                    | 50            |
| hideable        | Allow hide the bottomSheet                                                 | false         |
| onStateChange   | Callback when bottom sheet state changed                                   |               |
| onSlide         | Callback continuously called while the user is dragging the bottom sheet   |               |


BottomSheetBehavior States

| State | Description     |
|-------|-----------------|
| 1     | STATE_DRAGGING  |
| 2     | STATE_SETTLING  |
| 3     | STATE_EXPANDED  |
| 4     | STATE_COLLAPSED |
| 5     | STATE_HIDDEN    |


FloatingActionButton properties

| Prop                | Description                                        |
| ------------------- | ---------------------------------------------------|
| src                 | Drawable file under the drawable android folder    |
| icon                | react-native-vector-icons name                     |
| iconProvider        | Icon package provided by react-native-vector-icons |
| iconColor           | Icon color                                         |
| backgroundColor     | Background color                                   |
| hidden              | Hiddes the FloatingActionButton                    |
| rippleEffect        | Enable rippleEffect                                |
| onPress             | Callback called when touch is released             |

## Roadmap

* [CustomBottomSheetBehavior like Google Maps](https://github.com/miguelhincapie/CustomBottomSheetBehavior)


# License

[MIT](./LICENSE)

