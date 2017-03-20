package com.bottomsheetbehavior;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class BackdropBottomSheetManager extends ViewGroupManager<BackdropBottomSheetView> {

  private final static String REACT_CLASS = "RCTBackdropBottomSheet";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public BackdropBottomSheetView createViewInstance(ThemedReactContext context) {
    return new BackdropBottomSheetView(context);
  }

  @ReactProp(name = "height", defaultInt = 300)
  public void setHeight(BackdropBottomSheetView view, int height) {
    view.setHeight(height);
  }
}