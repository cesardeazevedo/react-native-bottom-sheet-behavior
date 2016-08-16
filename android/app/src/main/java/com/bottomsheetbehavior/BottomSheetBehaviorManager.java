package com.bottomsheetbehavior;

import android.content.res.Resources;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.Map;
import javax.annotation.Nullable;

public class BottomSheetBehaviorManager extends ViewGroupManager<BottomSheetBehaviorView> {

    private final static String REACT_CLASS = "RCTBottomSheetBehaviorAndroid";

    public static final int COMMAND_SET_REQUEST_LAYOUT = 1;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BottomSheetBehaviorView createViewInstance(ThemedReactContext context) {
        return new BottomSheetBehaviorView(context);
    }

    @ReactProp(name = "hideable")
    public void setSelectedTab(BottomSheetBehaviorView view, boolean hideable) {
        view.setHideable(hideable);
    }

    @ReactProp(name = "peekHeight")
    public void setSelectedTab(BottomSheetBehaviorView view, int peekHeight) {
        view.setPeekHeight(peekHeight);
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("setRequestLayout", COMMAND_SET_REQUEST_LAYOUT);
    }

    @Override
    public void receiveCommand(BottomSheetBehaviorView view, int commandType, @Nullable ReadableArray args) {
        if (commandType == COMMAND_SET_REQUEST_LAYOUT) {
            setRequestLayout(view);
        }
    }

    private void setRequestLayout(BottomSheetBehaviorView view) {
        view.requestLayout();
    }
}
