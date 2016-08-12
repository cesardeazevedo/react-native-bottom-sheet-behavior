package com.bottomsheetbehavior;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;

public class BottomSheetBehaviorManager extends ViewGroupManager<BottomSheetBehaviorView> {

    private final static String REACT_CLASS = "RCTBottomSheetBehaviorAndroid";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BottomSheetBehaviorView createViewInstance(ThemedReactContext context) {
        return new BottomSheetBehaviorView(context);
    }

     // Enable ShadowNode measure
     // @Override
     // public LayoutShadowNode createShadowNodeInstance() {
     //     return new BottomSheetBehaviorShadowNode();
     // }

     // @Override
     // public Class getShadowNodeClass() {
     //     return BottomSheetBehaviorShadowNode.class;
     // }
}

