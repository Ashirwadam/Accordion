import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Flex = styled.div((props) => {
  const style =  {
    display: "flex",
    ...props,
  };
  delete style.children;
  return style;
});
/**
 * Flexbox div
 * @param {Object} props
 * @param {"flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit"} props.justifyContent Justify Content for the div
 * @param {"stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit"} props.alignItems Align Items for the div
 * @param {"stretch" | "center" | "flex-start" | "flex-end" | "space-between" | "space-around" | "initial" | "inherit"} props.alignContent Align Items for the div
 * @param {number} props.order Order
 * @param {"string"} props.flex
 * @param {"auto" | "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit"} props.alignSelf
 * @param {"row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit"} props.flexDirection Flex direction for the div
 * @param {"auto" | "initial" | "inherit"} props.flexBasis Flex basis for the div
 * @param {string} props.flexFlow Flex flow for the div
 * @param {number | "initial" | "inherit"} props.flexGrow Flex grow for the div
 * @param {number | "initial" | "inherit"} props.flexShrink Flex shrink for the div
 * @param {"nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit"} props.flexWrap Flex wrap for the div
 * @param {string} props.width Flex width
 * @param {string} props.height Flex height
 */
export const FlexRow = (props) => <Flex flexDirection="row" {...props} />;

/**
 * Flexbox div
 * @param {Object} props
 * @param {"row" | "row-reverse" | "column" | "column-reverse" | "initial" | "inherit"} props.flexDirection Flex direction for the div
 * @param {string | "auto" | "initial" | "inherit"} props.flexBasis Flex basis for the div
 * @param {string} props.flexFlow Flex flow for the div
 * @param {number, "initial", "inherit"} props.flexGrow Flex grow for the div
 * @param {number, "initial", "inherit"} props.flexShrink Flex shrink for the div
 * @param {"nowrap", "wrap", "wrap-reverse" | "initial" | "inherit"} props.flexWrap Flex wrap for the div
 * @param {string} props.width Flex width
 * @param {string} props.height Flex height
 */
export const FlexColumn = (props) => <Flex flexDirection="column" {...props} />;

