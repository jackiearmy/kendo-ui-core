
package com.kendoui.taglib.chart;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ZoomableMousewheelTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        ZoomableTag parent = (ZoomableTag)findParentWithClass(ZoomableTag.class);


        parent.setMousewheel(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "chart-zoomable-mousewheel";
    }

    public java.lang.String getLock() {
        return (java.lang.String)getProperty("lock");
    }

    public void setLock(java.lang.String value) {
        setProperty("lock", value);
    }

//<< Attributes

}