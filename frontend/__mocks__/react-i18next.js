export const tSpy = jest.fn();
export const useTranslation = jest.fn(() => ({
  t: tSpy,
}));
