export {};

/**
 * For me some reason manual mocks were not changeable
 *
 * Following https://jestjs.io/docs/en/es6-class-mocks#spying-on-methods-of-our-class made a mockSave implementation always be the one defined on the file
 * Even moicng the same logic to the __mocks__/Account made a mockSave/mockFinb unchangeable
 */
const mockSave = jest.fn<Promise<any>, any[]>(() => {
  return Promise.resolve();
});
const mockFind = jest.fn<Promise<any>, any[]>(() => {
  return Promise.resolve();
});
const mockAccount: any = jest.fn().mockImplementation(() => ({
  save: mockSave,
}));
mockAccount.find = mockFind;
jest.mock("../orm/entity/Account", () => ({
  Account: mockAccount,
}));

describe("services/account", () => {
  beforeEach(() => {
    mockSave.mockClear();
    mockFind.mockClear();
  });
  it("Sucessfully saves account by email", async () => {
    const { saveAccount: sut } = require("./account");
    const mockResult = Symbol("mockResult");
    mockSave.mockImplementationOnce(() => {
      return Promise.resolve(mockResult);
    });
    const email = "mock@email.com";
    const response = await sut({ email });
    expect(mockSave).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockResult);
  });
  it("returns save account error", async () => {
    const { saveAccount: sut } = require("./account");
    const mockError = new Error("mockError");
    mockSave.mockImplementationOnce(() => {
      return Promise.reject(mockError);
    });
    const email = "mock@email.com";
    expect(sut({ email })).rejects.toEqual(mockError);
  });
  it("Lists accounts", async () => {
    const { getAccounts: sut } = require("./account");
    const mockResult = Symbol("mockResult");
    mockFind.mockImplementationOnce(() => Promise.resolve(mockResult));
    const response = await sut();
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockResult);
  });
  it("Returns lists accounts", async () => {
    const { getAccounts: sut } = require("./account");
    const mockError = new Error("mockError");
    mockFind.mockImplementationOnce(() => Promise.reject(mockError));
    expect(sut()).rejects.toEqual(mockError);
  });
});
