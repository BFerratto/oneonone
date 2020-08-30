export const defaultBigGoals = [
  {
    id: "fakeId1",
    title: "mock Goal 1",
  },
  {
    id: "fakeId2",
    title: "mock Goal 2",
  },
];
export const createdBigGoals = [
  {
    id: "fakeId3",
    title: "Saved Goal 1",
  },
  {
    id: "fakeId4",
    title: "Saved Goal 2",
  },
];
export const newAccountId = "newAccountId";
export const getBigGoals = jest.fn(() => Promise.resolve(defaultBigGoals));
export const saveBigGoals = jest.fn((goals: string[]) =>
  Promise.resolve(createdBigGoals)
);
