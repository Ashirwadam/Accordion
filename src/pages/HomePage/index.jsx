import { FlexRow } from "../../components/core/Utility";
import { ProgressFlow } from "../../components/features/ProgressFlow";
import { Milestone } from "../Milestone/milestone";

const Status = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PROGRESS: "PROGRESS",
  UNDEFINED: "UNDEFINED",
};
const progressData = [
  {
    title: "Opportunity Confirmed",
    status: Status.SUCCESS,
    HoverComponent: <div css={{ width: "500px" }}>HelloWorld</div>,
    id: 1,
    openOnClick: true,
  },
  {
    title: "Document Signed",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 2,
  },
  {
    title: "Order Created",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 3,
  },
  {
    title: "Order Confirmed",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 4,
  },
  {
    title: "Shipment",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 5,
  },
  {
    title: "Delivered",
    status: Status.SUCCESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 6,
  },
  {
    title: "Installation Scheduled",
    status: Status.PROGRESS,
    HoverComponent: <div>HelloWorld</div>,
    id: 7,
  },
  {
    title: "Installed",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
    id: 8,
  },
  {
    title: "Billing Started",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
    id: 9,
  },
  {
    title: "Order Completed",
    status: Status.UNDEFINED,
    HoverComponent: <div>HelloWorld</div>,
    id: 10,
  },
];

export const HelloWorld = () => {
  return (
    <>
      <FlexRow justifyContent="center">
        <div css={{ width: "1300px", height: "900px", marginTop: "50px", paddingTop: "50px" }}>
          {/* <Milestone /> */}
          <ProgressFlow data={progressData} />
        </div>
      </FlexRow>
    </>
  );
};
