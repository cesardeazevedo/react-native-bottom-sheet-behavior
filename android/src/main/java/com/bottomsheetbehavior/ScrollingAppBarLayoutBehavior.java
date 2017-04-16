package com.bottomsheetbehavior;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ValueAnimator;
import android.content.Context;
import android.os.Build;
import android.os.Parcel;
import android.os.Parcelable;
import android.support.annotation.NonNull;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.support.v4.content.ContextCompat;
import android.support.v4.widget.NestedScrollView;
import android.util.AttributeSet;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.uimanager.ThemedReactContext;

import java.lang.ref.WeakReference;

/**
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~      http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~
 ~ https://github.com/miguelhincapie/CustomBottomSheetBehavior
 */

/**
 *
 */
public class ScrollingAppBarLayoutBehavior extends AppBarLayout.ScrollingViewBehavior {

    private static final String TAG = ScrollingAppBarLayoutBehavior.class.getSimpleName();

    private boolean mInit = false;
    private Context mContext;
    private boolean mVisible = true;
    private int mStatusBarColor;
    private int mBarStyle;
    private int mBarStyleTransparent;
    /**
     * To avoid using multiple "peekheight=" in XML and looking flexibility allowing {@link RNBottomSheetBehavior#mPeekHeight}
     * get changed dynamically we get the {@link NestedScrollView} that has
     * "app:layout_behavior=" {@link RNBottomSheetBehavior} inside the {@link CoordinatorLayout}
     */
    private WeakReference<RNBottomSheetBehavior> mBottomSheetBehaviorRef;

    private ValueAnimator mAppBarYValueAnimator;

    public ScrollingAppBarLayoutBehavior(Context context, AttributeSet attrs) {
        super(context, attrs);
        mContext = context;
    }

    @Override
    public boolean layoutDependsOn(CoordinatorLayout parent, View child, View dependency) {
        if (dependency instanceof NestedScrollView) {
            try {
                RNBottomSheetBehavior.from(dependency);
                return true;
            }
            catch (IllegalArgumentException e){}
        }
        return false;
    }

    @Override
    public boolean onDependentViewChanged(CoordinatorLayout parent, View child, View dependency) {
        if (!mInit) {
            return init(parent, child, dependency);
        }
        if (mBottomSheetBehaviorRef == null || mBottomSheetBehaviorRef.get() == null)
            getBottomSheetBehavior(parent);
        setAppBarVisible((AppBarLayout)child,dependency.getY() >= dependency.getHeight() - mBottomSheetBehaviorRef.get().getPeekHeight());
        return true;
    }

    @Override
    public Parcelable onSaveInstanceState(CoordinatorLayout parent, View child) {
        return new SavedState(super.onSaveInstanceState(parent, child), mVisible);
    }

    @Override
    public void onRestoreInstanceState(CoordinatorLayout parent, View child, Parcelable state) {
        SavedState ss = (SavedState) state;
        super.onRestoreInstanceState(parent, child, ss.getSuperState());
        this.mVisible = ss.mVisible;
    }

    private boolean init(CoordinatorLayout parent, View child, View dependency) {
        /**
         * First we need to know if dependency view is upper or lower compared with
         * {@link BottomSheetBehaviorGoogleMapsLike#getPeekHeight()} Y position to know if need to show the AppBar at beginning.
         */
        getBottomSheetBehavior(parent);
        if (mBottomSheetBehaviorRef == null || mBottomSheetBehaviorRef.get() == null)
            getBottomSheetBehavior(parent);
        int mCollapsedY = dependency.getHeight() - mBottomSheetBehaviorRef.get().getPeekHeight();
        mVisible = (dependency.getY() >= mCollapsedY);

        setStatusBarBackgroundVisible(mVisible);
        if(!mVisible) child.setY((int) child.getY() - child.getHeight() - getStatusBarHeight());
        mInit = true;
        /**
         * Following {@link #onDependentViewChanged} docs, we need to return true if the
         * Behavior changed the child view's size or position, false otherwise.
         * In our case we only move it if mVisible got false in this method.
         */
        return !mVisible;
    }

    public void setAppBarVisible(final AppBarLayout appBarLayout, final boolean visible){

        if(visible == mVisible)
            return;

        if(mAppBarYValueAnimator == null || !mAppBarYValueAnimator.isRunning()){

            mAppBarYValueAnimator = ValueAnimator.ofFloat(
                    (int) appBarLayout.getY(),
                    visible ? (int) appBarLayout.getY() + appBarLayout.getHeight() + getStatusBarHeight() :
                            (int) appBarLayout.getY() - appBarLayout.getHeight() - getStatusBarHeight());
            mAppBarYValueAnimator.setDuration(mContext.getResources().getInteger(android.R.integer.config_shortAnimTime));
            mAppBarYValueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener() {
                @Override
                public void onAnimationUpdate(ValueAnimator animation) {
                    appBarLayout.setY((Float) animation.getAnimatedValue());

                }
            });
            mAppBarYValueAnimator.addListener(new AnimatorListenerAdapter() {

                @Override
                public void onAnimationStart(Animator animation) {
                    super.onAnimationStart(animation);
                    if(visible)
                        setStatusBarBackgroundVisible(true);
                }

                @Override
                public void onAnimationEnd(Animator animation) {
                    if(!visible)
                        setStatusBarBackgroundVisible(false);
                    mVisible = visible;
                    super.onAnimationEnd(animation);
                }
            });
            mAppBarYValueAnimator.start();
        }
    }

    private int getStatusBarHeight() {
        int result = 0;
        int resourceId = mContext.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = mContext.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }

    public void setStatusBarColor(int color) {
        mStatusBarColor = color;
    }

    public void setBarStyle(int barStyle) {
        mBarStyle = barStyle;
    }

    public void setBarStyleTransparent(int barStyle) {
        mBarStyleTransparent = barStyle;
    }

    private void setStatusBarBackgroundVisible(boolean visible){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP && mStatusBarColor != 0){
            if(visible){
                Window window = ((ThemedReactContext) mContext).getCurrentActivity().getWindow();
                window.getDecorView().setSystemUiVisibility(mBarStyle);
                window.setStatusBarColor(mStatusBarColor);
            }else {
                Window window = ((ThemedReactContext) mContext).getCurrentActivity().getWindow();
                window.getDecorView().setSystemUiVisibility(mBarStyleTransparent);
                window.setStatusBarColor(ContextCompat.getColor(mContext, android.R.color.transparent));
            }
        }
    }

    /**
     * Look into the CoordiantorLayout for the {@link RNBottomSheetBehavior}
     * @param coordinatorLayout with app:layout_behavior= {@link RNBottomSheetBehavior}
     */
    private void getBottomSheetBehavior(@NonNull CoordinatorLayout coordinatorLayout) {

        for (int i = 0; i < coordinatorLayout.getChildCount(); i++) {
            View child = coordinatorLayout.getChildAt(i);

            if (child instanceof NestedScrollView) {

                try {
                    RNBottomSheetBehavior temp = RNBottomSheetBehavior.from(child);
                    mBottomSheetBehaviorRef = new WeakReference<>(temp);
                    break;
                }
                catch (IllegalArgumentException e){}
            }
        }
    }

    protected static class SavedState extends View.BaseSavedState {

        final boolean mVisible;

        public SavedState(Parcel source) {
            super(source);
            mVisible = source.readByte() != 0;
        }

        public SavedState(Parcelable superState, boolean visible) {
            super(superState);
            this.mVisible = visible;
        }

        @Override
        public void writeToParcel(Parcel out, int flags) {
            super.writeToParcel(out, flags);
            out.writeByte((byte) (mVisible ? 1 : 0));
        }

        public static final Parcelable.Creator<SavedState> CREATOR =
                new Parcelable.Creator<SavedState>() {
                    @Override
                    public SavedState createFromParcel(Parcel source) {
                        return new SavedState(source);
                    }

                    @Override
                    public SavedState[] newArray(int size) {
                        return new SavedState[size];
                    }
                };
    }

    public static <V extends View> ScrollingAppBarLayoutBehavior from(V view) {
        ViewGroup.LayoutParams params = view.getLayoutParams();
        if (!(params instanceof CoordinatorLayout.LayoutParams)) {
            throw new IllegalArgumentException("The view is not a child of CoordinatorLayout");
        }
        CoordinatorLayout.Behavior behavior = ((CoordinatorLayout.LayoutParams) params)
                .getBehavior();
        if (!(behavior instanceof ScrollingAppBarLayoutBehavior)) {
            throw new IllegalArgumentException("The view is not associated with " +
                    "MergedAppBarLayoutBehavior");
        }
        return (ScrollingAppBarLayoutBehavior) behavior;
    }
}
