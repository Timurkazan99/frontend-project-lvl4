export const mockSetName = jest.fn();
export const mockSetIsAuth = jest.fn();

export const useContext = jest.fn(() => ({
  user: {
    setName: mockSetName,
    setIsAuth: mockSetIsAuth,
  },
}));
