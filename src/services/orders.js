export async function getMilestoneData(accountID) {
  return {
    status: 200,
    data: {
      data: {
        states: [
          {
            state: "New",
          },
          {
            state: "M1WaitingBP",
          },
          {
            state: "M1GotBP",
          },
          // {
          //   state: "M1Failed",
          // },
          {
            state: "M1UpdateBPtoSFDC",
          },
          {
            state: "M1Completed",
          },
          // {
          //   state: "M2FailedCreateCAInSFDC",
          // },
          {
            state: "M2CreatedCAInSFDC",
          },
          {
            state: "M2WaitingAddressIds",
          },
          {
            state: "M2WaitingContactBP",
          },
          {
            state: "M2GotBP",
          },
          {
            state: "M2GotAddressIds",
          },
          {
            state: "M2ContactBPUpdatedInSFDC",
          },
          {
            state: "M2CAAddressIdUpdated",
          },
          {
            state: "M2ContactWaitingAssociation",
          },
          {
            state: "M2ContactAssociated",
          },
          {
            state: "M2WaitingCACreateInMDG",
          },
          {
            state: "M2GotCA",
          },
          {
            state: "M2Failed",
          },

        ],
      },
    },
  };
}
