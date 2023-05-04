import { FlexRow } from "../../components/core/Utility";
import { ProgressFlow } from "../../components/features/ProgressFlow";
import { Milestone } from "../Milestone/milestone";

const Status = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PROGRESS: "PROGRESS",
  UNDEFINED: "UNDEFINED"
}
const progressData = [
  {
    title: "Opportunity Confirmed",
    status: Status.SUCCESS,
    HoverComponent: <div css={{width: "500px"}}>HelloWorld</div>,
  },
  {
    title: "Document Signed",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Order Created",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
  }, 
  {
    title: "Order Confirmed",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Shipment",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Delivered",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Installation Scheduled",
    status: Status.PROGRESS,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Installed",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Billing Started",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
  },
  {
    title: "Order Completed",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
  }
]

export const HelloWorld = () => {
  return (
    <>
      <FlexRow justifyContent="center">
        <div css={{ width: "1300px", height: "900px", marginTop: "50px", paddingTop: "50px" }}>
          {/* <Milestone /> */}
          <ProgressFlow data={progressData}/>
        </div>
      </FlexRow>
    </>
  );
};
