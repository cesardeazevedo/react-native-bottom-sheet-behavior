package com.bottomsheetbehavior;

import android.view.View;
import android.view.ViewGroup;

import com.facebook.csslayout.CSSNode;
import com.facebook.csslayout.MeasureOutput;
import com.facebook.csslayout.CSSMeasureMode;
import com.facebook.react.uimanager.LayoutShadowNode;

public class BottomSheetBehaviorShadowNode extends LayoutShadowNode implements CSSNode.MeasureFunction {
    private Integer mHeight;
    private Integer mWidth;
    private boolean mMeasured;

    public BottomSheetBehaviorShadowNode() {
        setMeasureFunction(this);
    }

    @Override
    public void measure(CSSNode node, float width, CSSMeasureMode widthMode, float height, CSSMeasureMode heightMode, MeasureOutput measureOutput) {
        if(!mMeasured) {
            BottomSheetBehaviorView nodeView = new BottomSheetBehaviorView(getThemedContext());
            final int spec = View.MeasureSpec.makeMeasureSpec(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
            );
            nodeView.measure(spec, spec);
            mWidth  = nodeView.getMeasuredWidth();
            mHeight = nodeView.getMeasuredHeight();
            mMeasured = true;
        }

        measureOutput.width  = mWidth;
        measureOutput.height = mHeight;
    }
}
