package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.BottomSheetBehavior;
import android.support.design.widget.CoordinatorLayout;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.facebook.react.views.view.ReactViewGroup;

public class BottomSheetBehaviorView extends RelativeLayout {

    public BottomSheetBehaviorView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.WRAP_CONTENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;
        // int height = 1000; // fixed a height works, it only slide up half of the screen

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        params.setBehavior(new BottomSheetBehavior());
        this.setLayoutParams(params);

        BottomSheetBehavior<BottomSheetBehaviorView> bottomSheetBehavior = BottomSheetBehavior.from(this);
        bottomSheetBehavior.setHideable(false);
        bottomSheetBehavior.setPeekHeight(200);
    }
}
