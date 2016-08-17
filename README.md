# react-native-bottom-sheet-behavior
react-native wrapper for android BottomSheetBehavior

> NOTE
>
> This is still very experimental.


## Demo

![react-native-bottom-sheet-behavior](http://i.stack.imgur.com/lHAL9.gif)

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
                peekHeight={50}
                hideable={true}
                state={BottomSheetBehavior.STATE_COLLAPSED}>
                <View></View>
            </BottomSheetBehavior>
          </CoordinatorLayout>
      )
    }

```

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

## Roadmap

~~* Events callback (STATE_EXPANDED, STATE_COLLAPSED, STATE_DRAGGING, STATE_HIDDEN, STATE_SETTLING)~~
* [CustomBottomSheetBehavior like Google Maps](https://github.com/miguelhincapie/CustomBottomSheetBehavior)


# License

[MIT](./LICENSE)

