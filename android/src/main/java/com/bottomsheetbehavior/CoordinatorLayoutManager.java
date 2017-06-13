package com.bottomsheetbehavior;

import android.support.design.widget.CoordinatorLayout;
import android.view.View;

import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class CoordinatorLayoutManager extends ViewGroupManager<CoordinatorLayoutView> {

    private final static String REACT_CLASS = "BSBCoordinatorLayoutAndroid";

    private BottomSheetHeaderView headerView;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public CoordinatorLayoutView createViewInstance(ThemedReactContext context) {
        return new CoordinatorLayoutView(context);
    }

    /**
     * Find and sets the BottomSheetHeader to manage colors
     * @param child
     */
    private void setBottomSheetHeader(View child) {
        if (child instanceof BottomSheetBehaviorView) {
            View view = child.findViewWithTag(BottomSheetHeaderView.TAG);
            if (view != null && view instanceof BottomSheetHeaderView) {
                BottomSheetBehaviorView b = (BottomSheetBehaviorView) child;
                RNBottomSheetBehavior behavior = b.behavior;
                headerView = (BottomSheetHeaderView) view;
                headerView.registerFields();
                headerView.toggle(behavior.getState() == RNBottomSheetBehavior.STATE_COLLAPSED);
                behavior.setHeader(headerView);
            }
        }
    }

    /**
     * Find and sets the FloatingActionButton anchor automatically
     * @param parent CoordinatorLayout parent view
     * @param child Child view from addView
     */
    private void setFabAnchor(CoordinatorLayout parent, View child) {
        if (child instanceof FloatingActionButtonView) {
            FloatingActionButtonView fab = (FloatingActionButtonView) child;
            if (fab.getAutoAnchor()) {
                for (int i = 0; i < parent.getChildCount(); i++) {
                    View childView = parent.getChildAt(i);
                    if (childView instanceof BottomSheetBehaviorView) {
                        int bottomSheetId = childView.getId();
                        fab.setAnchor(bottomSheetId);
                        if (((BottomSheetBehaviorView) childView).behavior.getAnchorEnabled()) {
                            fab.setScrollBehavior();
                        }
                        fab.setAnchor(bottomSheetId);
                    }
                }
            }
            // Set fab on the header view
            if (headerView != null) {
                headerView.setFabView(fab);
            }
        }
    }

    @Override
    public void addView(CoordinatorLayoutView parent, View child, int index) {
        super.addView(parent, child, index);

        setBottomSheetHeader(child);
        setFabAnchor(parent, child);
    }

    @Override
    public boolean needsCustomLayoutForChildren() {
        return true;
    }
}
