// To fix Cannot redeclare block-scoped variable  so typescript interprets this as a module not as an script that share the scope with the other scripts
export {};

const mockFind = jest.fn<Promise<any>, any[]>(() => {
  return Promise.resolve();
});
const mockBigGoal: any = jest.fn().mockImplementation(() => ({}));
mockBigGoal.find = mockFind;
jest.mock("../../orm/entity/BigGoal", () => ({
  BigGoal: mockBigGoal,
}));
jest.mock("typeorm");

describe("services/bigGoal", () => {
  beforeEach(() => {
    mockFind.mockClear();
  });
  it("Lists goals", async () => {
    const { getBigGoals: sut } = require("./");
    const mockResult = Symbol("mockResult");
    mockFind.mockImplementationOnce(() => Promise.resolve(mockResult));
    const response = await sut();
    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(response).toBe(mockResult);
  });
  it("saves multiple BigGoals", async () => {
    const mockGoals = ["mockGoal1", "mockGoal2", "mockGoal3"];
    const { saveBigGoals: sut } = require("./");
    const { mockTransactionEntityManagerSave } = require("typeorm");
    const mockReturnValue = Symbol("mockReturnValue");
    mockTransactionEntityManagerSave.mockImplementationOnce(() =>
      Promise.resolve(mockReturnValue)
    );
    const data = await sut(mockGoals);
    expect(data).toBe(mockReturnValue);
  });
});
