package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.CoordinatorLayout;
import android.view.ViewGroup;

public class CoordinatorLayoutView extends CoordinatorLayout {

    public CoordinatorLayoutView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.MATCH_PARENT;
        int height = ViewGroup.LayoutParams.MATCH_PARENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        this.setLayoutParams(params);
        this.setFitsSystemWindows(false);
    }

    private final Runnable measureAndLayout = new Runnable() {
        @Override
        public void run() {
            measure(
                    MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
                    MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    };

    @Override
    public void requestLayout() {
        super.requestLayout();
        post(measureAndLayout);
    }
}
