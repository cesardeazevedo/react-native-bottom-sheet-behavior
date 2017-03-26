package com.bottomsheetbehavior;

import android.support.annotation.NonNull;
import android.view.View;

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

public class AnchorSheetBehaviorManager extends ViewGroupManager<AnchorSheetBehaviorView> {

  private final static String REACT_CLASS = "RCTAnchorSheetBehaviorAndroid";

  public static final int COMMAND_SET_REQUEST_LAYOUT = 1;
  public static final int COMMAND_SET_BOTTOM_SHEET_STATE = 2;

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public AnchorSheetBehaviorView createViewInstance(ThemedReactContext context) {
    AnchorSheetBehaviorView anchorSheet = new AnchorSheetBehaviorView(context);
    anchorSheet.bottomSheetBehavior.addBottomSheetCallback(new AnchorSheetBehaviorListener());
    return anchorSheet;
  }

  @ReactProp(name = "state", defaultInt = 4)
  public void setState(AnchorSheetBehaviorView view, int state) {
    try {
      view.setState(state);
    } catch (Exception e) {
    }
  }

  @ReactProp(name = "hideable")
  public void setHideable(AnchorSheetBehaviorView view, boolean hideable) {
    view.setHideable(hideable);
  }

  @ReactProp(name = "peekHeight", defaultInt = 50)
  public void setPeekHeight(AnchorSheetBehaviorView view, int peekHeight) {
    view.setPeekHeight(peekHeight);
  }

  @ReactProp(name = "anchorPoint", defaultInt = 300)
  public void setAnchorPoint(AnchorSheetBehaviorView view, int anchorPoint) {
    view.setAnchorPoint(anchorPoint);
  }

  @ReactProp(name = "elevation", defaultFloat = 0)
  public void setElevation(AnchorSheetBehaviorView view, float elevation) {
    view.setBottomSheetElevation(elevation);
  }

  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder
        .of("setRequestLayout", COMMAND_SET_REQUEST_LAYOUT,
            "setBottomSheetState", COMMAND_SET_BOTTOM_SHEET_STATE);
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
  public void receiveCommand(AnchorSheetBehaviorView view, int commandType, @Nullable ReadableArray args) {
    switch (commandType) {
      case COMMAND_SET_REQUEST_LAYOUT:
        setRequestLayout(view);
        return;
      case COMMAND_SET_BOTTOM_SHEET_STATE:
        setBottomSheetState(view, args);
        return;
      default:
        throw new JSApplicationIllegalArgumentException("Invalid Command");
    }
  }

  private void setRequestLayout(AnchorSheetBehaviorView view) {
    view.requestLayout();
  }

  private void setBottomSheetState(AnchorSheetBehaviorView view, @Nullable ReadableArray args) {
    if (!args.isNull(0)) {
      int newState = args.getInt(0);
      setState(view, newState);
    }
  }

  public class AnchorSheetBehaviorListener extends AnchorSheetBehavior.BottomSheetCallback {
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
