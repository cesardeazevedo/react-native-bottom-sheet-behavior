package com.bottomsheetbehavior;

import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.FloatingActionButton;
import android.view.Gravity;
import android.view.MotionEvent;

import com.facebook.react.uimanager.PixelUtil;

import java.net.URL;

public class FloatingActionButtonView extends FloatingActionButton {

    private boolean autoAnchor;

    private Drawable icon;
    private BottomSheetHeaderView headerView;

    private int mIconColorDefault;
    private int mIconColorExpanded;

    private int mBackgroundDefault;
    private int mBackgroundExpanded;

    public FloatingActionButtonView(Context context) {
        super(context);

        int width  = CoordinatorLayout.LayoutParams.WRAP_CONTENT;
        int height = CoordinatorLayout.LayoutParams.WRAP_CONTENT;

        CoordinatorLayout.LayoutParams params = new CoordinatorLayout.LayoutParams(width, height);
        int margin = (int) PixelUtil.toPixelFromDIP(16);

        params.setMargins(margin, margin, margin, margin);
        params.anchorGravity = Gravity.TOP | Gravity.RIGHT | Gravity.END;

        this.setLayoutParams(params);
    }

    public void setSrc(String src) {
        icon = ResourceDrawableIdHelper.getInstance().getResourceDrawable(this.getContext(), src);
        this.setImageDrawable(icon);
    }

    public void setIcon(String path) {
        try {
            URL url = new URL(path);
            Bitmap bitmap = BitmapFactory.decodeStream(url.openStream());
            icon = new BitmapDrawable(this.getResources(), bitmap);
            this.setImageDrawable(icon);
            this.requestLayout();
        } catch (Exception e) {
        }
    }

    public int getIconColorDefault() {
        return mIconColorDefault;
    }

    public void setIconColorDefault(int color) {
        mIconColorDefault = color;
    }

    public int getIconColorExpanded() {
        return mIconColorExpanded;
    }

    public void setIconColorExpanded(int color) {
        mIconColorExpanded = color;
    }

    public void setIconColor(int color) {
        try {
            if (icon != null && android.os.Build.VERSION.SDK_INT >= 21) {
                icon.mutate().setTint(color);
            }
        } catch (Exception ex) {
        }
    }

    public int getBackgroundDefault() {
        return mBackgroundDefault;
    }

    public void setBackgroundDefault(int color) {
        mBackgroundDefault = color;
    }

    public void setBackground(int color) {
        try {
            this.setBackgroundTintList(ColorStateList.valueOf(color));
        } catch (Exception e) {
        }
    }

    public int getBackgroundExpanded() {
        return mBackgroundExpanded;
    }

    public void setBackgroundExpanded(int color) {
        mBackgroundExpanded = color;
    }

    public void setHidden(boolean hidden) {
        if (hidden) {
            this.hideFab();
        } else {
            this.showFab();
        }
    }

    public void setRippleEffect(boolean rippleEffect) {
        this.setClickable(rippleEffect);
    }

    public void setRippleColor(String rippleColor) {
        this.setRippleColor(Color.parseColor(rippleColor));
    }

    public void setFabElevation(float elevation) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.setElevation(elevation);
        }
    }

    public void showFab() {
        this.show();
    }

    public void hideFab() {
        this.hide();
    }

    public boolean getAutoAnchor() {
        return autoAnchor;
    }

    public void setAutoAnchor(boolean anchor) {
       autoAnchor = anchor;
    }

    public BottomSheetHeaderView getHeader() {
        return headerView;
    }

    public void setHeader(BottomSheetHeaderView header) {
        headerView = header;
    }

    public void setAnchor(int id) {
        ((CoordinatorLayout.LayoutParams) this.getLayoutParams()).setAnchorId(id);
        post(new Runnable() {
            @Override
            public void run() {
                requestLayout();
            }
        });
    }

    public void setScrollBehavior() {
        CoordinatorLayout.LayoutParams params =
                (CoordinatorLayout.LayoutParams) this.getLayoutParams();
        params.setBehavior(new ScrollAwareFABBehavior(this.getContext(), null));
    }

    /**
     * Fixes FAB remains pressed when pointer leaves the view bounds
     * https://code.google.com/p/android/issues/detail?id=218956
     */
    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        boolean result = super.onTouchEvent(ev);
        if (!result) {
            if (ev.getAction() == MotionEvent.ACTION_UP) {
                cancelLongPress();
            }
            setPressed(false);
        }
        return result;
    }
}
