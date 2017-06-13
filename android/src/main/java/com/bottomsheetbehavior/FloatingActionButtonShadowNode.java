package com.bottomsheetbehavior;

import android.view.View;
import android.view.ViewGroup;
import com.facebook.yoga.YogaMeasureMode;
import com.facebook.yoga.YogaNode;
import com.facebook.yoga.YogaMeasureOutput;
import com.facebook.yoga.YogaMeasureFunction;
import com.facebook.react.uimanager.LayoutShadowNode;

public class FloatingActionButtonShadowNode extends LayoutShadowNode implements YogaMeasureFunction {
    private int mWidth;
    private int mHeight;
    private boolean mMeasured;

    public FloatingActionButtonShadowNode() {
        setMeasureFunction(this);
    }

    @Override
    public long measure(YogaNode node, float width, YogaMeasureMode widthMode, float height, YogaMeasureMode heightMode) {
        if(!mMeasured) {
            FloatingActionButtonView nodeView = new FloatingActionButtonView(getThemedContext());
            final int spec = View.MeasureSpec.makeMeasureSpec(
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    View.MeasureSpec.UNSPECIFIED);
            nodeView.measure(spec, spec);
            mWidth = nodeView.getMeasuredWidth();
            mHeight = nodeView.getMeasuredHeight();
            mMeasured = true;
        }

        return YogaMeasureOutput.make(mWidth, mHeight);
    }
}
