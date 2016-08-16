package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.BottomSheetBehavior;
import android.support.design.widget.CoordinatorLayout;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

public class BottomSheetBehaviorView extends RelativeLayout {

    public BottomSheetBehaviorView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.WRAP_CONTENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        params.setBehavior(new BottomSheetBehavior());
        this.setLayoutParams(params);

        BottomSheetBehavior<BottomSheetBehaviorView> bottomSheetBehavior = BottomSheetBehavior.from(this);
        bottomSheetBehavior.setHideable(false);
        bottomSheetBehavior.setPeekHeight(90);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        View child = this.getChildAt(0);

        if (child != null) {
            setMeasuredDimension(widthMeasureSpec, child.getHeight());
        }
    }
}
