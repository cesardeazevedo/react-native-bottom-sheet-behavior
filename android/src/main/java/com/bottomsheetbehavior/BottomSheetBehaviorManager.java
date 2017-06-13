package com.bottomsheetbehavior;

import android.support.annotation.NonNull;
import android.support.v4.view.ViewCompat;
import android.support.v4.widget.NestedScrollView;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;
import javax.annotation.Nullable;

public class BottomSheetBehaviorManager extends ViewGroupManager<BottomSheetBehaviorView> {

    private final static String REACT_CLASS = "BSBBottomSheetBehaviorAndroid";

    public static final int COMMAND_SET_REQUEST_LAYOUT = 1;
    public static final int COMMAND_SET_BOTTOM_SHEET_STATE = 2;
    public static final int COMMAND_ATTACH_NESTED_SCROLL_CHILD = 3;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BottomSheetBehaviorView createViewInstance(ThemedReactContext context) {
        BottomSheetBehaviorView bottomSheet = new BottomSheetBehaviorView(context);
        bottomSheet.behavior.addBottomSheetCallback(new BottomSheetBehaviorListener());
        return bottomSheet;
    }

    @ReactProp(name = "state", defaultInt = 4)
    public void setState(BottomSheetBehaviorView view, int state) {
        try {
            view.setState(state);
        } catch (Exception e) {
        }
    }

    @ReactProp(name = "hideable")
    public void setHideable(BottomSheetBehaviorView view, boolean hideable) {
        view.setHideable(hideable);
    }

    @ReactProp(name = "peekHeight", defaultInt = 50)
    public void setPeekHeight(BottomSheetBehaviorView view, int peekHeight) {
        view.setPeekHeight(peekHeight);
    }

    @ReactProp(name = "anchorEnabled")
    public void setAnchorEnabled(BottomSheetBehaviorView view, boolean anchorEnabled) {
        view.setAnchorEnabled(anchorEnabled);
    }

    @ReactProp(name = "anchorPoint", defaultInt = 300)
    public void setAnchorPoint(BottomSheetBehaviorView view, int anchorPoint) {
        view.setAnchorPoint(anchorPoint);
    }

    @ReactProp(name = "elevation", defaultFloat = 0)
    public void setElevation(BottomSheetBehaviorView view, float elevation) {
        view.setBottomSheetElevation(elevation);
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder
          .of("setRequestLayout", COMMAND_SET_REQUEST_LAYOUT,
              "setBottomSheetState", COMMAND_SET_BOTTOM_SHEET_STATE,
              "attachNestedScrollChild", COMMAND_ATTACH_NESTED_SCROLL_CHILD);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
            .put(
                "topStateChange",
                MapBuilder.of(
                    "phasedRegistrationNames",
                    MapBuilder.of(
                        "bubbled", "onStateChange", "captured", "onStateChangeCapture")))
            .put(
                "topSlide",
                MapBuilder.of(
                    "phasedRegistrationNames",
                    MapBuilder.of(
                        "bubbled", "onSlide", "captured", "onSlideCapture")))
            .build();
    }

    @Override
    public void receiveCommand(BottomSheetBehaviorView view, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
          case COMMAND_SET_REQUEST_LAYOUT:
              setRequestLayout(view);
              return;
          case COMMAND_SET_BOTTOM_SHEET_STATE:
              setBottomSheetState(view, args);
              return;
          case COMMAND_ATTACH_NESTED_SCROLL_CHILD:
              int nestedScrollId = args.getInt(0);
              ViewGroup child = (ViewGroup) view.getRootView().findViewById(nestedScrollId);
              if (child != null && child instanceof NestedScrollView) {
                  this.attachNestedScrollChild(view, (NestedScrollView) child);
              }
              return;

          default:
              throw new JSApplicationIllegalArgumentException("Invalid Command");
        }
    }

    private void setRequestLayout(BottomSheetBehaviorView view) {
        view.requestLayout();
    }

    private void setBottomSheetState(BottomSheetBehaviorView view, @Nullable ReadableArray args) {
        if (!args.isNull(0)) {
            int newState = args.getInt(0);
            setState(view, newState);
        }
    }

    /**
     * BottomSheetBehaviorView inherits a NestedScrollView in order to work
     * with the anchor point, but it breaks any ReactNestedScrollView child,
     * so we are changing the behavior of ReactNestedScrollView to disable
     * the nested scroll of the bottom sheet, and enable when the child scroll
     * reaches the top offset.
     */
    private void attachNestedScrollChild(final BottomSheetBehaviorView parent, final NestedScrollView nestedScroll) {
        nestedScroll.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                int action = event.getAction();
                if (action == MotionEvent.ACTION_MOVE) {
                    if (nestedScroll.computeVerticalScrollOffset() == 0) {
                        parent.startNestedScroll(ViewCompat.SCROLL_AXIS_VERTICAL);
                    } else {
                        parent.stopNestedScroll();
                    }
                }
                return nestedScroll.onTouchEvent(event);
            }
        });
    }

    public class BottomSheetBehaviorListener extends RNBottomSheetBehavior.BottomSheetCallback {
        @Override
        public void onStateChanged(@NonNull View bottomSheet, int newState) {
            WritableMap event = Arguments.createMap();
            event.putInt("state", newState);
            ReactContext reactContext = (ReactContext) bottomSheet.getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(bottomSheet.getId(), "topStateChange", event);
        }

        @Override
        public void onSlide(@NonNull View bottomSheet, float slideOffset) {
            WritableMap event = Arguments.createMap();
            event.putDouble("offset", slideOffset);
            ReactContext reactContext = (ReactContext) bottomSheet.getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(bottomSheet.getId(), "topSlide", event);
        }
    }
}
