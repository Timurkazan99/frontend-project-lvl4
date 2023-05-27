export const toasts = {
  createChannel: jest.fn(),
  renamingChannel: jest.fn(),
  removeChannel: jest.fn(),
  networkError: jest.fn(),
};
export default jest.fn(() => toasts);
