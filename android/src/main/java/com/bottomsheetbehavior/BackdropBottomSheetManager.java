package com.bottomsheetbehavior;

import android.support.design.widget.CoordinatorLayout;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class BackdropBottomSheetManager extends ViewGroupManager<RelativeLayout> {

    private final static String REACT_CLASS = "BSBBackdropBottomSheet";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public RelativeLayout createViewInstance(ThemedReactContext context) {
        RelativeLayout view = new RelativeLayout(context);
        int width  = CoordinatorLayout.LayoutParams.MATCH_PARENT;
        int height = CoordinatorLayout.LayoutParams.MATCH_PARENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        params.setBehavior(new BackdropBottomSheetBehavior(context, null));
        view.setLayoutParams(params);
        return view;
    }

    @ReactProp(name = "height", defaultInt = 300)
    public void setHeight(RelativeLayout view, int height) {
        CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) view.getLayoutParams();
        params.height = (int) PixelUtil.toPixelFromDIP(height);
        view.setLayoutParams(params);
    }
}
