export async function getMilestoneData(accountID) {
  return {
    status: 200,
    data: {
      data: {
        states: [
          {
            state: "New",
          },
        ],
      },
    },
  };
}
