package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.CoordinatorLayout;
import android.view.ViewGroup;

import com.facebook.react.views.view.ReactViewGroup;

public class CoordinatorLayoutView extends CoordinatorLayout {

    public CoordinatorLayoutView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.MATCH_PARENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        this.setLayoutParams(params);
        this.setFitsSystemWindows(false);
    }
}
