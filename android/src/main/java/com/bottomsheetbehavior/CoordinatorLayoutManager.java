package com.bottomsheetbehavior;

import android.support.design.widget.CoordinatorLayout;
import android.view.View;

import com.facebook.react.uimanager.ViewGroupManager;
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
            FloatingActionButtonView fab = (FloatingActionButtonView) child;
            if (fab.getAutoAnchor()) {
                for (int i = 0; i < parent.getChildCount(); i++) {
                    View childView = parent.getChildAt(i);
                    if (childView instanceof BottomSheetBehaviorView) {
                        int bottomSheetId = childView.getId();
                        fab.setAnchor(bottomSheetId);
                    } else if (childView instanceof AnchorSheetBehaviorView) {
                        int bottomSheetId = childView.getId();
                        fab.setScrollBehavior();
                        fab.setAnchor(bottomSheetId);
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
