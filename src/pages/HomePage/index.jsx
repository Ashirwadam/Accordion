import { FlexRow } from "../../components/core/Utility";
import { Accordion } from "../../components/features/Accordion";
import { AccordionItem } from "../../components/features/Accordion/AccordionItem";
import { ReactComponent as Icon } from "../../assets/icons/alarm-fill.svg";
import PngIcon from "../../assets/images/icon.png";

export const HelloWorld = () => {
  return (
    <>
      <FlexRow justifyContent="center">
        <Accordion>
          <AccordionItem first index="01" title="First Accordion" description="First Accordion description" svgIcon={Icon} success></AccordionItem>
          <AccordionItem expandable index="02" title="Second Accordion" description="Second Accordion description" pngIcon={PngIcon} error>
            <p css={{ paddingTop: "10px" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, exercitationem et! Doloremque est eveniet sint nisi enim in omnis
              distinctio aliquam ullam velit placeat autem reiciendis provident, eaque quia ipsam. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Quam dignissimos quis a rem doloribus consequatur eos cupiditate quasi aperiam sunt vero explicabo, eum nostrum dolorum dicta quo
              consectetur molestias recusandae.
            </p>
          </AccordionItem>
          <AccordionItem index="03" title="Third Accordion" description="Third Accordion description" svgIcon={Icon} expandable></AccordionItem>
        </Accordion>
      </FlexRow>
    </>
  );
};
