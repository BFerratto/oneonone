export const defaultAccounts = [
  {
    id: "fakeId1",
    email: "fake@email.email1",
  },
  {
    id: "fakeId2",
    email: "fake@email.email2",
  },
];

export const getAccounts = jest.fn(() => Promise.resolve(defaultAccounts));
export const saveAccoubts = jest.fn();
