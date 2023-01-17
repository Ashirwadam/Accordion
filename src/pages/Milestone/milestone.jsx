import { FlexRow } from "../../components/core/Utility";
import { Accordion } from "../../components/features/Accordion";
import { AccordionItem } from "../../components/features/Accordion/AccordionItem";
import { ReactComponent as Icon } from "../../assets/icons/alarm-fill.svg";
import PngIcon from "../../assets/images/icon.png";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Colors } from "../../constants/Colors";
import { getMilestoneData } from "../../services/orders";
import { ReactComponent as Check } from "../../assets/icons/check-circle.svg";
import { ReactComponent as Error } from "../../assets/icons/exclamation-triangle.svg";
import { ReactComponent as Person } from "../../assets/icons/person-fill.svg";

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

const milestones = [
  {
    first: true,
    title: "Opportunity Created",
    description: "Opportunity Created in SFDC",
    svgIcon: Icon,
  },
  {
    title: "Set to presenting stage",
    description: "Opportunity set to presenting stage in SFDC",
    svgIcon: Icon,
  },
  {
    title: "Milestone Process 1",
    description: "",
    svgIcon: Icon,
  },
  {
    title: "Document Sign",
    description: "Document Sign in SFDC",
    svgIcon: Icon,
  },
  {
    title: "Opportunity close & sale",
    description: "Opportunity cosed and sale confirmed in SFDC",
    svgIcon: Icon,
  },
  {
    title: "Milestone Process 2",
    description: "",
    svgIcon: Icon,
  },
  {
    title: "Update Order Number",
    description: "SL updates the ERP order number on SFDC Opp",
    svgIcon: Icon,
  },
];
const Para = ({ stage, children, anchor, ...rest }) => {
  const [color, setColor] = useState(Colors.gray);
  const [icon, setIcon] = useState("");
  useEffect(() => {
    const check = <Check width="20px" height="20px"></Check>;
    const error = <Error width="20px" height="20px"></Error>;
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
  let text = null;
  if (anchor) {
    text = (
      <a href="javascript:void(0)" css={{ paddingLeft: "10px", color: "black" }}>
        {children}
      </a>
    );
  } else {
    text = <span css={{ paddingLeft: "10px", color: "black" }}>{children}</span>;
  }
  return (
    // <div css={{ padding: "10px" }}>
    //   {icon}
    //   <div css={{ display: "inline" }}>
    //     <span>{children}</span>
    //   </div>
    // </div>
    <FlexRow padding="10px" color={color} flexWrap="nowrap" {...rest}>
      <div>{icon}</div>
      {text}
    </FlexRow>
  );
};

const Info = ({ info }) => {
  return (
    <div css={{ width: "400px", marginRight: "100px", border: "1px solid black", borderRadius: "5px", height: "900px" }}>
      {Object.entries(info).map((item, index) => {
        return (
          <div key={index} css={{ borderBottom: "1px solid red", padding: "20px" }}>
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

const Contacts = ({ contacts }) => {
  return (
    <>
      {contacts.map((item, index) => {
        return (
          <FlexRow key={index} padding="0 0 5px 50px">
            <Person width="15px" height="15px" />
            <span css={{ paddingLeft: "10px" }}>{item}</span>
          </FlexRow>
        );
      })}
    </>
  );
};

const MilestoneProcess2 = ({ stage1, stage2, stage3, stage4, stage5, stage6, stage7, stage8, rerender }) => {
  const [contacts, setContacts] = useState();
  const handler = () => {
    setContacts(["ash", "happy", "ashir"]);
    console.log("Contacts set");
    rerender();
  };
  return (
    <>
      <Para stage={stage1}>Create contract account and associate contacts</Para>
      <Para stage={stage2}>Create Address UUID for CA in MDG</Para>
      <Para stage={stage3} onClick={handler} anchor>
        Create Contracts in MDG{" "}
      </Para>
      {contacts && contacts.length > 0 && <Contacts contacts={contacts} />}
      <Para stage={stage4}>Update Contact in SFDC</Para>
      <Para stage={stage5}>Associate Contact in MDG</Para>
      <Para stage={stage6}>Update Address Ids in SFDC</Para>
      <Para stage={stage7}>Create CA in MDG</Para>
      <Para stage={stage8}>Update CA in SFDC</Para>
    </>
  );
};
const mapState = (data, state) => {
  switch (state) {
    case States.completed:
      data.success = true;
      break;
    case States.failed:
      data.error = true;
      break;
    case States.progress:
      data.color = Colors.blue;
      break;
  }
};
export const Milestone = ({ accountId }) => {
  const [info, setInfo] = useState(makeInfo(null));
  const [milestoneData, setMilestoneData] = useState(milestones);
  const markMilestone1Complete = useCallback((accordionData, milestone1Data) => {
    milestone1Data.stage1 = States.completed;
    milestone1Data.stage2 = States.completed;
    milestone1Data.stage3 = States.completed;
    milestone1Data.stage4 = States.completed;
    accordionData[0].state = States.completed;
    accordionData[1].state = States.completed;
    accordionData[2].state = States.completed;
  }, []);
  const markMilestone2Complete = useCallback((accordionData, milestone2Data) => {
    milestone2Data.stage1 = States.completed;
    milestone2Data.stage2 = States.completed;
    milestone2Data.stage3 = States.completed;
    milestone2Data.stage4 = States.completed;
    milestone2Data.stage5 = States.completed;
    milestone2Data.stage6 = States.completed;
    milestone2Data.stage7 = States.completed;
    milestone2Data.stage8 = States.completed;
    accordionData[3].state = States.completed;
    accordionData[4].state = States.completed;
    accordionData[5].state = States.completed;

  }, []);
  const preprocessData = useCallback((data) => {
    const states = data.states;
    const updatedData = [...milestones];
    const milestone1Data = {},
      milestone2Data = {};
    states.forEach((item) => {
      switch (item.state) {
        case "New":
          milestone1Data.stage1 = States.completed;
          milestone1Data.stage2 = States.progress;
          updatedData[0].state = States.completed;
          updatedData[1].state = States.completed;
          updatedData[2].state = States.progress;
          break;
        case "M1WaitingBP":
          milestone1Data.stage2 = States.completed;
          milestone1Data.stage3 = States.progress;
          break;
        case "M1GotBP":
          milestone1Data.stage3 = States.completed;
          milestone1Data.stage4 = States.progress;
          break;
        case "M1Failed":
          milestone1Data.stage3 = States.failed;
          updatedData[2].state = States.failed;
          break;
        case "M1UpdateBPtoSFDC":
          milestone1Data.stage4 = States.completed;
          break;
        case "M1BpPresent":
        case "M1Completed":
          milestone1Data.stage4 = States.completed;
          updatedData[2].state = States.completed;
          break;
        case "M2FailedCreateCAInSFDC":
          milestone2Data.stage1 = States.failed;
          updatedData[5].state = States.failed;
          break;
        case "M2CreatedCAInSFDC":
          markMilestone1Complete(updatedData, milestone1Data);
          updatedData[3].state = States.completed;
          updatedData[4].state = States.completed;
          updatedData[5].state = States.progress;
          milestone2Data.stage1 = States.completed;
          milestone2Data.stage2 = States.progress;
          milestone2Data.stage3 = States.progress;
          break;
        case "M2WaitingAddressIds":
          markMilestone1Complete(updatedData, milestone1Data);
          updatedData[3].state = States.completed;
          updatedData[4].state = States.completed;
          updatedData[5].state = States.progress;
          milestone2Data.stage1 = States.completed;
          milestone2Data.stage2 = States.progress;
          break;
        case "M2WaitingContactBP":
          milestone2Data.stage1 = States.completed;
          milestone2Data.stage3 = States.progress;
          break;
        case "M2GotAddressIds":
          milestone2Data.stage2 = States.completed;
          milestone2Data.stage4 = States.progress;
          milestone2Data.stage5 = States.progress;
          break;
        case "M2GotBP":
          milestone2Data.stage3 = States.completed;
          milestone2Data.stage4 = States.progress;
          milestone2Data.stage5 = States.progress;
          break;
        case "M2ContactBPUpdatedInSFDC":
          milestone2Data.stage4 = States.completed;
          milestone2Data.stage5 = States.progress;
          break;
        case "UpdatedCAinSFDC":
        case "M2CAAddressIdUpdated":
          milestone2Data.stage6 = States.completed;
          break;
        case "M2WaitingAssociation":
        case "M2ContactWaitingAssociation":
          milestone2Data.stage5 = States.progress;
          break;
        case "M2ContactAssociated":
          milestone2Data.stage5 = States.completed;
          milestone2Data.stage6 = States.progress;
          break;
        case "M2WaitingCACreateInMDG":
          milestone2Data.stage7 = States.progress;
          break;
        case "M2GotCA":
          milestone2Data.stage7 = States.completed;
          milestone2Data.stage8 = States.progress;
          break;
        case "M2UpdatedCAInSFDC":
          milestone2Data.stage8 = States.completed;
          break;
        case "M2Completed":
          markMilestone2Complete(updatedData, milestone2Data);
        break;
        case "OCCompleted":
           updatedData[6].state = States.completed;
        break;
        case "M2Failed":
          updatedData[5].state = States.failed;
          for (const key in milestone2Data) {
            if (milestone2Data[key] === States.progress) {
              milestone2Data[key] = States.failed;
            }
          }
          break;
      }
    });
    updatedData.forEach((item) => {
      mapState(item, item.state);
      delete item.state;
    });
    if (Object.keys(milestone1Data).length > 0) {
      updatedData[2].data = <MilestoneProcess1 {...milestone1Data}></MilestoneProcess1>;
      updatedData[2].expandable = true;
    }
    if (Object.keys(milestone2Data).length > 0) {
      updatedData[5].data = <MilestoneProcess2 {...milestone2Data}></MilestoneProcess2>;
      updatedData[5].expandable = true;
    }
    setMilestoneData(updatedData);
  }, []);

  useEffect(() => {
    getMilestoneData(accountId).then((response) => {
      if (response.status === 200) {
        setInfo(makeInfo(response.data.data));
        preprocessData(response.data.data);
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
          {milestoneData.map((item, index) => {
            return (
              <AccordionItem key={index} {...item} index={index + 1}>
                {item.data}
              </AccordionItem>
            );
          })}
        </Accordion>
      </FlexRow>
    </>
  );
};
