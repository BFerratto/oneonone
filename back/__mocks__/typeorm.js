const mockTransactionEntityManagerSave = jest.fn(() => Promise.resolve());
const mockTransactionEntityManager = {
  save: mockTransactionEntityManagerSave,
};

const mockTransaction = jest.fn(async (callback) => {
  return await callback(mockTransactionEntityManager);
});
const mockGetManager = jest.fn(() => ({
  transaction: mockTransaction,
}));

module.exports = {
  getManager: mockGetManager,
  mockGetManager,
  mockTransactionEntityManagerSave,
  mockTransactionEntityManager,
  mockTransaction,
};
