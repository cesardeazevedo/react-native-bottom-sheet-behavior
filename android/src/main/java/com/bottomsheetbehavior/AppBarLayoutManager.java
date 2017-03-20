package com.bottomsheetbehavior;

import android.content.Context;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;

import com.facebook.react.uimanager.LayoutShadowNode;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class AppBarLayoutManager extends ViewGroupManager<AppBarLayout> {

  private final static String REACT_CLASS = "RCTAppBarLayout";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public AppBarLayout createViewInstance(ThemedReactContext context) {
    AppBarLayout view = new AppBarLayout(context);
    int width = CoordinatorLayout.LayoutParams.MATCH_PARENT;
    int height = CoordinatorLayout.LayoutParams.MATCH_PARENT;
    CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
    params.setBehavior(new ScrollingAppBarLayoutBehavior(context.getBaseContext(), null));
    view.setLayoutParams(params);
    view.setPadding(0, (int) PixelUtil.toPixelFromDIP(24), 0, 0);
    view.setFitsSystemWindows(true);
    return view;
  }


  @ReactProp(name = "height", defaultInt = 300)
  public void setHeight(AppBarLayout view, int height) {
    CoordinatorLayout.LayoutParams params = (CoordinatorLayout.LayoutParams) view.getLayoutParams();
    params.height = (int) PixelUtil.toPixelFromDIP(height);
    view.setLayoutParams(params);
  }

  @Override
  public boolean needsCustomLayoutForChildren() {
    return true;
  }
}
