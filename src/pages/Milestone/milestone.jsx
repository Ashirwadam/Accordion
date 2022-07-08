import { FlexRow } from "../../components/core/Utility";
import { Accordion } from "../../components/features/Accordion";
import { AccordionItem } from "../../components/features/Accordion/AccordionItem";
import { ReactComponent as Icon } from "../../assets/icons/alarm-fill.svg";
import PngIcon from "../../assets/images/icon.png";
import { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { getMilestoneData } from "../../services/orders";
import { ReactComponent as Check } from "../../assets/icons/check-circle.svg";
import { ReactComponent as Error } from "../../assets/icons/exclamation-triangle.svg";

const makeInfo = (data) => {
  const result = {};
  result["Account ID"] = data?.salesForceAccountId ?? "";
  result["Accont/Customer Name"] = data?.accountName ?? "";
  result["ERP BP Number"] = data?.bpNumber ?? "";
  result["ERP PO Number"] = data?.erpPoNumber ?? "";
  result["Record Type"] = data?.superLibraOpportunityId ?? "";
  result["Opportunity Type"] = data?.orderType ?? "";
  result["Opportunity Created Date"] = data?.opportunityCreatedDate ?? "";
  return result;
};

const States = {
  failed: "failed",
  completed: "success",
  progress: "progress",
};

const preprocessData = (data) => {
  const result = {};
  result.stage5 = States.progress;
  data.forEach((item) => {
    switch (item.state) {
      case "New":
        result.stage1 = States.completed;
        break;
      case "M1WaitingBp":
        result.stage2 = States.progress;
        break;
      case "M1GotBp":
        result.stage2 = States.completed;
        break;
      case "M1Failed":
        result.stage3 = States.failed;
        result.stage5 = States.failed;
        break;
      case "M1UpdateBPtoSFDC":
        result.stage3 = States.completed;
        break;
      case "M1Completed":
        result.stage4 = States.completed;
        result.stage5 = States.completed;
        break;
    }
  });
  return result;
};

const Milestones = [
  {
    first: true,
    success: true,
    title: "Opportunity Created",
    description: "Opportunity Created in SFDC",
    svgIcon: Icon,
    expandable: false,
  },
  {
    success: true,
    title: "Set to presenting stage",
    description: "Opportunity set to presenting stage in SFDC",
    svgIcon: Icon,
    expandable: false,
  },
  {
    title: "Milestone Process 1",
    description: "",
    svgIcon: Icon,
    expandable: true,
  },
  {
    title: "Document Sign",
    description: "Document Sign in SFDC",
    svgIcon: Icon,
    expandable: false,
  },
  {
    title: "Opportunity close & sale",
    description: "Opportunity cosed and sale confirmed in SFDC",
    svgIcon: Icon,
    expandable: false,
  },
  {
    title: "Create Account",
    description: "Account Created in Reveal",
    svgIcon: Icon,
    expandable: false,
  },
  {
    title: "Update Order Number",
    description: "SL updates the ERP order number on SFDC Opp",
    svgIcon: Icon,
    expandable: false,
  },
];
const Para = ({ stage, children }) => {
  const [color, setColor] = useState(Colors.gray);
  const [icon, setIcon] = useState("");
  useEffect(() => {
    const check = <Check width="20px" height="20px" color={color}></Check>;
    const error = <Error width="20px" height="20px" color={color}></Error>;
    if (stage == States.completed) {
      setColor(Colors.green);
      setIcon(check);
    } else if (stage == States.failed) {
      setColor(Colors.orange);
      setIcon(error);
    } else if (stage == States.progress) {
      setColor(Colors.blue);
      setIcon(check);
    } else {
      setColor(Colors.gray);
      setIcon(check);
    }
  }, []);
  return (
    // <div css={{ padding: "10px" }}>
    //   {icon}
    //   <div css={{ display: "inline" }}>
    //     <span>{children}</span>
    //   </div>
    // </div>
    <FlexRow padding="10px">
      {icon}
      <span css={{ paddingLeft: "10px" }}>{children}</span>
    </FlexRow>
  );
};

const Info = ({ info }) => {
  return (
    <div css={{ width: "400px", marginRight: "100px", border: "1px solid black", borderRadius: "5px", height: "900px" }}>
      {Object.entries(info).map((item, index) => {
        return (
          <div key={index} css={{ borderBottom: "1px solid red", padding: "20px"}}>
            {item[0]} {item[1]}
          </div>
        );
      })}
    </div>
  );
};

const MilestoneProcess1 = (props) => {
  const { stage1, stage2, stage3, stage4 } = props;
  return (
    <>
      <Para stage={stage1}>Opportunity pulled into SL</Para>
      <Para stage={stage2}>Business Partner Request sent to MDG</Para>
      <Para stage={stage3}>MDG sent Business Partner to SL</Para>
      <Para stage={stage4}>SL updates Business Partner to SFDC</Para>
    </>
  );
};
export const Milestone = ({ accountId }) => {
  const [info, setInfo] = useState(makeInfo(null));
  const [accordionData, setAccordionData] = useState();

  useEffect(() => {
    getMilestoneData(accountId).then((response) => {
      if (response.status === 200) {
        setInfo(makeInfo(response.data.data));
        setAccordionData(preprocessData(response.data.data.states));
      } else {
        console.log("Error occurred");
      }
    });
  }, []);
  return (
    <>
      <FlexRow alignItems="flex-start">
        <Info info={info}></Info>
        <Accordion>
          {Milestones.map((item, index) => {
            if (index !== 2) return <AccordionItem key={index} {...item} index={index + 1}></AccordionItem>;
            else
              return (
                <AccordionItem
                  key={index}
                  {...item}
                  index="3"
                  error={accordionData?.stage5 == States.failed}
                  success={accordionData?.stage5 == States.completed}
                >
                  <MilestoneProcess1 {...accordionData}></MilestoneProcess1>
                </AccordionItem>
              );
          })}
        </Accordion>
      </FlexRow>
    </>
  );
};
