package com.bottomsheetbehavior;

import android.content.Context;
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

    private boolean mToggled;

    public BottomSheetHeaderView(Context context) {
        super(context);
        setTag(TAG);
        mTextViews = new ArrayList<ReactTextView>();
    }

    public void registerFields() {
        registerChilds(this);
    }

    public void setFabView(FloatingActionButtonView fabView) {
        mFabView = fabView;
        mFabView.setHeader(this);
        toggleFab(mToggled);
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

    public boolean getToggled() {
        return mToggled;
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

    public void toggle(boolean toggle) {
        if (mToggled != toggle) {
            mToggled = toggle;
            toggleFab(toggle);
            toggleTextViews(toggle);
            toggleBackground(toggle);
        }
    }

    public void toggleBackground(boolean toggle) {
        setBackgroundColor(toggle ? mBackgroundColorExpanded : mBackgroundColorDefault);
    }

    public void toggleFab(boolean toggle) {
        if (mFabView != null) {
            if (toggle) {
                mFabView.setIconColor(mFabView.getIconColorExpanded());
                mFabView.setBackground(mFabView.getBackgroundExpanded());
            } else {
                mFabView.setIconColor(mFabView.getIconColorDefault());
                mFabView.setBackground(mFabView.getBackgroundDefault());
            }
        }
    }

    public void toggleTextViews(boolean toggle) {
        for (int i = 0; i < mTextViews.size(); i++) {
            ReactTextView textView = mTextViews.get(i);
            textView.setTextColor(toggle ? mTextColorExpanded : textView.getHighlightColor());
        }
    }
}
