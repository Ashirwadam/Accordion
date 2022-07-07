import { AccordionItem } from "./AccordionItem";
import { ReactComponent as Icon } from "../../../assets/icons/alarm-fill.svg";
import PngIcon from "../../../assets/images/icon.png";

export const Accordion = () => {
  return (
    <div>
      <AccordionItem
        first
        color="red"
        index="01"
        title="First Accordion"
        description="First Accordion description"
        svgIcon={Icon}
        expandable
      ></AccordionItem>
      {/* <AccordionItem color="blue" expandable index="02" title="Second Accordion" description="Second Accordion description" icon={Icon}></AccordionItem> */}
      {/* <AccordionItem color="green" index="03" title="Third Accordion" description="Third Accordion description" icon={Icon}></AccordionItem> */}
      <Icon></Icon>
      <img src={PngIcon} width="50px" height="50px"></img>
    </div>
  );
};
