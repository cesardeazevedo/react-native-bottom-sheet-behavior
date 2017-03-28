package com.bottomsheetbehavior;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.View;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.facebook.react.views.text.ReactTextView;

import java.util.ArrayList;
import java.util.List;

public class BottomSheetHeaderView extends RelativeLayout {

    public final static String TAG = "BottomSheetHeader";

    private int mBackgroundColorDefault;
    private int mBackgroundColorExpanded;

    private int mTextColorExpanded;

    private List<ReactTextView> mTextViews;

    private FloatingActionButtonView mFabView;
    private AnchorSheetBehaviorView mAnchorSheetView;

    private boolean mActivated;

    public BottomSheetHeaderView(Context context) {
        super(context);
        setTag(TAG);
        mTextViews = new ArrayList<ReactTextView>();
    }

    public void setAnchorSheetView(AnchorSheetBehaviorView anchorSheetView) {
        mAnchorSheetView = anchorSheetView;
        mAnchorSheetView.bottomSheetBehavior.setHeader(this);
        registerChilds(this);
        mActivated = mAnchorSheetView.bottomSheetBehavior.getState() == AnchorSheetBehavior.STATE_COLLAPSED;
        toggle(false);
    }

    public void setFabView(FloatingActionButtonView fabView) {
        mFabView = fabView;
    }

    public void setBackgroundColorDefault(int color) {
        mBackgroundColorDefault = color;
        setBackgroundColor(color);
    }

    public void setBackgroundColorExpanded(int color) {
        mBackgroundColorExpanded = color;
    }

    public void setTextColorExpanded(int color) {
        mTextColorExpanded = color;
    }

    /**
     * Register all ReactTextView childs
     * @param view
     */
    private void registerChilds(BottomSheetHeaderView view) {
        List<View> result = getAllChildren(view);
        for (int i = 0; i < result.size(); i++) {
            View v = result.get(i);
            if (v instanceof ReactTextView) {
                ReactTextView textView = (ReactTextView) v;
                mTextViews.add(textView);
            }
        }
    }

    /**
     * Find all childs recursevly
     * @param v
     * @return List of all childs that doesn't is a instance of ViewGroup
     */
    private List<View> getAllChildren(View v) {
        if (!(v instanceof ViewGroup)) {
            ArrayList<View> viewArrayList = new ArrayList<View>();
            viewArrayList.add(v);
            return viewArrayList;
        }

        ArrayList<View> result = new ArrayList<View>();

        ViewGroup viewGroup = (ViewGroup) v;
        for (int i = 0; i < viewGroup.getChildCount(); i++) {
            View child = viewGroup.getChildAt(i);
            result.addAll(getAllChildren(child));
        }
        return result;
    }

    public void toggle(boolean activate) {
        if (mActivated != activate) {
            mActivated = activate;
            toggleFab(activate);
            toggleTextViews(activate);
            toggleBackground(activate);
        }
    }

    private void toggleBackground(boolean activate) {
        setBackgroundColor(activate ? mBackgroundColorExpanded : mBackgroundColorDefault);
    }

    private void toggleFab(boolean activate) {
        if (mFabView != null) {
            if (activate) {
                mFabView.setIconColor(mFabView.getIconColorExpanded());
                mFabView.setBackground(mFabView.getBackgroundExpanded());
            } else {
                mFabView.setIconColor(mFabView.getIconColorDefault());
                mFabView.setBackground(mFabView.getBackgroundDefault());
            }
        }
    }

    private void toggleTextViews(boolean activate) {
        for (int i = 0; i < mTextViews.size(); i++) {
            ReactTextView textView = mTextViews.get(i);
            textView.setTextColor(activate ? mTextColorExpanded : textView.getHighlightColor());
        }
    }
}
