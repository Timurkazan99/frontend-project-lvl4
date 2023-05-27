export const mockError = jest.fn();

export const useRollbar = jest.fn(() => ({
  error: mockError,
}));
