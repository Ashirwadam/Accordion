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
            state: "M1WaitingBp",
          },
          {
            state: "M1GotBp",
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
            state: "M2WaitingContactIBP",
          },
          {
            state: "M2GotBP",
          },
          {
            state: "M2UpdatedAddressIdsInSFDC",
          },
          {
            state: "M2Failed",
          },

        ],
      },
    },
  };
}
