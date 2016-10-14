package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.BottomSheetBehavior;
import android.support.design.widget.CoordinatorLayout;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;
import android.widget.RelativeLayout;

import com.facebook.react.uimanager.PixelUtil;

public class BottomSheetBehaviorView extends RelativeLayout {

    private final static int DEFAULT_PEEK_HEIGHT = 50;

    public BottomSheetBehavior<BottomSheetBehaviorView> bottomSheetBehavior;

    public BottomSheetBehaviorView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.WRAP_CONTENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        params.setBehavior(new BottomSheetBehavior());

        this.setLayoutParams(params);

        bottomSheetBehavior = BottomSheetBehavior.from(this);
        bottomSheetBehavior.setPeekHeight((int) PixelUtil.toPixelFromDIP(DEFAULT_PEEK_HEIGHT));
    }

    public void setState(int state) {
        bottomSheetBehavior.setState(state);
    }

    public void setPeekHeight(int peekHeight) {
        int peekHeightPixel = (int) PixelUtil.toPixelFromDIP(peekHeight);
        bottomSheetBehavior.setPeekHeight(peekHeightPixel);
    }

    public void setHideable(boolean hideable) {
        bottomSheetBehavior.setHideable(hideable);
    }

    public void setBottomSheetElevation(float elevation) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.setElevation(elevation);
            this.setOutlineProvider(ViewOutlineProvider.BOUNDS);
        }
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
        View child = this.getChildAt(0);

        if (child != null) {
            setMeasuredDimension(widthMeasureSpec, child.getHeight());
        }
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
    }
}
