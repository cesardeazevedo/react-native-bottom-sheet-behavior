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

import com.facebook.react.uimanager.PixelUtil;

import java.net.URL;

public class FloatingActionButtonView extends FloatingActionButton {

    Drawable icon;

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

    public void setIconColor(String color) {
        try {
            if (icon != null && android.os.Build.VERSION.SDK_INT >= 21) {
                icon.mutate().setTint(Color.parseColor(color));
            }
        } catch (Exception ex) {
        }
    }

    public void setBackground(String color) {
        try {
            this.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(color)));
        } catch (Exception e) {
        }
    }

    public void setHidden(boolean hidden) {
        this.setHidden(hidden);
    }

    public void setRippleEffect(boolean rippleEffect) {
        this.setClickable(rippleEffect);
    }

    public void setFabElevation(float elevation) {
        if (android.os.Build.VERSION.SDK_INT >= 21) {
            this.setElevation(elevation);
        }
    }

    public void setAnchor(int id) {
        ((CoordinatorLayout.LayoutParams) this.getLayoutParams()).setAnchorId(id);
    }
}
