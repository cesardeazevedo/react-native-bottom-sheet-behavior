package com.bottomsheetbehavior;

import android.support.design.widget.CoordinatorLayout;
import android.view.View;

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
    public void addView(CoordinatorLayoutView parent, View child, int index) {
        super.addView(parent, child, index);

        // Sets FloatingActionButton anchor automatically
        if (child instanceof FloatingActionButtonView) {
            if (((FloatingActionButtonView) child).getAutoAnchor()) {
                for (int i = 0; i < parent.getChildCount(); i++) {
                    View childView = parent.getChildAt(i);
                    if (childView instanceof BottomSheetBehaviorView) {
                        int bottomSheetId = childView.getId();
                        ((CoordinatorLayout.LayoutParams) child.getLayoutParams()).setAnchorId(bottomSheetId);
                    }
                }
            }
        }
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
