package com.bottomsheetbehavior;

import android.support.design.widget.CoordinatorLayout;
import android.support.v4.widget.NestedScrollView;
import android.view.ViewOutlineProvider;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.PixelUtil;

public class AnchorSheetBehaviorView extends NestedScrollView {

  private final static int DEFAULT_PEEK_HEIGHT = 50;

  private final static int DEFAULT_ANCHOR_POINT = 300;

  public AnchorSheetBehavior bottomSheetBehavior;

  public AnchorSheetBehaviorView(ReactContext context) {
    super(context);

    int width  = CoordinatorLayout.LayoutParams.MATCH_PARENT;
    int height = CoordinatorLayout.LayoutParams.MATCH_PARENT;

    CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
    params.setBehavior(new AnchorSheetBehavior(context, null));
    this.setLayoutParams(params);

    bottomSheetBehavior = AnchorSheetBehavior.from(this);
    bottomSheetBehavior.setPeekHeight((int) PixelUtil.toPixelFromDIP(DEFAULT_PEEK_HEIGHT));
    bottomSheetBehavior.setAnchorPoint((int) PixelUtil.toPixelFromDIP(DEFAULT_ANCHOR_POINT));
  }

  public void setState(int state) {
      bottomSheetBehavior.setState(state);
  }

  public void setPeekHeight(int peekHeight) {
      int peekHeightPixel = (int) PixelUtil.toPixelFromDIP(peekHeight);
      bottomSheetBehavior.setPeekHeight(peekHeightPixel);
  }

    public void setAnchorPoint(int anchorPoint) {
        int anchorPointPixel = (int) PixelUtil.toPixelFromDIP(anchorPoint);
        bottomSheetBehavior.setAnchorPoint(anchorPointPixel);
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
      setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
  }
}
