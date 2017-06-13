package com.bottomsheetbehavior;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

public class BottomSheetHeaderManager extends ViewGroupManager<BottomSheetHeaderView> {

    private static final String REACT_CLASS = "BSBBottomSheetHeader";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected BottomSheetHeaderView createViewInstance(ThemedReactContext reactContext) {
        BottomSheetHeaderView view = new BottomSheetHeaderView(reactContext);
        view.setOnClickListener(new BottomSheetHeaderListener());
        view.setClickable(true);
        view.setEnabled(true);
        return view;
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(BottomSheetHeaderView view, String color) {
        view.setBackgroundColorDefault(Color.parseColor(color));
        view.toggleBackground(view.getToggled());
    }

    @ReactProp(name = "backgroundColorExpanded")
    public void setBackgroundColorExpanded(BottomSheetHeaderView view, String color) {
        view.setBackgroundColorExpanded(Color.parseColor(color));
        view.toggleBackground(view.getToggled());
    }

    @ReactProp(name = "textColorExpanded")
    public void setTextColorExpanded(BottomSheetHeaderView view, String color) {
        view.setTextColorExpanded(Color.parseColor(color));
        view.toggleTextViews(view.getToggled());
    }

    private class BottomSheetHeaderListener implements View.OnClickListener {

        @Override
        public void onClick(View v) {
            WritableMap event = Arguments.createMap();
            ReactContext reactContext = (ReactContext) v.getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(v.getId(), "topChange", event);
        }
    }
}
