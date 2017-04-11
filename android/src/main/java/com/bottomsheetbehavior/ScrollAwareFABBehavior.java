package com.bottomsheetbehavior;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.design.widget.AppBarLayout;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.view.ViewCompat;
import android.support.v4.widget.NestedScrollView;
import android.util.AttributeSet;
import android.view.View;

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
 * This class only cares about hide or unhide the FAB because the anchor behavior is something
 * already in FAB.
 */
public class ScrollAwareFABBehavior extends FloatingActionButton.Behavior {

    /**
     * One of the point used to set hide() or show() in FAB
     */
    private float offset;
    /**
     * The FAB should be hidden when it reach {@link #offset} or when {@link RNBottomSheetBehavior}
     * is visually lower than {@link RNBottomSheetBehavior#getPeekHeight()}.
     * We got a reference to the object to allow change dynamically PeekHeight in BottomSheet and
     * got updated here.
     */
    private WeakReference<RNBottomSheetBehavior> mBottomSheetBehaviorRef;

    public ScrollAwareFABBehavior(Context context, AttributeSet attrs) {
        super();
        offset = 0;
        mBottomSheetBehaviorRef = null;
    }

    @Override
    public boolean onStartNestedScroll(final CoordinatorLayout coordinatorLayout, final FloatingActionButton child,
                                       final View directTargetChild, final View target, final int nestedScrollAxes) {
//         Ensure we react to vertical scrolling
        return nestedScrollAxes == ViewCompat.SCROLL_AXIS_VERTICAL;
    }

    @Override
    public boolean layoutDependsOn(CoordinatorLayout parent, FloatingActionButton child, View dependency) {
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
    public boolean onDependentViewChanged(CoordinatorLayout parent, FloatingActionButton child, View dependency) {
        /**
         * Because we are not moving it, we always return false in this method.
         */

        if (offset == 0)
            setOffsetValue(parent);

        if (mBottomSheetBehaviorRef == null)
            getBottomSheetBehavior(parent);

        int DyFix = getDyBetweenChildAndDependency(child, dependency);

        if ((child.getY() + DyFix) < offset)
            child.hide();
        else if ((child.getY() + DyFix) >= offset) {

            /**
             * We are calculating every time point in Y where BottomSheet get {@link BottomSheetBehaviorGoogleMapsLike#STATE_COLLAPSED}.
             * If PeekHeight change dynamically we can reflect the behavior asap.
             */
            if (mBottomSheetBehaviorRef == null || mBottomSheetBehaviorRef.get() == null)
                getBottomSheetBehavior(parent);
            int collapsedY = dependency.getHeight() - mBottomSheetBehaviorRef.get().getPeekHeight();

            if ((child.getY() + DyFix) > collapsedY)
                child.hide();
            else
                child.show();
        }

        return false;
    }

    /**
     * In some <bold>WEIRD</bold> cases, mostly when you perform a little scroll but a fast one
     * the {@link #onDependentViewChanged(CoordinatorLayout, FloatingActionButton, View)} DOESN'T
     * reflect the real Y position of child mean the dependency get a better APROXIMATION of the real
     * Y. This was causing that FAB some times doesn't get unhidden.
     * @param child the FAB
     * @param dependency NestedScrollView instance
     * @return Dy betweens those 2 elements in Y, minus child's height/2
     */
    private int getDyBetweenChildAndDependency(@NonNull FloatingActionButton child, @NonNull View dependency) {
        if (dependency.getY() == 0 || dependency.getY() < offset)
            return 0;

        if ( (dependency.getY() - child.getY()) > child.getHeight() )
            return Math.max(0, (int) ((dependency.getY() - (child.getHeight()/2)) - child.getY()) );
        else
            return 0;
    }

    /**
     * Define one of the point in where the FAB should be hide when it reachs that point.
     * @param coordinatorLayout container of BottomSheet and AppBarLayout
     */
    private void setOffsetValue(CoordinatorLayout coordinatorLayout) {

        for (int i = 0; i < coordinatorLayout.getChildCount(); i++) {
            View child = coordinatorLayout.getChildAt(i);

            if (child instanceof AppBarLayout) {

                if (child.getTag() != null &&
                        child.getTag().toString().contentEquals("modal-appbar") ) {
                    offset = child.getY()+child.getHeight();
                    break;
                }
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
}
