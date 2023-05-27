export const mockDispatch = jest.fn();

export const useDispatch = jest.fn(() => mockDispatch);
export const batch = jest.fn((callback) => {
  callback();
});
