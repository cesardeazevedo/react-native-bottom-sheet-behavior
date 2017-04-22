package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.CoordinatorLayout;
import android.support.v4.widget.NestedScrollView;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewOutlineProvider;

import com.facebook.react.uimanager.PixelUtil;

public class BottomSheetBehaviorView extends NestedScrollView {

    public RNBottomSheetBehavior behavior;

    private final static int DEFAULT_PEEK_HEIGHT = 50;
    private final static int DEFAULT_ANCHOR_POINT = 300;

    public BottomSheetBehaviorView(Context context) {
        super(context);

        int width  = ViewGroup.LayoutParams.WRAP_CONTENT;
        int height = ViewGroup.LayoutParams.WRAP_CONTENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        params.setBehavior(new RNBottomSheetBehavior(context));

        this.setLayoutParams(params);

        behavior = RNBottomSheetBehavior.from(this);
        behavior.setPeekHeight((int) PixelUtil.toPixelFromDIP(DEFAULT_PEEK_HEIGHT));
        behavior.setAnchorPoint((int) PixelUtil.toPixelFromDIP(DEFAULT_ANCHOR_POINT));
        behavior.setAnchorEnabled(false);
    }

    public void setState(int state) {
        behavior.setState(state);
        if (state == RNBottomSheetBehavior.STATE_COLLAPSED ||
            state == RNBottomSheetBehavior.STATE_ANCHOR_POINT) {
            resetScroll();
        }
    }

    public void setPeekHeight(int peekHeight) {
        int peekHeightPixel = (int) PixelUtil.toPixelFromDIP(peekHeight);
        behavior.setPeekHeight(peekHeightPixel);
    }

    public void setHideable(boolean hideable) {
        behavior.setHideable(hideable);
    }

    public void setAnchorEnabled(boolean anchorEnabled) {
        behavior.setAnchorEnabled(anchorEnabled);
    }

    public void setAnchorPoint(int anchorPoint) {
        int anchorPointPixel = (int) PixelUtil.toPixelFromDIP(anchorPoint);
        behavior.setAnchorPoint(anchorPointPixel);
    }

    public void setBottomSheetElevation(float elevation) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.setElevation(elevation);
            this.setOutlineProvider(ViewOutlineProvider.BOUNDS);
        }
    }

    private void resetScroll() {
        fullScroll(FOCUS_UP);
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        if (!behavior.getAnchorEnabled()) {
            View child = this.getChildAt(0);
            if (child != null) {
                setMeasuredDimension(widthMeasureSpec, child.getHeight());
            }
        } else {
            setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
        }
    }

    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
    }
}
