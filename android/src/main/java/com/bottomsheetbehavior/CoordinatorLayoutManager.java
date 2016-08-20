package com.bottomsheetbehavior;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.ThemedReactContext;

public class CoordinatorLayoutManager extends ViewGroupManager<CoordinatorLayoutView> {

    private final static String REACT_CLASS = "RCTCoordinatorLayoutAndroid";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CoordinatorLayoutView createViewInstance(ThemedReactContext context) {
        return new CoordinatorLayoutView(context);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
