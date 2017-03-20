package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.CoordinatorLayout;
import android.widget.RelativeLayout;

public class BackdropBottomSheetView extends RelativeLayout {
  public BackdropBottomSheetView(Context context) {
    super(context);

    int width  = CoordinatorLayout.LayoutParams.MATCH_PARENT;
    int height = CoordinatorLayout.LayoutParams.MATCH_PARENT;

    CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
    params.setBehavior(new BackdropBottomSheetBehavior(context, null));
    this.setLayoutParams(params);
  }

  public void setHeight(int height) {
    CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) this.getLayoutParams();
    params.height = height;
    this.setLayoutParams(params);
  }
}