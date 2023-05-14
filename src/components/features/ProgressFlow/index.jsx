import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { ReactComponent as ProgressIcon } from "../../../assets/icons/calendar.svg";
import { ReactComponent as SuccessIcon } from "../../../assets/icons/check.svg";
import { ReactComponent as FailedIcon } from "../../../assets/icons/exclamation-triangle.svg";
import { ReactComponent as TriangleUp } from "../../../assets/icons/triangle-up.svg";
import { FlexRow } from "../../core/Utility";

const Status = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
  PROGRESS: "PROGRESS",
  UNDEFINED: "UNDEFINED",
};

const mapColor = (status) => {
  switch (status) {
    case Status.SUCCESS:
      return "green";
    case Status.FAILED:
      return "red";
    case Status.PROGRESS:
      return "orange";
    case Status.UNDEFINED:
      return "#80808047";
    default:
      return "#80808047";
  }
};

export const ProgressFlow = ({ data }) => {
  return (
    <FlexRow width="100%" alignItems="center">
      {data.map((item, index) => {
        const { title, status, HoverComponent, id, openOnClick = false } = item;
        if (index === 0) {
          return <ProgressComponent key={title} {...{ title, status, HoverComponent, id, openOnClick }} />;
        } else {
          return (
            <>
              <FlexRow key={`${title}-dash`} css={{ backgroundColor: mapColor(status), height: "7px", flexGrow: 1, margin: "0 10px" }}></FlexRow>
              <ProgressComponent key={title} {...{ title, status, HoverComponent, id, openOnClick }} />
            </>
          );
        }
      })}
    </FlexRow>
  );
};

const WhiteDiv = () => <div css={{ borderRadius: "300px", backgroundColor: "white", flexGrow: "1", margin: "5px", alignSelf: "stretch" }} />;

const mapIcon = (status) => {
  switch (status) {
    case Status.SUCCESS:
      return SuccessIcon;
    case Status.FAILED:
      return FailedIcon;
    case Status.PROGRESS:
      return ProgressIcon;
    case Status.UNDEFINED:
      return WhiteDiv;
    default:
      return WhiteDiv;
  }
};

const ProgressComponent = ({ title, status, HoverComponent, id, openOnClick }) => {
  const Icon = mapIcon(status);

  return (
    <div>
      <FlexRow
        css={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          width: "30px",
          height: "30px",
          borderRadius: "30px",
          backgroundColor: mapColor(status),
        }}
        data-tooltip-id={id}
      >
        <Icon color="white" />
        <p css={{ pointerEvents: "none", position: "absolute", top: "45px", textAlign: "center" }}>{title}</p>
        {HoverComponent && (
          <Tooltip
            id={id}
            place="bottom"
            offset={200}
            noArrow
            style={{
              padding: 0,
              borderRadius: "20px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              filter: "drop-shadow(10px 5px 10px gray)",
              flexDirection: "column",
              backgroundColor: "transparent",
            }}
            openOnClick={openOnClick}
            clickable
          >
            <TriangleUp width="50px" height="50px" color="white" />
            <div
              css={{
                position: "relative",
                top: "-16px",
                backgroundColor: "white",
                minWidth: "350px",
                minHeight: "200px",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              {HoverComponent}
            </div>
          </Tooltip>
        )}
      </FlexRow>
    </div>
  );
};
