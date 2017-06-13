package com.bottomsheetbehavior;

import android.graphics.Color;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;
import javax.annotation.Nullable;

public class FloatingActionButtonManager extends SimpleViewManager<FloatingActionButtonView> {

    private final static String REACT_CLASS = "BSBFloatingActionButtonAndroid";

    private final static int COMMAND_SET_ANCHOR_ID = 1;
    private final static int COMMAND_SHOW = 2;
    private final static int COMMAND_HIDE = 3;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public FloatingActionButtonView createViewInstance(ThemedReactContext reactContext) {
        FloatingActionButtonView view = new FloatingActionButtonView(reactContext);
        view.setOnClickListener(new FloatingActionButtonListener());
        return view;
    }

    @Override
    public LayoutShadowNode createShadowNodeInstance() {
        return new FloatingActionButtonShadowNode();
    }

    @Override
    public Class getShadowNodeClass() {
        return FloatingActionButtonShadowNode.class;
    }

    @ReactProp(name = "src")
    public void setSrc(FloatingActionButtonView view, String src) {
        view.setSrc(src);
    }

    @ReactProp(name = "icon")
    public void setIcon(FloatingActionButtonView view, String uri) {
        view.setIcon(uri);
    }

    @ReactProp(name = "iconColor")
    public void setIconColor(FloatingActionButtonView view, String color) {
        view.setIconColorDefault(Color.parseColor(color));
        toggleFab(view);
    }

    @ReactProp(name = "iconColorExpanded")
    public void setIconColorExpanded(FloatingActionButtonView view, String color) {
        view.setIconColorExpanded(Color.parseColor(color));
        toggleFab(view);
    }

    @ReactProp(name = "backgroundColor")
    public void setBackground(FloatingActionButtonView view, String background) {
        int color = Color.parseColor(background);
        view.setBackgroundDefault(color);
        view.setBackground(color);
        toggleFab(view);
    }

    @ReactProp(name = "backgroundColorExpanded")
    public void setBackgroundExpanded(FloatingActionButtonView view, String background) {
        view.setBackgroundExpanded(Color.parseColor(background));
        toggleFab(view);
    }

    @ReactProp(name = "hidden", defaultBoolean = false)
    public void setHidden(FloatingActionButtonView view, boolean hidden) {
        view.setHidden(hidden);
    }

    @ReactProp(name = "rippleEffect", defaultBoolean = true)
    public void setRippleEffect(FloatingActionButtonView view, boolean rippleEffect) {
        view.setRippleEffect(rippleEffect);
    }

    @ReactProp(name = "rippleColor")
    public void setRippleColor(FloatingActionButtonView view, String rippleColor) {
        view.setRippleColor(rippleColor);
    }

    @ReactProp(name = "elevation", defaultFloat = 18)
    public void setElevation(FloatingActionButtonView view, float elevation) {
        view.setFabElevation(elevation);
    }

    @ReactProp(name = "autoAnchor")
    public void setAutoAnchor(FloatingActionButtonView view, boolean autoAnchor) {
        view.setAutoAnchor(autoAnchor);
    }

    private void toggleFab(FloatingActionButtonView view) {
        BottomSheetHeaderView header = view.getHeader();
        if (header != null) {
            header.toggleFab(header.getToggled());
        }
    }

    @Override
    public Map<String,Integer> getCommandsMap() {
        return MapBuilder.of(
                "setAnchorId", COMMAND_SET_ANCHOR_ID,
                "show", COMMAND_SHOW,
                "hide", COMMAND_HIDE
        );
    }

    @Override
    public void receiveCommand(FloatingActionButtonView view, int commandType, @Nullable ReadableArray args) {
        switch (commandType) {
            case COMMAND_SET_ANCHOR_ID:
                int bottomSheetId = args.getInt(0);
                view.setAnchor(bottomSheetId);
                break;
            case COMMAND_SHOW:
                view.showFab();
                break;
            case COMMAND_HIDE:
                view.hideFab();
                break;
        }
    }

    public class FloatingActionButtonListener implements View.OnClickListener {

        @Override
        public void onClick(View v) {
            WritableMap event = Arguments.createMap();
            ReactContext reactContext = (ReactContext) v.getContext();
            reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(v.getId(), "topChange", event);
        }
    }
}
