import styled from "@emotion/styled";
import { useState, useEffect, cloneElement, useRef } from "react";
import shortid, {generate} from "shortid";
import { ReactComponent as Check } from "../../../assets/icons/check-circle.svg";
import { ReactComponent as Chevron } from "../../../assets/icons/chevron-right.svg";
import { ReactComponent as Error } from "../../../assets/icons/exclamation-triangle.svg";

const Triangle = styled.div({
  position: "absolute",
  width: 0,
  height: 0,
  borderTop: "7px solid transparent",
  borderBottom: "7px solid transparent",
});

const TriangleLeft = styled(Triangle)(({ size = "14px", color = "black", left = "34px", top = "32px" }) => ({
  left: left,
  top: top,
  borderRight: `${size} solid ${color}`,
}));

const TriangleRight = styled(Triangle)(({ size = "14px", color = "black", left = "94px", top = "32px" }) => ({
  left: left,
  top: top,
  borderLeft: `${size} solid ${color}`,
}));

const Circle = styled.div(({ color = "black", size = "20px", borderSize = "2px", fontSize = "12px", left = "0px", top = "27px" }) => ({
  position: "absolute",
  left: left,
  top: top,
  width: size,
  height: size,
  borderRadius: size,
  border: `${color} solid ${borderSize}`,
  fontWeight: "bold",
  fontSize: fontSize,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "white",
  transition: "transform 0.2s ease-out",
}));

const SemiCircle = styled.div(({ color = "black", width = "30px", height = "60px", border = "6px", left = "118px", top = "0px" }) => ({
  position: "absolute",
  left: left,
  top: top,
  width: width,
  height: height /* as the half of the width */,
  borderTopLeftRadius: height,
  borderBottomLeftRadius: height,
  border: `${border} solid ${color}`,
  borderRight: "5px",
  /* box-sizing: border-box; */
}));
const InnerCircle = styled.div(({ size = "60px" }) => ({
  width: size,
  height: size,
  borderRadius: size,
  boxShadow:
    "0px 30px 84px rgba(19, 10, 46, 0.08), 0px 8px 32px rgba(19, 10, 46, 0.08), 0px 3px 14px rgba(19, 10, 46, 0.08), 0px 1px 3px rgba(19, 10, 46, 0.08)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const InnerRectangle = styled.div(({ border = "2px", color = "black", height = "68px", width = "328px", left = "154px", top = "0px" }) => ({
  width: width,
  height: height,
  position: "absolute",
  left: left,
  top: top,
  border: `${border} solid ${color}`,
  borderLeft: "0px",
}));

const Content = styled.div(({ width = "308px", left = "154px", top = "72px" }) => ({
  width: width,
  position: "absolute",
  left: left,
  top: top,
  padding: "0 10px",
  maxHeight: 0,
  overflow: "hidden",
  transition: "max-height 0.2s ease-out",
}));

const ConnectingRectangle = styled.div(({ left = "69px", top = "53px", color = "black" }) => ({
  width: "5px",
  height: "41px",
  position: "absolute",
  left: left,
  top: top,
  backgroundColor: color,
  transition: "height 0.2s ease-out",
}));

export const AccordionItem = ({ first, color, success, index, title, description, svgIcon, pngIcon, expandable, error, children }) => {
  const [expanded, setExpanded] = useState(false);
  const [renderKey, setRenderKey] = useState(generate());
  if (!color) {
    if (success) {
      color = "green";
    } else if (error) {
      color = "orange";
    } else {
      color = "gray";
    }
  }
  const SvgIcon = svgIcon;
  const contentRef = useRef();
  const connectingRectangle = useRef();
  const container = useRef();
  const dropDown = useRef();
  useEffect(() => {
    if (expandable) {
      if (!expanded) {
        contentRef.current.style.border = null;
        contentRef.current.style.maxHeight = null;
        connectingRectangle.current.style.height = "41px";
        dropDown.current.style.transform = "rotate(0deg)";
        container.current.style.height = "94px";
      } else {
        contentRef.current.style.border = "1px solid #cfcfcf";
        contentRef.current.style.maxHeight = contentRef.current.scrollHeight + "px";
        connectingRectangle.current.style.height = contentRef.current.scrollHeight + 77 + "px";
        container.current.style.height = contentRef.current.scrollHeight + 130 + "px";
        dropDown.current.style.transform = "rotate(90deg)";
      }
    }
  }, [expanded, renderKey]);
  const toggleItem = () => {
    setExpanded(!expanded);
  };

  const statusStyle = {
    position: "absolute",
    left: "0px",
    top: "30px",
    width: "20px",
    height: "20px",
  };
  const reRender = () => {
    setRenderKey(generate());
    console.log("AccordionItem Rerendered");
  };
  return (
    <div ref={container} css={{ position: "relative", width: "500px", height: "94px", transition: "height 0.2s ease-out" }}>
      {/* <Circle color={color}>
        <Image color={color}></Image>
      </Circle> */}
      {success && <Check color={color} css={statusStyle}></Check>}
      {error && <Error color={color} css={statusStyle}></Error>}
      {(success || error) && <TriangleLeft color={color}></TriangleLeft>}
      <Circle size="25px" left="57px" top="25px" color={color}>
        {index}
      </Circle>
      {!first && <ConnectingRectangle color={color} style={{ top: "0px", height: "26px" }}></ConnectingRectangle>}
      <ConnectingRectangle ref={connectingRectangle} color={color}></ConnectingRectangle>
      <TriangleRight color={color}></TriangleRight>
      <SemiCircle color={color} onClick={toggleItem}>
        <InnerCircle>
          {pngIcon && <img src={pngIcon} width="28px" height="28px"></img>}
          {svgIcon && <SvgIcon width="28px" height="28px" color="gray" />}
        </InnerCircle>
      </SemiCircle>
      <InnerRectangle color={color} onClick={toggleItem}>
        <p css={{ fontSize: "16px", paddingLeft: "50px", height: "10px" }}>{title}</p>
        <p css={{ fontSize: "12px", paddingLeft: "50px", color: "gray" }}>{description}</p>
      </InnerRectangle>
      {expandable && (
        <Circle ref={dropDown} left="472px" color={color} onClick={toggleItem}>
          <Chevron width="12px" height="12px"></Chevron>
        </Circle>
      )}
      <Content ref={contentRef}>{children && cloneElement(children, { reRender: reRender })}</Content>
    </div>
  );
};
