import { FlexRow } from "../../components/core/Utility";
import { Milestone } from "../Milestone/milestone";

export const HelloWorld = () => {
  return (
    <>
      <FlexRow justifyContent="center">
        <div css={{ width: "1300px", height: "900px", marginTop: "50px", paddingTop: "50px", backgroundColor: "yellow"}}>
          <Milestone />
        </div>
      </FlexRow>
    </>
  );
};
