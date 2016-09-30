package com.bottomsheetbehavior;

import android.view.View;
import android.view.ViewGroup;
import com.facebook.csslayout.CSSMeasureMode;
import com.facebook.csslayout.CSSNodeAPI;
import com.facebook.csslayout.MeasureOutput;
import com.facebook.react.uimanager.LayoutShadowNode;

public class FloatingActionButtonShadowNode extends LayoutShadowNode implements CSSNodeAPI.MeasureFunction {
    private int mWidth;
    private int mHeight;
    private boolean mMeasured;

    public FloatingActionButtonShadowNode() {
        setMeasureFunction(this);
    }

    @Override
    public void measure(CSSNodeAPI node, float width, CSSMeasureMode widthMode, float height, CSSMeasureMode heightMode, MeasureOutput measureOutput) {
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

        measureOutput.width  = mWidth;
        measureOutput.height = mHeight;
    }
}
